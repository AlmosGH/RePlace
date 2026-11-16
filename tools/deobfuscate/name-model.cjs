const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const { sha256 } = require("./common.cjs");
const ignored = new Set([
  "start",
  "end",
  "loc",
  "extra",
  "leadingComments",
  "trailingComments",
  "innerComments",
]);
const builtins = new Set([
  "Math",
  "Date",
  "String",
  "Number",
  "Array",
  "Object",
  "JSON",
  "document",
  "window",
  "localStorage",
  "Cookies",
  "$",
  "parseInt",
  "parseFloat",
  "isNaN",
  "setTimeout",
  "setInterval",
]);
function shape(node, parent, key, depth = 0) {
  if (!node || typeof node !== "object") return node;
  if (Array.isArray(node))
    return node.map((n) => shape(n, parent, key, depth + 1));
  if (t.isIdentifier(node)) {
    const property =
      parent &&
      ((t.isMemberExpression(parent) &&
        key === "property" &&
        !parent.computed) ||
        ((t.isObjectProperty(parent) || t.isObjectMethod(parent)) &&
          key === "key" &&
          !parent.computed));
    return {
      type: "Identifier",
      name: property || builtins.has(node.name) ? node.name : "$binding",
    };
  }
  const out = {};
  for (const field of Object.keys(node).sort())
    if (!ignored.has(field))
      out[field] = shape(node[field], node, field, depth + 1);
  return out;
}
function digest(node) {
  return sha256(JSON.stringify(shape(node))).slice(0, 24);
}
function keyOf(node) {
  return node?.key?.name || node?.key?.value || "";
}
function makeSignatures(ast) {
  traverse(ast, {
    Program(p) {
      p.scope.crawl();
    },
  });
  const anchors = new Map();
  function anchor(scope) {
    const functionScope = scope.getFunctionParent();
    if (!functionScope) return "program";
    if (anchors.has(functionScope)) return anchors.get(functionScope);
    const fn = functionScope.path,
      parent = fn.parentPath;
    let value;
    if (parent.isCallExpression() && parent.node.callee.name === "$")
      value = "ready";
    else if (fn.isFunctionDeclaration() && fn.node.body.body.length > 150)
      value = "initializePainting";
    else if (parent.isObjectProperty() || fn.isObjectMethod())
      value = "method:" + keyOf(fn.isObjectMethod() ? fn.node : parent.node);
    else if (
      parent.isAssignmentExpression() &&
      t.isMemberExpression(parent.node.left) &&
      !parent.node.left.computed
    )
      value =
        "method:" +
        (parent.node.left.property.name || parent.node.left.property.value);
    else if (parent.isCallExpression()) {
      const c = parent.node.callee,
        method = t.isMemberExpression(c)
          ? c.property.name || c.property.value
          : c.name;
      const labels = parent.node.arguments
        .filter((arg) => t.isStringLiteral(arg))
        .map((arg) => arg.value);
      value = labels.length
        ? `callback:${method}:${labels.join("|")}`
        : "callback:" + method + ":" + digest(fn.node.body);
    } else value = "function:" + digest(fn.node.body);
    const enclosing = functionScope.parent ? anchor(functionScope.parent) : "";
    const result = enclosing + "/" + value;
    anchors.set(functionScope, result);
    return result;
  }
  const rows = [],
    seen = new Set();
  traverse(ast, {
    Scope(p) {
      for (const binding of Object.values(p.scope.bindings)) {
        if (seen.has(binding)) continue;
        seen.add(binding);
        const decl = binding.path,
          fields = [],
          references = [];
        for (const ref of binding.referencePaths) {
          if (ref.parentPath.isMemberExpression() && ref.key === "object") {
            const member = ref.parent,
              property = member.computed
                ? member.property.value || "[index]"
                : member.property.name;
            references.push(property);
            const assignment = ref.parentPath.parentPath;
            if (
              assignment.isAssignmentExpression() &&
              ref.parentPath.key === "left"
            )
              fields.push([
                property,
                t.isFunction(assignment.node.right)
                  ? "function"
                  : digest(assignment.node.right),
              ]);
          }
        }
        let init = decl.isVariableDeclarator() ? decl.node.init : null;
        const fn = binding.scope.path.node;
        const parameter =
          binding.kind === "param"
            ? fn.params.findIndex((param) => param === binding.identifier)
            : null;
        const initializer = t.isObjectExpression(init)
          ? ["object", init.properties.map(keyOf)]
          : decl.isFunctionDeclaration()
            ? decl.node.body.body.length > 150
              ? "initializer"
              : digest(decl.node.body)
            : digest(init);
        const data = {
          scope: anchor(binding.scope),
          kind: binding.kind,
          parameter,
          initializer,
          fields: [
            ...new Map(fields.map((x) => [JSON.stringify(x), x])).values(),
          ].sort(),
          references: [...new Set(references)].sort(),
        };
        const variants = [
          data,
          {
            scope: data.scope,
            kind: data.kind,
            parameter: data.parameter,
            initializer: data.initializer,
            fields: data.fields,
          },
        ];
        if (binding.kind === "param")
          variants.push({
            scope: data.scope,
            kind: data.kind,
            parameter: data.parameter,
          });
        else
          variants.push({
            scope: data.scope,
            kind: data.kind,
            initializer: data.initializer,
            references: data.references,
          });
        rows.push({
          original: binding.identifier.name,
          signatures: variants.map((variant, index) =>
            sha256(index + JSON.stringify(variant)),
          ),
          context: data.scope,
        });
      }
    },
  });
  return rows;
}
function learn(ast, manifest) {
  const known = new Map(
      manifest.map((entry) => [entry.original, entry.readable]),
    ),
    model = new Map();
  for (const row of makeSignatures(ast)) {
    const name = known.get(row.original);
    if (!name) continue;
    for (const signature of row.signatures) {
      if (!model.has(signature)) model.set(signature, new Set());
      model.get(signature).add(name);
    }
  }
  return [...model]
    .filter(([, names]) => names.size === 1)
    .map(([signature, names]) => ({ signature, name: [...names][0] }));
}
function hints(ast, model) {
  const map = new Map(model.map((row) => [row.signature, row.name])),
    result = {};
  for (const row of makeSignatures(ast)) {
    const signature = row.signatures.find((key) => map.has(key));
    if (signature) result[row.original] = map.get(signature);
  }
  return result;
}
module.exports = { learn, hints, digest };

// Align unchanged statements/methods as well as binding fingerprints. This
// transfers names across a new obfuscation seed without relying on hex IDs or
// declaration positions. Competing correspondences are counted, not overwritten.
function alignNames(reference, target, manifest) {
  const known = new Map(
    manifest.map((entry) => [entry.original, entry.readable]),
  );
  const votes = new Map(),
    keys = new WeakMap();
  const bags = new WeakMap();
  function bag(node) {
    if (bags.has(node)) return bags.get(node);
    const tokens = new Set();
    function visit(n) {
      if (!n) return;
      if (t.isStringLiteral(n)) tokens.add("s:" + n.value);
      if (t.isMemberExpression(n) && !n.computed)
        tokens.add("p:" + n.property.name);
      for (const k of t.VISITOR_KEYS[n.type] || []) {
        const v = n[k];
        if (Array.isArray(v)) v.forEach(visit);
        else visit(v);
      }
    }
    visit(node);
    bags.set(node, tokens);
    return tokens;
  }
  function similarity(a, b) {
    const x = bag(a),
      y = bag(b);
    let common = 0;
    for (const token of x) if (y.has(token)) common++;
    return common / (x.size + y.size - common || 1);
  }
  function stable(node) {
    if (!node || typeof node !== "object") return String(node);
    if (keys.has(node)) return keys.get(node);
    let value = node.type;
    if (t.isExpressionStatement(node)) value = stable(node.expression);
    else if (t.isFunctionExpression(node) || t.isArrowFunctionExpression(node))
      value = "callback:" + node.params.length;
    else if (t.isVariableDeclarator(node))
      value = t.isObjectExpression(node.init)
        ? "object:" + node.init.properties.map(keyOf).slice(0, 8).join(",")
        : t.isFunction(node.init)
          ? "function"
          : digest(node.init);
    else if (t.isFunctionDeclaration(node))
      value =
        node.body.body.length > 150 ? "large-initializer" : digest(node.body);
    else if (t.isObjectProperty(node) || t.isObjectMethod(node))
      value = "property:" + keyOf(node);
    else if (t.isAssignmentExpression(node) && t.isMemberExpression(node.left))
      value = "assignment:" + digest(node.left);
    else if (t.isIfStatement(node)) value = "if:" + digest(node.test);
    else if (t.isVariableDeclaration(node))
      value =
        "declaration:" +
        node.kind +
        ":" +
        node.declarations
          .map((d) =>
            t.isObjectExpression(d.init)
              ? "object:" + d.init.properties.map(keyOf).slice(0, 8).join(",")
              : t.isFunction(d.init)
                ? "function"
                : digest(d.init),
          )
          .join(",");
    else if (t.isCallExpression(node)) {
      const c = node.callee,
        method = t.isMemberExpression(c)
          ? c.property.name || c.property.value
          : c.name;
      value =
        "call:" +
        (/^_0x/.test(method || "") ? "local" : method) +
        ":" +
        node.arguments
          .filter(t.isStringLiteral)
          .map((arg) => arg.value)
          .join("|");
    } else value = digest(node);
    keys.set(node, value);
    return value;
  }
  function pair(a, b) {
    if (!a || !b) return;
    if (Array.isArray(a) && Array.isArray(b)) {
      const matched = new Set();
      for (const old of a.filter(
        (n) => t.isFunctionDeclaration(n) && n.body.body.length <= 150,
      )) {
        const ranked = b
          .filter(
            (n) =>
              t.isFunctionDeclaration(n) &&
              n.body.body.length <= 150 &&
              !matched.has(n) &&
              n.params.length === old.params.length,
          )
          .map((n) => ({ node: n, score: similarity(old, n) }))
          .sort((x, y) => y.score - x.score);
        if (
          ranked[0]?.score >= 0.65 &&
          (!ranked[1] || ranked[0].score > ranked[1].score + 0.1)
        ) {
          matched.add(ranked[0].node);
          pair(old, ranked[0].node);
        }
      }
      if (a.length * b.length > 2_000_000) return;
      const left = a.map(stable),
        right = b.map(stable),
        width = b.length + 1,
        table = new Uint16Array((a.length + 1) * width);
      for (let i = a.length - 1; i >= 0; i--)
        for (let j = b.length - 1; j >= 0; j--)
          table[i * width + j] =
            left[i] === right[j]
              ? table[(i + 1) * width + j + 1] + 1
              : Math.max(table[(i + 1) * width + j], table[i * width + j + 1]);
      let i = 0,
        j = 0;
      while (i < a.length && j < b.length) {
        if (left[i] === right[j]) {
          pair(a[i++], b[j++]);
        } else if (table[(i + 1) * width + j] >= table[i * width + j + 1]) i++;
        else j++;
      }
      return;
    }
    if (a.type !== b.type) return;
    if (
      t.isIdentifier(a) &&
      t.isIdentifier(b) &&
      known.has(a.name) &&
      /^_0x/.test(b.name)
    ) {
      if (!votes.has(b.name)) votes.set(b.name, new Map());
      const counts = votes.get(b.name),
        name = known.get(a.name);
      counts.set(name, (counts.get(name) || 0) + 1);
      return;
    }
    for (const key of t.VISITOR_KEYS[a.type] || []) pair(a[key], b[key]);
  }
  pair(reference.program.body, target.program.body);
  const result = {};
  for (const [name, counts] of votes) {
    const sorted = [...counts].sort((a, b) => b[1] - a[1]);
    if (sorted.length === 1 || sorted[0][1] > sorted[1][1] * 2)
      result[name] = sorted[0][0];
  }
  return result;
}
module.exports.alignNames = alignNames;
