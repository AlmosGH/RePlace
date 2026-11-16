const fs = require("node:fs");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const { parse, sha256 } = require("./common.cjs");
const { simplify, print } = require("./readable.cjs");

const [baselinePath, readablePath] = process.argv.slice(2);
if (!readablePath)
  throw new Error("Usage: node test-readable.cjs CONSERVATIVE.js READABLE.js");
const baseline = fs.readFileSync(baselinePath, "utf8");
const readable = fs.readFileSync(readablePath, "utf8");
const manifest = JSON.parse(
  fs.readFileSync(readablePath + ".names.json", "utf8"),
);
const names = new Map(
  manifest.map((entry) => [entry.readable, entry.original]),
);

// Run the actual readable top level with an inert ready callback collector.
// There are no network, DOM, file, timer, or application mocks to hide side effects.
const smoke = vm.createContext(Object.create(null), {
  codeGeneration: { strings: false, wasm: false },
});
vm.runInContext(
  "globalThis.readyCalls = []; globalThis.$ = callback => readyCalls.push(callback); globalThis.savedConsoleLog = console.log;",
  smoke,
);
vm.runInContext(readable, smoke, { timeout: 5000 });
assert.equal(vm.runInContext("readyCalls.length", smoke), 1);
assert.equal(vm.runInContext("typeof readyCalls[0]", smoke), "function");
assert.equal(vm.runInContext("console.log === savedConsoleLog", smoke), true);

const helpers = [
  "randomCacheToken",
  "randomHolidayEmoji",
  "randomAlphanumericString",
  "nowMilliseconds",
  "nowSeconds",
  "roundToDecimals",
  "randomIntegerInclusive",
  "randomInteger",
  "isOdd",
  "formatDuration",
  "formatElapsedTime",
  "formatElapsedTimeLong",
  "byteToHex",
  "rgbToHex",
  "hexToRgb",
  "rgbToLab",
  "colorDifference",
];
function extract(source, original) {
  const declarations = new Map();
  traverse(parse(source), {
    FunctionDeclaration(p) {
      declarations.set(p.node.id.name, generate(p.node).code);
    },
  });
  return helpers
    .map((name) => {
      const id = original ? names.get(name) : name;
      assert.ok(declarations.has(id), `Missing helper ${name}`);
      return declarations.get(id);
    })
    .join("\n");
}
const setup = `
  var randomSeed = 1;
  Math.random = () => ((randomSeed = (randomSeed * 1664525 + 1013904223) >>> 0) / 4294967296);
  var NativeDate = Date;
  Date = class extends NativeDate {
    constructor(...args) { super(...(args.length ? args : [1794823200123])); }
    static now() { return 1794823200123; }
  };
  function encodeResult(value) {
    return JSON.stringify(value, (_, entry) => typeof entry === 'number' ?
      Number.isNaN(entry) ? '[NaN]' : !Number.isFinite(entry) ? '[' + entry + ']' : Object.is(entry, -0) ? '[-0]' : entry : entry);
  }
`;
const originalContext = vm.createContext(Object.create(null), {
  codeGeneration: { strings: false, wasm: false },
});
const readableContext = vm.createContext(Object.create(null), {
  codeGeneration: { strings: false, wasm: false },
});
vm.runInContext(setup + extract(baseline, true), originalContext, {
  timeout: 5000,
});
vm.runInContext(setup + extract(readable, false), readableContext, {
  timeout: 5000,
});
let cases = 0;
function differential(name, args, seed = 1, randomOverride) {
  function run(context, functionName) {
    context.caseArgs = args;
    const configure =
      randomOverride === undefined
        ? ""
        : `Math.random = () => ${randomOverride};`;
    return vm.runInContext(
      `randomSeed = ${seed}; ${configure} encodeResult(${functionName}(...caseArgs))`,
      context,
      { timeout: 1000 },
    );
  }
  assert.equal(
    run(originalContext, names.get(name)),
    run(readableContext, name),
    `Different result for ${name} ${JSON.stringify(args)}`,
  );
  cases++;
}
for (let seed = 1; seed <= 20; seed++) {
  for (const length of [-1, 0, 1, 1.5, 16, 128]) {
    differential("randomCacheToken", [length], seed);
    differential("randomAlphanumericString", [length], seed);
  }
  for (const bounds of [
    [0, 1],
    [-10, 10],
    [2, 2],
    [1.25, 4.75],
  ]) {
    differential("randomIntegerInclusive", bounds, seed);
    differential("randomInteger", bounds, seed);
  }
}
for (let index = 0; index < 30; index++)
  differential("randomHolidayEmoji", [], 1, (index + 0.01) / 30);
differential("nowMilliseconds", []);
differential("nowSeconds", []);
for (const value of [-123.456, -0, 0, 0.005, 12.3456, 9999.99]) {
  for (const decimals of [-2, -1, 0, 1, 2, 3, undefined])
    differential("roundToDecimals", [value, decimals]);
}
for (const seconds of [
  -1, 0, 1, 59, 60, 61, 3599, 3600, 86400, 86401, 172801,
]) {
  differential("isOdd", [seconds]);
  for (const includeSeconds of [true, false, undefined]) {
    differential("formatDuration", [seconds, includeSeconds]);
    differential("formatElapsedTime", [seconds, includeSeconds]);
  }
  differential("formatElapsedTimeLong", [seconds]);
}
for (const byte of [-1, 0, 1, 15, 16, 127, 255, 256])
  differential("byteToHex", [byte]);
for (const color of [
  "#000000",
  "#ffffff",
  "123ABC",
  "#FEA001",
  "#fff",
  "",
  "bad",
])
  differential("hexToRgb", [color]);
const colors = [
  [0, 0, 0],
  [255, 255, 255],
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
  [24, 71, 129],
  [1, 2, 3],
];
for (const rgb of colors) {
  differential("rgbToHex", rgb);
  differential("rgbToLab", [rgb]);
  for (const other of colors) differential("colorDifference", [rgb, other]);
}

const hoistingCases = [
  'if ("a" === "b") { var hidden = 5; } return typeof hidden;',
  'if ("a" === "b") { function hidden() {} } return typeof hidden;',
  'if ("a" === "a") { var number = 3; } else { var other = 2; } return [number, typeof other];',
  'var output = []; if ("a" !== "b") { output.push(1), output.push(2); } return output;',
  'if ("a" === "a") { let value = 3; return value; } return 0;',
  'if ("a" === "a") { function active() { return 7; } } return active();',
  'var result = 0; for (var index = 0; index < 3; index++) { if ("a" === "b") { var unused; } else { result += index; } } return result;',
];
for (const body of hoistingCases) {
  const source = `(function(){${body}})()`;
  const ast = parse(source);
  simplify(ast);
  const expected = JSON.stringify(
    vm.runInNewContext(source, Object.create(null), { timeout: 1000 }),
  );
  const actual = JSON.stringify(
    vm.runInNewContext(print(ast), Object.create(null), { timeout: 1000 }),
  );
  assert.equal(actual, expected, "Changed hoisting/block/sequence behavior");
}
console.log(
  JSON.stringify(
    {
      passed: true,
      outputSha256: sha256(readable),
      helperFunctions: helpers.length,
      differentialCases: cases,
      hoistingCases: hoistingCases.length,
      readyCallbackRegistered: true,
      consoleUnmodified: true,
      applicationCallbackExecuted: false,
    },
    null,
    2,
  ),
);
