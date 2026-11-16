const fs = require('node:fs');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { loadOriginal, parse, sha256 } = require('./common.cjs');

// Independent verification: this module never imports the transformer.
// Only these primitive operations may differ in the two syntax trees.
const operators = new Map(['+', '-', '*', '/', '%', '<<', '>>', '>>>', '&', '|', '^'].map((op) => [
  op, new vm.Script(`(a, b) => a ${op} b`).runInNewContext(Object.create(null))
]));
const unary = new Map(['!', '+', '-', '~'].map((op) => [
  op, new vm.Script(`a => ${op}a`).runInNewContext(Object.create(null))
]));
const metadata = new Set(['start', 'end', 'loc', 'extra', 'leadingComments', 'trailingComments', 'innerComments']);
const constant = (value) => ({ constant: true, kind: value === null ? 'null' : typeof value, value: Object.is(value, -0) ? '-0' : value });
const valueOf = (node) => node.kind === 'number' && node.value === '-0' ? -0 : node.value;

function normalize(node, strings) {
  if (Array.isArray(node)) return node.map((item) => normalize(item, strings));
  if (!node || typeof node !== 'object') return node;
  if (['StringLiteral', 'NumericLiteral', 'BooleanLiteral'].includes(node.type)) return constant(node.value);
  if (node.type === 'NullLiteral') return constant(null);
  // The printer can omit parentheses between identical logical operators.
  // Flatten only that associative shape; preserve operand order/short circuiting.
  if (node.type === 'LogicalExpression') {
    const operands = [];
    function collect(part) {
      if (part.type === 'LogicalExpression' && part.operator === node.operator) {
        collect(part.left);
        collect(part.right);
      } else operands.push(normalize(part, strings));
    }
    collect(node);
    return { type: node.type, operator: node.operator, operands };
  }
  if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === '_0x187b') {
    assert.equal(node.arguments.length, 1);
    assert.equal(node.arguments[0].type, 'StringLiteral');
    assert.match(node.arguments[0].value, /^0x[\da-f]+$/i);
    const index = Number(node.arguments[0].value);
    assert.ok(Number.isInteger(index) && index >= 0 && index < strings.length);
    return constant(strings[index]);
  }
  if (node.type === 'UnaryExpression' && node.operator === '!' && node.argument.type === 'ArrayExpression' && node.argument.elements.length === 0) return constant(false);
  const result = {};
  for (const [key, value] of Object.entries(node).sort(([a], [b]) => a.localeCompare(b))) {
    if (!metadata.has(key)) result[key] = normalize(value, strings);
  }
  if (node.type === 'UnaryExpression' && result.argument.constant && unary.has(node.operator)) {
    const value = unary.get(node.operator)(valueOf(result.argument));
    if (typeof value !== 'number' || Number.isFinite(value)) return constant(value);
  }
  if (node.type === 'BinaryExpression' && result.left.constant && result.right.constant && operators.has(node.operator)) {
    const value = operators.get(node.operator)(valueOf(result.left), valueOf(result.right));
    if (typeof value !== 'number' || Number.isFinite(value)) return constant(value);
  }
  if (node.type === 'MemberExpression' && !node.computed && node.property.type === 'Identifier') {
    result.computed = true;
    result.property = constant(node.property.name);
  }
  return result;
}

function verify(original, candidate) {
  const prefix = original.source.slice(0, original.boundary);
  assert.ok(candidate.startsWith(prefix), 'Self-defending bootstrap must remain byte-for-byte identical');
  const candidateAst = parse(candidate);
  assert.equal(candidateAst.program.body[5].end, original.boundary);
  const expected = normalize(original.ast.program.body.slice(6), original.strings);
  const actual = normalize(candidateAst.program.body.slice(6), original.strings);
  function compare(a, b, path = 'application') {
    if (a === b) return;
    if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
      throw new Error(`Application differs at ${path}: ${JSON.stringify(a)} versus ${JSON.stringify(b)}`);
    }
    assert.deepEqual(Object.keys(a).sort(), Object.keys(b).sort(), `Different syntax fields at ${path}`);
    for (const key of Object.keys(a)) compare(a[key], b[key], `${path}.${key}`);
  }
  compare(actual, expected);
  return { passed: true, outputSha256: sha256(candidate), stringTableEntriesChecked: original.strings.length };
}

if (require.main === module) {
  const [input, output, testFlag] = process.argv.slice(2);
  if (!input || !output) throw new Error('Usage: node verify.cjs ORIGINAL.js OUTPUT.js [--self-test]');
  const original = loadOriginal(input);
  const candidate = fs.readFileSync(output, 'utf8');
  const result = verify(original, candidate);
  if (testFlag === '--self-test') {
    const tail = candidate.slice(original.boundary);
    const mutations = [
      ['bootstrap byte', ' ' + candidate],
      ['statement insertion', candidate + '\nthrow new Error("verification mutation");'],
      ['string value', candidate.slice(0, original.boundary) + tail.replace(/"[^"\n]*"/, '"verification mutation"')],
      ['numeric value', candidate.slice(0, original.boundary) + tail.replace(/\bvar (_0x[\da-f]+) = \d+/, 'var $1 = 987654321')],
      ['operator', candidate.slice(0, original.boundary) + tail.replace('!==', '===')]
    ];
    for (const [label, mutation] of mutations) {
      assert.notEqual(mutation, candidate, `Mutation ${label} must change the file`);
      assert.throws(() => verify(original, mutation), undefined, `Verifier accepted ${label} mutation`);
    }
    result.rejectedMutations = mutations.map(([label]) => label);
  }
  console.log(JSON.stringify(result, null, 2));
}

module.exports = { verify };
