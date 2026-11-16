const fs = require('node:fs');
const path = require('node:path');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const { loadOriginal, sha256, SOURCE_SHA256 } = require('./common.cjs');

function primitive(node) {
  if (t.isStringLiteral(node) || t.isNumericLiteral(node) || t.isBooleanLiteral(node)) return { value: node.value };
  if (t.isNullLiteral(node)) return { value: null };
  // Babel represents negative numbers as a unary expression after reparsing.
  if (t.isUnaryExpression(node, { operator: '-' }) && t.isNumericLiteral(node.argument)) return { value: -node.argument.value };
  return null;
}

function fold(node) {
  if (t.isUnaryExpression(node)) {
    if (node.operator === '!' && t.isArrayExpression(node.argument) && node.argument.elements.length === 0) return { value: false };
    const argument = primitive(node.argument);
    if (!argument) return null;
    switch (node.operator) {
      case '!': return { value: !argument.value };
      case '+': return { value: +argument.value };
      case '-': return { value: -argument.value };
      case '~': return { value: ~argument.value };
      default: return null;
    }
  }
  if (!t.isBinaryExpression(node)) return null;
  const left = primitive(node.left), right = primitive(node.right);
  if (!left || !right) return null;
  const a = left.value, b = right.value;
  switch (node.operator) {
    case '+': return { value: a + b };
    case '-': return { value: a - b };
    case '*': return { value: a * b };
    case '/': return { value: a / b };
    case '%': return { value: a % b };
    case '<<': return { value: a << b };
    case '>>': return { value: a >> b };
    case '>>>': return { value: a >>> b };
    case '&': return { value: a & b };
    case '|': return { value: a | b };
    case '^': return { value: a ^ b };
    // Keep comparisons/branches intact, including unreachable declarations.
    default: return null;
  }
}

function transform(original) {
  const { source, ast, boundary, strings } = original;
  const counts = { decodedCalls: 0, foldedExpressions: 0, readableProperties: 0 };
  ast.program.body = ast.program.body.slice(6);
  traverse(ast, {
    CallExpression: {
      exit(p) {
        if (!t.isIdentifier(p.node.callee, { name: '_0x187b' })) return;
        if (p.scope.getBinding('_0x187b')) throw new Error('Unexpected decoder shadowing');
        const args = p.node.arguments;
        if (args.length !== 1 || !t.isStringLiteral(args[0]) || !/^0x[\da-f]+$/i.test(args[0].value)) throw new Error('Unexpected decoder call');
        const index = Number(args[0].value);
        if (!Number.isInteger(index) || index < 0 || index >= strings.length) throw new Error('Invalid string index');
        p.replaceWith(t.stringLiteral(strings[index]));
        counts.decodedCalls++;
      }
    },
    'UnaryExpression|BinaryExpression': {
      exit(p) {
        const result = fold(p.node);
        if (!result || (typeof result.value === 'number' && !Number.isFinite(result.value))) return;
        const replacement = t.valueToNode(result.value);
        if (t.isNodesEquivalent(p.node, replacement)) return;
        p.replaceWith(replacement);
        counts.foldedExpressions++;
      }
    },
    MemberExpression: {
      exit(p) {
        if (p.node.computed && t.isStringLiteral(p.node.property) && t.isValidIdentifier(p.node.property.value, false)) {
          p.node.property = t.identifier(p.node.property.value);
          p.node.computed = false;
          counts.readableProperties++;
        }
      }
    }
  });
  const code = source.slice(0, boundary) + '\n\n' + generate(ast, {
    comments: true, compact: false, minified: false, jsescOption: { minimal: true }
  }).code + '\n';
  return { code, counts, boundary };
}

if (require.main === module) {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) throw new Error('Usage: node transform.cjs ORIGINAL.js OUTPUT.js');
  const { code, counts, boundary } = transform(loadOriginal(input));
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, code);
  fs.writeFileSync(output + '.report.json', JSON.stringify({
    sourceSha256: SOURCE_SHA256, outputSha256: sha256(code), preservedBootstrapBytes: boundary,
    stringTableEntries: 7755, ...counts
  }, null, 2) + '\n');
  console.log(JSON.stringify({ output, ...counts }));
}

module.exports = { transform, fold };
