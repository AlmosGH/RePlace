const fs = require("node:fs");
const assert = require("node:assert/strict");
const traverse = require("@babel/traverse").default;
const { loadOriginal, parse, sha256 } = require("./common.cjs");
const { verify: verifyConservative } = require("./verify.cjs");

// Independent of readable.cjs and rename.cjs. Comparison permits only constant
// branch selection, redundant var/block/sequence syntax, and recorded alpha-renames.
const metadata = new Set([
  "start",
  "end",
  "loc",
  "extra",
  "leadingComments",
  "trailingComments",
  "innerComments",
]);
function annotateBindings(ast) {
  traverse(ast, {
    ReferencedIdentifier(p) {
      p.node.resolvesToLocal = Boolean(p.scope.getBinding(p.node.name));
    },
  });
}
function staticValue(node) {
  if (["StringLiteral", "BooleanLiteral", "NumericLiteral"].includes(node.type))
    return { value: node.value };
  if (node.type === "NullLiteral") return { value: null };
  return null;
}
function staticTest(node) {
  const literal = staticValue(node);
  if (literal) return { value: Boolean(literal.value) };
  if (
    node.type !== "BinaryExpression" ||
    !["===", "!=="].includes(node.operator)
  )
    return null;
  const left = staticValue(node.left),
    right = staticValue(node.right);
  if (!left || !right) return null;
  const equal = left.value === right.value;
  return { value: node.operator === "===" ? equal : !equal };
}
function statements(nodes) {
  return nodes.flatMap(statement);
}
function sequence(node) {
  return node.type === "SequenceExpression"
    ? node.expressions.flatMap(sequence)
    : [node];
}
function statement(node) {
  if (!node || node.type === "EmptyStatement") return [];
  if (node.type === "IfStatement") {
    const known = staticTest(node.test);
    if (known) return statement(known.value ? node.consequent : node.alternate);
    return [
      {
        type: "IfStatement",
        test: normalize(node.test),
        consequent: statement(node.consequent),
        alternate: statement(node.alternate),
      },
    ];
  }
  if (node.type === "ExpressionStatement")
    return sequence(node.expression).map((expression) => ({
      type: "ExpressionStatement",
      expression: normalize(expression),
    }));
  if (node.type === "VariableDeclaration" && node.kind === "var") {
    return node.declarations
      .filter((decl) => decl.init)
      .map((decl) => ({
        type: "VariableDeclaration",
        kind: "var",
        declarations: [normalize(decl)],
      }));
  }
  if (node.type === "BlockStatement") {
    const body = statements(node.body);
    const scoped = body.some(
      (item) =>
        item.type === "FunctionDeclaration" ||
        item.type === "ClassDeclaration" ||
        (item.type === "VariableDeclaration" && item.kind !== "var"),
    );
    if (scoped || node.directives.length)
      return [
        { type: "LexicalBlock", directives: normalize(node.directives), body },
      ];
    return body;
  }
  return [normalize(node)];
}
function normalize(node) {
  if (Array.isArray(node)) return node.map(normalize);
  if (!node || typeof node !== "object") return node;
  if (node.type === "BlockStatement")
    return {
      type: "FunctionOrControlBody",
      directives: normalize(node.directives),
      body: statements(node.body),
    };
  if (node.type === "LogicalExpression") {
    const operands = [];
    function collect(part) {
      if (
        part.type === "LogicalExpression" &&
        part.operator === node.operator
      ) {
        collect(part.left);
        collect(part.right);
      } else operands.push(normalize(part));
    }
    collect(node);
    return { type: node.type, operator: node.operator, operands };
  }
  const result = {};
  for (const key of Object.keys(node).sort()) {
    if (metadata.has(key)) continue;
    if (
      node.type === "ObjectProperty" &&
      key === "method" &&
      node[key] === false
    )
      continue;
    if (
      key === "key" &&
      ["ObjectProperty", "ObjectMethod"].includes(node.type) &&
      !node.computed &&
      node.key.type === "Identifier"
    )
      result[key] = { type: "StringLiteral", value: node.key.name };
    else if (key === "consequent" && node.type === "SwitchCase")
      result[key] = statements(node[key]);
    else if (
      ["consequent", "alternate"].includes(key) &&
      node.type === "IfStatement"
    )
      result[key] = statement(node[key]);
    else if (
      key === "body" &&
      node[key] &&
      !Array.isArray(node[key]) &&
      /Statement$/.test(node[key].type) &&
      !/Function/.test(node.type) &&
      node.type !== "CatchClause"
    )
      result[key] = statement(node[key]);
    else result[key] = normalize(node[key]);
  }
  return result;
}

function restoreNames(ast, manifest) {
  const inverse = new Map(),
    originals = new Set();
  for (const entry of manifest) {
    assert.match(entry.original, /^[A-Za-z_$][\w$]*$/);
    const key = `${entry.scope}:${entry.readable}`;
    assert.ok(
      !inverse.has(key) && !originals.has(entry.original),
      "Bindings must be unique within each scope",
    );
    inverse.set(key, entry.original);
    originals.add(entry.original);
  }
  const bindings = [],
    seen = new Set(),
    scopes = new Map();
  traverse(ast, {
    Scope(p) {
      if (!scopes.has(p.scope)) scopes.set(p.scope, scopes.size);
      for (const binding of Object.values(p.scope.bindings)) {
        if (!seen.has(binding)) {
          seen.add(binding);
          bindings.push(binding);
        }
      }
    },
  });
  assert.equal(
    bindings.length,
    manifest.length,
    "Changed declaration inventory",
  );
  const bindingNames = new Map();
  for (const binding of bindings) {
    const key = `${scopes.get(binding.scope)}:${binding.identifier.name}`;
    assert.ok(inverse.has(key), `Unrecorded binding: ${key}`);
    bindingNames.set(binding, inverse.get(key));
  }
  // Resolve all identifiers before changing any node,
  // then restore only variable positions; public property keys stay untouched.
  const edits = [];
  const declarations = new Map(
    [...bindingNames].map(([binding, name]) => [binding.identifier, name]),
  );
  traverse(ast, {
    Identifier(p) {
      if (declarations.has(p.node)) {
        edits.push([p.node, declarations.get(p.node)]);
        return;
      }
      const binding = p.scope.getBinding(p.node.name);
      if (!bindingNames.has(binding)) return;
      const parent = p.parentPath;
      if (
        p.key === "property" &&
        parent.isMemberExpression() &&
        !parent.node.computed
      )
        return;
      if (
        p.key === "key" &&
        (parent.isObjectProperty() || parent.isObjectMethod()) &&
        !parent.node.computed
      )
        return;
      if (p.isReferencedIdentifier() || p.isBindingIdentifier())
        edits.push([p.node, bindingNames.get(binding)]);
    },
  });
  for (const [node, name] of edits) node.name = name;
}
function compare(a, b, path = "application") {
  if (a === b) return;
  if (!a || !b || typeof a !== "object" || typeof b !== "object")
    throw new Error(
      `Unexpected application change at ${path}${path.endsWith(".name") ? ": " + JSON.stringify(a) + " versus " + JSON.stringify(b) : ""}`,
    );
  assert.deepEqual(
    Object.keys(a).sort(),
    Object.keys(b).sort(),
    `Different fields at ${path}`,
  );
  for (const key of Object.keys(a)) compare(a[key], b[key], `${path}.${key}`);
}
function verifyReadable(conservative, readable, manifest) {
  const baseline = parse(conservative);
  assert.equal(baseline.program.body.length, 7);
  const entry = baseline.program.body[6].expression;
  assert.equal(entry.type, "SequenceExpression");
  assert.equal(entry.expressions.length, 2);
  assert.equal(entry.expressions[0].callee.name, "_0x56df5f");
  // This is the entire authorized bootstrap-removal delta.
  baseline.program.body = [
    { type: "ExpressionStatement", expression: entry.expressions[1] },
  ];
  const candidate = parse(readable);
  traverse(candidate, {
    Identifier(p) {
      assert.ok(
        !/^_0x[\da-f]+$/i.test(p.node.name),
        "Obfuscated identifier remains",
      );
    },
  });
  annotateBindings(baseline);
  annotateBindings(candidate);
  restoreNames(candidate, manifest);
  compare(
    statements(baseline.program.body),
    statements(candidate.program.body),
  );
  return {
    passed: true,
    outputSha256: sha256(readable),
    checkedRenamedBindings: manifest.length,
    authorizedChanges: [
      "Removed encoded table and decoder",
      "Removed obfuscator self-defense",
      "Removed console suppression",
    ],
  };
}

if (require.main === module) {
  const [originalPath, conservativePath, readablePath, flag] =
    process.argv.slice(2);
  if (!readablePath)
    throw new Error(
      "Usage: node verify-readable.cjs ORIGINAL.js CONSERVATIVE.js READABLE.js [--self-test]",
    );
  const conservative = fs.readFileSync(conservativePath, "utf8");
  verifyConservative(loadOriginal(originalPath), conservative);
  const readable = fs.readFileSync(readablePath, "utf8");
  const manifest = JSON.parse(
    fs.readFileSync(readablePath + ".names.json", "utf8"),
  );
  const result = verifyReadable(conservative, readable, manifest);
  if (flag === "--self-test") {
    function changeString(needle, replacement) {
      const ast = parse(readable);
      let changed = false;
      traverse(ast, {
        StringLiteral(p) {
          if (!changed && p.node.value.includes(needle)) {
            p.node.value = p.node.value.replace(needle, replacement);
            delete p.node.extra;
            changed = true;
          }
        },
      });
      assert.ok(changed, "Mutation target not found: " + needle);
      return require("@babel/generator").default(ast).code;
    }
    const mutations = [
      [
        "string",
        changeString(
          "gmbonjklezcfxta1234567890GMBONJKLEZCFXTA",
          "changed alphabet",
        ),
      ],
      ["number", readable.replace("clientVersion = 7", "clientVersion = 999")],
      ["operator", readable.replace("!==", "===")],
      ["reference", readable.replace("= nowSeconds()", "= nowMilliseconds()")],
      [
        "HTTP URL",
        changeString(
          "/api/get-painting.php?id=",
          "/api/changed-endpoint.php?id=",
        ),
      ],
      [
        "socket event",
        changeString("chat.user.command", "changed.socket.event"),
      ],
      ["payload key", changeString("CACHE-L0CAL", "CHANGED-HEADER")],
      [
        "DOM selector",
        changeString("#notification .box", "#changed-notification .box"),
      ],
      ["statement", readable + '\nthrow new Error("changed application");'],
      ["bootstrap reintroduction", "_0x56df5f();\n" + readable],
    ];
    for (const [label, mutation] of mutations) {
      assert.notEqual(
        mutation,
        readable,
        `Mutation ${label} did not change source`,
      );
      assert.throws(
        () => verifyReadable(conservative, mutation, manifest),
        undefined,
        `Accepted ${label} mutation`,
      );
    }
    result.rejectedMutations = mutations.map(([label]) => label);
  }
  console.log(JSON.stringify(result, null, 2));
}
module.exports = {
  verifyReadable,
  restoreNames,
  annotateBindings,
  compare,
  statements,
};
