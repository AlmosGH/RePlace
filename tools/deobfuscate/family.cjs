const path = require("node:path");
const { spawnSync } = require("node:child_process");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const { parse, sha256 } = require("./common.cjs");
const { fold } = require("./transform.cjs");
const { normalize } = require("./verify.cjs");
const { compare } = require("./verify-readable.cjs");

function numeric(node) {
  if (t.isNumericLiteral(node)) return node.value;
  if (t.isUnaryExpression(node) && ["-", "+"].includes(node.operator))
    return node.operator === "-"
      ? -numeric(node.argument)
      : numeric(node.argument);
  if (t.isBinaryExpression(node)) {
    const a = numeric(node.left),
      b = numeric(node.right);
    if (node.operator === "+") return a + b;
    if (node.operator === "-") return a - b;
    if (node.operator === "*") return a * b;
  }
  throw Error("Unsupported numeric obfuscation");
}
function expand(source) {
  const ast = parse(source),
    body = ast.program.body;
  if (
    body.length !== 7 ||
    !t.isVariableDeclaration(body[0]) ||
    !t.isVariableDeclaration(body[2])
  )
    throw Error("Unsupported bootstrap layout");
  const table = body[0].declarations[0],
    decoder = body[2].declarations[0];
  if (
    body[0].declarations.length !== 1 ||
    !t.isArrayExpression(table.init) ||
    table.init.elements.length < 100 ||
    table.init.elements.length > 30000 ||
    table.init.elements.some((x) => !t.isStringLiteral(x))
  )
    throw Error("Unsupported encoded table");
  const rotation = body[1].expression;
  if (
    !t.isCallExpression(rotation) ||
    !t.isFunctionExpression(rotation.callee) ||
    rotation.arguments.length !== 2 ||
    rotation.arguments[0].name !== table.id.name ||
    !t.isFunctionExpression(decoder.init)
  )
    throw Error("Unsupported rotation/decoder");
  const turns = numeric(rotation.arguments[1]);
  if (!Number.isInteger(turns) || turns < 0 || turns > 100000)
    throw Error("Unbounded table rotation");
  const indexAssignment = decoder.init.body.body[0]?.expression;
  if (
    !t.isAssignmentExpression(indexAssignment) ||
    !t.isBinaryExpression(indexAssignment.right, { operator: "-" }) ||
    numeric(indexAssignment.right.right) !== 0
  )
    throw Error("Unsupported decoder offset");
  const prefixAst = parse(source.slice(0, body[2].end));
  const alphabets = [],
    free = new Set();
  traverse(prefixAst, {
    StringLiteral(p) {
      if (
        p.node.value.length === 65 &&
        new Set(p.node.value).size === 65 &&
        p.node.value.endsWith("/=")
      )
        alphabets.push(p.node.value);
    },
    ReferencedIdentifier(p) {
      if (!p.scope.getBinding(p.node.name)) free.add(p.node.name);
    },
  });
  const allowed = new Set([
    "undefined",
    "String",
    "RegExp",
    "decodeURIComponent",
    "Math",
    "Boolean",
  ]);
  if ([...free].some((name) => !allowed.has(name)) || alphabets.length !== 1)
    throw Error("Unrecognized decoder capabilities");
  const alphabet = alphabets[0],
    standard =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  const encoded = table.init.elements.map((node) => node.value);
  const shifted = encoded
    .slice(turns % encoded.length)
    .concat(encoded.slice(0, turns % encoded.length));
  const strings = shifted.map((entry) => {
    if (!/^[\w+/]*={0,2}$/.test(entry)) throw Error("Unsupported base64 data");
    const translated = [...entry]
      .map((char) => standard[alphabet.indexOf(char)])
      .join("");
    return new TextDecoder("utf-8", { fatal: true }).decode(
      Buffer.from(translated, "base64"),
    );
  });
  const audit = spawnSync(
    process.execPath,
    [
      "--max-old-space-size=128",
      "--permission",
      path.join(__dirname, "decoder-audit.cjs"),
    ],
    {
      input: JSON.stringify({
        prefix: source.slice(0, body[2].end),
        decoder: decoder.id.name,
        entries: strings.length,
      }),
      encoding: "utf8",
      timeout: 8000,
      maxBuffer: 1024 * 1024,
      windowsHide: true,
    },
  );
  if (audit.status !== 0 || audit.stdout !== sha256(JSON.stringify(strings)))
    throw Error(
      "Static decoder disagrees with the isolated original decoder: " +
        (audit.stderr || audit.error?.message || "hash mismatch"),
    );
  const entry = body[6].expression;
  if (
    !t.isSequenceExpression(entry) ||
    entry.expressions.length !== 2 ||
    !t.isCallExpression(entry.expressions[0]) ||
    !t.isIdentifier(entry.expressions[0].callee) ||
    !t.isCallExpression(entry.expressions[1]) ||
    entry.expressions[1].callee.name !== "$"
  )
    throw Error("Unsupported application entry point");
  const raw = t.file(
    t.program([t.expressionStatement(t.cloneNode(entry.expressions[1], true))]),
  );
  const expanded = t.cloneNode(raw, true);
  let decodedCalls = 0,
    foldedExpressions = 0;
  traverse(expanded, {
    CallExpression: {
      exit(p) {
        if (!t.isIdentifier(p.node.callee, { name: decoder.id.name })) return;
        if (
          p.scope.getBinding(decoder.id.name) ||
          p.node.arguments.length !== 1 ||
          !t.isStringLiteral(p.node.arguments[0]) ||
          !/^0x[\da-f]+$/i.test(p.node.arguments[0].value)
        )
          throw Error("Unsupported dynamic string lookup");
        const index = Number(p.node.arguments[0].value);
        if (index < 0 || index >= strings.length)
          throw Error("Invalid table index");
        p.replaceWith(t.stringLiteral(strings[index]));
        decodedCalls++;
      },
    },
    "UnaryExpression|BinaryExpression": {
      exit(p) {
        const result = fold(p.node);
        if (
          !result ||
          (typeof result.value === "number" && !Number.isFinite(result.value))
        )
          return;
        const replacement = t.valueToNode(result.value);
        if (!t.isNodesEquivalent(p.node, replacement)) {
          p.replaceWith(replacement);
          foldedExpressions++;
        }
      },
    },
    MemberExpression: {
      exit(p) {
        if (
          p.node.computed &&
          t.isStringLiteral(p.node.property) &&
          t.isValidIdentifier(p.node.property.value, false)
        ) {
          p.node.property = t.identifier(p.node.property.value);
          p.node.computed = false;
        }
      },
    },
  });
  traverse(raw, {
    CallExpression(p) {
      if (t.isIdentifier(p.node.callee, { name: decoder.id.name }))
        p.node.callee.name = "_0x187b";
    },
  });
  compare(
    normalize(raw.program.body, strings),
    normalize(expanded.program.body, strings),
  );
  return {
    ast: expanded,
    strings,
    header: source.slice(0, body[0].start),
    report: {
      decoderFamily: "rotated-custom-base64",
      bodySha256: sha256(source.slice(body[0].start)),
      stringTableEntries: strings.length,
      decodedCalls,
      foldedExpressions,
      decoderAudited: true,
      expandedApplicationVerified: true,
      removedBootstrapBytes: Buffer.byteLength(
        source.slice(body[0].start, body[6].start),
      ),
    },
  };
}
module.exports = { expand };
