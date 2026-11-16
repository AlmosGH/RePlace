// Inventory the deliberately removed obfuscator guards for historical reports.
// Decode and prune statically; never invoke these guard functions.
const t = require("@babel/types");
const traverse = require("@babel/traverse").default;
const { fold } = require("./transform.cjs");
const { simplify } = require("./readable.cjs");
const { digest } = require("./name-model.cjs");
function bootstrapFacts(body, decoderName, strings) {
  const ast = t.file(
    t.program(body.slice(3, -1).map((node) => t.cloneNode(node, true))),
  );
  traverse(ast, {
    CallExpression(p) {
      if (
        t.isIdentifier(p.node.callee, { name: decoderName }) &&
        t.isStringLiteral(p.node.arguments[0])
      ) {
        const index = Number(p.node.arguments[0].value);
        if (Number.isInteger(index) && index >= 0 && index < strings.length)
          p.replaceWith(t.stringLiteral(strings[index]));
      }
    },
    "UnaryExpression|BinaryExpression": {
      exit(p) {
        const result = fold(p.node);
        if (
          result &&
          (typeof result.value !== "number" || Number.isFinite(result.value))
        ) {
          const replacement = t.valueToNode(result.value);
          if (!t.isNodesEquivalent(p.node, replacement))
            p.replaceWith(replacement);
        }
      },
    },
  });
  simplify(ast);
  const literals = new Set(),
    properties = new Set();
  let debuggerStatement = false;
  traverse(ast, {
    StringLiteral(p) {
      literals.add(p.node.value);
    },
    MemberExpression(p) {
      const key = p.node.computed
        ? p.node.property.value
        : p.node.property.name;
      if (typeof key === "string") properties.add(key);
    },
    DebuggerStatement() {
      debuggerStatement = true;
    },
  });
  const has = (value) => literals.has(value) || properties.has(value);
  const features = [];
  if (has("console") && has("log") && has("warn"))
    features.push("console suppression");
  if (
    [...literals].some((value) => value.includes("^([^ ]+")) ||
    [...literals].some((value) => value.includes('return /"'))
  )
    features.push("function-source self-defense");
  if (has("charCodeAt") && has("indexOf") && has("getAttribute"))
    features.push("obfuscator domain restriction");
  if (debuggerStatement || has("debugger")) features.push("debugger guard");
  return {
    features: features.sort(),
    implementationFingerprint: digest(ast.program),
    assessment:
      "Static classification of deliberately removed obfuscator guards; an implementation fingerprint change can be generated obfuscation noise, not a new protection.",
  };
}
module.exports = { bootstrapFacts };
