const test = require("node:test");
const assert = require("node:assert/strict");
const { parse } = require("./common.cjs");
const { verifyApplication } = require("./archive-2026.cjs");
const {
  uniquifyBindings,
  preserveScratchBindings,
} = require("./binding-identity.cjs");
const { rename } = require("./rename.cjs");
const { compareVersions } = require("./history-diff.cjs");
const { assess, facts } = require("./report-analysis.cjs");
const { payload, deliver, webhookUrl } = require("./discord-notify.cjs");
const fs = require("node:fs"),
  os = require("node:os"),
  path = require("node:path");
const generate = require("@babel/generator").default;
test("guarded post-loop scratch reads require initialization on every reachable path", () => {
  const { proveScratchInitialization } = require("./scratch-flow.cjs");
  const good = parse(
    "function render(){var stopped=false;if(data){var searching=true;while(searching){if(data){scratch=getX();searching=false;}else{searching=false;stopped=true;break;}}if(!stopped)paint(scratch);}}",
  ).program.body[0];
  assert.equal(proveScratchInitialization(good, "scratch"), true);
  const bad = parse(
    "function render(){var searching=true;while(searching){if(data){scratch=getX();searching=false;}else{searching=false;break;}}paint(scratch);}",
  ).program.body[0];
  assert.equal(proveScratchInitialization(bad, "scratch"), false);
});
test("bootstrap inventory terminates on negative constants and recognizes domain guards", () => {
  const { bootstrapFacts } = require("./bootstrap-facts.cjs");
  const body = parse(
    'var table=[]; rotate(); var decoder=function(){}; function guard(){var n=-1; obj.charCodeAt(n); obj.indexOf("x");obj.getAttribute("x");} start();',
  ).program.body;
  assert.deepEqual(bootstrapFacts(body, "decoder", []).features, [
    "obfuscator domain restriction",
  ]);
});
test("obfuscator domain restriction changes are included in security summaries", () => {
  const source = "function act(){run();}",
    changes = compareVersions(source, source);
  const result = assess(source, source, changes, {
    before: {
      features: ["console suppression"],
      implementationFingerprint: "a",
    },
    after: {
      features: ["console suppression", "obfuscator domain restriction"],
      implementationFingerprint: "b",
    },
  });
  assert.match(result.shortSummary, /introduced obfuscator domain restriction/);
});
test("splitting a sequence cannot introduce a strict-mode directive", async () => {
  const { simplify, print } = require("./readable.cjs");
  const { statements, compare } = require("./verify-readable.cjs");
  const ast = parse('function f(){("use strict", run()); return this;}');
  const expected = parse(generate(ast).code);
  simplify(ast);
  const code = await require("prettier").format(print(ast), {
    parser: "babel",
  });
  const candidate = parse(code);
  assert.equal(candidate.program.body[0].body.directives.length, 0);
  compare(
    statements(expected.program.body),
    statements(candidate.program.body),
  );
});
test("inverse renaming distinguishes function declaration from same-named inner local", () => {
  const expected = parse(
    "function _0xab(){ function _0xac(){var _0xad=1;return _0xad;} return _0xac();}",
  );
  const candidate = parse(generate(expected).code);
  const names = rename(candidate, {
    reviewed: { _0xab: "start", _0xac: "packet", _0xad: "packet" },
    reviewPath: false,
  });
  assert.equal(
    verifyApplication(expected, generate(candidate).code, names),
    true,
  );
  assert.throws(() =>
    verifyApplication(
      expected,
      generate(candidate).code.replace("= 1", "= 2"),
      names,
    ),
  );
});
test("short-name identity keeps shadowing and public keys distinct", () => {
  const ast = parse(
    "function a(a){return {a:a, read:function(a){return a;}};}",
  );
  const map = uniquifyBindings(ast),
    code = generate(ast).code;
  assert.equal(Object.keys(map).length, 3);
  assert.match(code, /a:/);
  assert.match(code, /read:/);
});
test("legacy scratch declarations require a preceding unconditional write", () => {
  const ast = parse("function render(){a = readPixels(); consume(a);}");
  assert.deepEqual(preserveScratchBindings(ast, new Set(["a"])), ["a"]);
  assert.throws(
    () => preserveScratchBindings(parse("consume(a);"), new Set(["a"])),
    /cannot be safely removed/,
  );
});
test("security summaries always present, detect synthetic input and known bot warnings", () => {
  const before = 'function act(event){send("/api/paint");}';
  const after =
    'function act(event){if(!event.isTrusted)return; alert("You are using a bot");send("/api/paint");}';
  const report = assess(before, after, compareVersions(before, after));
  assert.ok(report.security.added.length >= 2);
  assert.match(report.shortSummary, /Security\/anticheat:/);
  const unchanged = assess(before, before, compareVersions(before, before));
  assert.match(unchanged.shortSummary, /no changes identified/);
});
test("delegated selector changes and request payload keys remain visible", () => {
  const result = facts(
    '$(document).on("click", ".confirm", run); request("/api/pay", {amount: 1, item: 2});',
  );
  assert.match(result.registrations[0], /\.confirm/);
  assert.match(result.requests[0], /amount, item/);
});
test("mentions require an explicit option and embedded mentions cannot escape", () => {
  assert.deepEqual(
    payload({ summary: "@everyone @here <@123>" }).allowed_mentions,
    { parse: [] },
  );
  const message = payload({ summary: "hello @everyone" }, true);
  assert.ok(message.content.startsWith("@everyone\n"));
  assert.equal(message.content.match(/@everyone/g).length, 1);
  assert.deepEqual(message.allowed_mentions.parse, ["everyone"]);
  assert.throws(() => payload({ summary: "x".repeat(2000) }), /too long/);
  assert.throws(
    () => webhookUrl("https://example.com/api/webhooks/1/fake"),
    /Invalid/,
  );
});
test("webhook acknowledgements deduplicate; uncertain transport does not retry", async () => {
  const ledgerFile = path.join(
    os.tmpdir(),
    "replace-discord-test-" + process.pid + ".json",
  );
  let calls = 0;
  const endpoint = "https://discord.com/api/webhooks/1/test_credential";
  try {
    const opts = {
      ledgerFile,
      fetchImpl: async () => {
        calls++;
        return new Response(JSON.stringify({ id: "123" }), { status: 200 });
      },
    };
    assert.equal(
      (
        await deliver(
          [{ id: "one", summary: "Security/anticheat: test" }],
          endpoint,
          opts,
        )
      ).delivered,
      1,
    );
    assert.equal(
      (
        await deliver(
          [{ id: "one", summary: "Security/anticheat: test" }],
          endpoint,
          opts,
        )
      ).skipped,
      1,
    );
    assert.equal(calls, 1);
    const failing = {
      ledgerFile,
      fetchImpl: async () => {
        calls++;
        throw Error(endpoint);
      },
    };
    await assert.rejects(
      deliver([{ id: "two", summary: "test" }], endpoint, failing),
      /credential redacted/,
    );
    await assert.rejects(
      deliver([{ id: "two", summary: "test" }], endpoint, failing),
      /uncertain/,
    );
    assert.equal(calls, 2);
  } finally {
    if (fs.existsSync(ledgerFile)) fs.unlinkSync(ledgerFile);
  }
});
