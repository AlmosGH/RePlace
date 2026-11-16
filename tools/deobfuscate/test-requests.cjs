const fs = require("node:fs");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const { parse, sha256 } = require("./common.cjs");

const [baselinePath, readablePath] = process.argv.slice(2);
if (!readablePath)
  throw new Error("Usage: node test-requests.cjs CONSERVATIVE.js READABLE.js");
const baseline = fs.readFileSync(baselinePath, "utf8");
const readable = fs.readFileSync(readablePath, "utf8");
const manifest = JSON.parse(
  fs.readFileSync(readablePath + ".names.json", "utf8"),
);
const originalNames = new Map(
  manifest.map((entry) => [entry.readable, entry.original]),
);
const helpers = ["randomCacheToken", "randomAlphanumericString", "nowSeconds"];
function extract(source, original) {
  const snippets = new Map();
  traverse(parse(source), {
    FunctionDeclaration(p) {
      snippets.set(p.node.id.name, generate(p.node).code);
    },
    VariableDeclarator(p) {
      if (p.node.id.name === (original ? originalNames.get("api") : "api"))
        snippets.set("api", generate(p.parent).code);
    },
  });
  return (
    helpers
      .map((name) => snippets.get(original ? originalNames.get(name) : name))
      .join("\n") +
    "\n" +
    snippets.get("api")
  );
}
const scripts = [extract(baseline, true), extract(readable, false)];
let cases = 0;
for (const cancelPrevious of [false, true]) {
  for (const skipCacheToken of [false, true]) {
    for (const repeat of [1, 2]) {
      for (const outcome of [
        "success",
        "offline",
        "serverError",
        "serviceUnavailable",
        "nonJson",
      ]) {
        const outputs = scripts.map((source, index) => {
          const original = index === 0;
          const name = (readableName) =>
            original ? originalNames.get(readableName) : readableName;
          const context = vm.createContext(Object.create(null), {
            codeGeneration: { strings: false, wasm: false },
          });
          const setup = `
            var trace = [], captured;
            var seed = 19;
            Math.random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
            var NativeDate = Date;
            Date = class extends NativeDate { constructor(...args) { super(...(args.length ? args : [1794823200123])); } };
            var $ = { ajax(options) {
              captured = options;
              trace.push({ url:options.url, type:options.type, data:options.data, dataType:options.dataType, headers:options.headers });
              return { abort() { trace.push('abort'); } };
            } };
            var window = { navigator:{languages:['en'],language:'en'}, location:{replace(url){trace.push({redirect:url});}} };
            function alert(message) { trace.push({alert:message}); }
            function ${name("showNotification")}(...args) { trace.push({notification:args}); }
            var ${name("cacheToken")} = '';
          `;
          vm.runInContext(setup + source, context, { timeout: 5000 });
          const invoke = `
            for (var requestIndex = 0; requestIndex < ${repeat}; requestIndex++) {
              ${name("api")}.xhr.req('POST', '/api/example.php', {sample:'test',painting:7}, ${cancelPrevious},
                (success,response)=>trace.push({callback:[success,response]}), ${skipCacheToken});
            }
          `;
          vm.runInContext(invoke, context, { timeout: 5000 });
          const responses = {
            success: 'captured.success({message:"ok",pixels:[1,2,3]});',
            offline:
              'captured.error({status:0,getResponseHeader:()=>"application/json"});',
            serverError:
              'captured.error({status:500,statusText:"Server Error",getResponseHeader:()=>"application/json"});',
            serviceUnavailable:
              'captured.error({status:503,responseJSON:{message:"try later"},getResponseHeader:()=>"application/json"});',
            nonJson:
              'captured.error({status:502,getResponseHeader:()=>"text/html"});',
          };
          vm.runInContext(responses[outcome], context, { timeout: 5000 });
          return vm.runInContext("JSON.stringify(trace)", context);
        });
        assert.equal(
          outputs[0],
          outputs[1],
          `Changed HTTP/response behavior: ${JSON.stringify({ cancelPrevious, skipCacheToken, repeat, outcome })}`,
        );
        cases++;
      }
    }
  }
}
console.log(
  JSON.stringify(
    {
      passed: true,
      outputSha256: sha256(readable),
      differentialRequestCases: cases,
      compared: [
        "HTTP URL and method",
        "Request data and generated headers",
        "Request cancellation",
        "Success/error callback data",
        "Notifications and redirects",
      ],
      networkRequestsSent: 0,
    },
    null,
    2,
  ),
);
