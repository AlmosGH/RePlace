const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const parser = require('@babel/parser');

const SOURCE_SHA256 = 'f6bf3ef894bac00f0434dc2362a025cf01a63583980d29d4e7962fccda04fff8';
const sha256 = (text) => crypto.createHash('sha256').update(text).digest('hex');
const parse = (text) => parser.parse(text, { sourceType: 'script' });

function loadOriginal(filename) {
  const bytes = fs.readFileSync(filename);
  if (sha256(bytes) !== SOURCE_SHA256) throw new Error('Input differs from the audited original script.');
  const source = bytes.toString('utf8');
  const ast = parse(source);
  const boundary = ast.program.body[5].end;
  // Execute only the audited table/rotation/decoder, in its original formatting.
  // Never execute the application, Function constructor, or console suppression.
  const context = vm.createContext(Object.create(null), { codeGeneration: { strings: false, wasm: false } });
  vm.runInContext(source.slice(0, ast.program.body[2].end), context, { timeout: 5000 });
  const strings = vm.runInContext(
    'Array.from({length:_0x2837.length}, (_, index) => _0x187b(index))',
    context, { timeout: 5000 }
  );
  if (strings.length !== 7755 || strings.some((s) => typeof s !== 'string')) throw new Error('Unexpected string table');
  return { source, ast, boundary, strings };
}

module.exports = { SOURCE_SHA256, sha256, parse, loadOriginal };
