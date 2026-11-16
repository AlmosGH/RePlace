const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {
  parseCdx,
  isScriptUrl,
  discover,
  fetchBytes,
  sourceFor,
} = require("./archive-core.cjs");
const { compareVersions } = require("./history-diff.cjs");
const { expand } = require("./family.cjs");
const { parse } = require("./common.cjs");
const { simplify } = require("./readable.cjs");
const { rename } = require("./rename.cjs");
const { verifyApplication } = require("./archive-2026.cjs");
const generate = require("@babel/generator").default;
const header = [
  "urlkey",
  "timestamp",
  "original",
  "digest",
  "statuscode",
  "mimetype",
];
const row = (url, stamp = "20260103192131") => [
  "io,pixelplace)/js/script.min.js",
  stamp,
  url,
  "RECORDED_DIGEST",
  "200",
  "application/javascript",
];
const response = (data) => new Response(JSON.stringify(data), { status: 200 });

test("accept any query parameter name, changing values, and no query; reject other resources", () => {
  for (const url of [
    "http://pixelplace.io/js/script.min.js?v1=one",
    "https://www.pixelplace.io/js/script.min.js?cache=two&v4=9",
    "https://pixelplace.io/js/script.min.js",
  ])
    assert.equal(isScriptUrl(url), true);
  for (const url of [
    "https://evil.example/js/script.min.js?v3=x",
    "https://pixelplace.io/js/script.min.js.map",
    "https://pixelplace.io/js/other.js",
    "file:///js/script.min.js",
  ])
    assert.equal(isScriptUrl(url), false);
});
test("CDX continuation, field mapping, and capture-date filtering", () => {
  const parsed = parseCdx(
    JSON.stringify([
      header,
      row("https://pixelplace.io/js/script.min.js?cache=one"),
      row("https://pixelplace.io/js/script.min.js?v2=old", "20251231235959"),
      [],
      ["next-page"],
    ]),
  );
  assert.equal(parsed.rows.length, 1);
  assert.equal(parsed.resumeKey, "next-page");
  assert.equal(parsed.rows[0].digest, "RECORDED_DIGEST");
  assert.throws(() => parseCdx(JSON.stringify([["timestamp"], ["20260101"]])));
});
test("discover follows resume keys, queries both hosts, deduplicates and sorts by date rather than version", async () => {
  let calls = 0;
  const fetchImpl = async (url) => {
    calls++;
    const u = new URL(url);
    assert.equal(u.searchParams.get("matchType"), "prefix");
    assert.ok(!u.searchParams.get("url").includes("?"));
    return response(
      u.searchParams.has("resumeKey")
        ? [
            header,
            row(
              "https://pixelplace.io/js/script.min.js?v3=1",
              "20260524052024",
            ),
          ]
        : [
            header,
            row(
              "https://pixelplace.io/js/script.min.js?other=999",
              "20260103192131",
            ),
            [],
            ["next"],
          ],
    );
  };
  const result = await discover({ fetchImpl });
  assert.equal(calls, 4);
  assert.equal(result.captures.length, 2);
  assert.equal(result.captures[0].timestamp, "20260103192131");
  assert.equal(result.discoveryComplete, true);
});
test("repeating pagination and capture limits fail explicitly", async () => {
  await assert.rejects(
    discover({
      fetchImpl: async () =>
        response([
          header,
          row("https://pixelplace.io/js/script.min.js"),
          [],
          ["same"],
        ]),
    }),
    /Repeated CDX/,
  );
  await assert.rejects(
    discover({
      maxCaptures: 1,
      fetchImpl: async () =>
        response([
          header,
          row("https://pixelplace.io/js/script.min.js?a=1"),
          row("https://pixelplace.io/js/script.min.js?a=2"),
        ]),
    }),
    /Capture limit/,
  );
});
test("downloads enforce byte and retry bounds", async () => {
  let calls = 0;
  await assert.rejects(
    fetchBytes("https://pixelplace.io/js/script.min.js", {
      maxBytes: 4,
      fetchImpl: async () => {
        calls++;
        return new Response("0123456789");
      },
    }),
    /size limit/,
  );
  assert.equal(calls, 2);
  await assert.rejects(
    fetchBytes("https://unrelated.example/code.js", {
      attempts: 1,
      fetchImpl: async () => {
        throw Error("must not fetch");
      },
    }),
    /allowed source hosts/,
  );
});
test("redirects cannot silently substitute a different archive date", async () => {
  let calls = 0;
  await assert.rejects(
    fetchBytes(
      "https://web.archive.org/web/20260103192131id_/https://pixelplace.io/js/script.min.js",
      {
        expectedTimestamp: "20260103192131",
        attempts: 1,
        fetchImpl: async () => {
          calls++;
          return new Response(null, {
            status: 302,
            headers: {
              location:
                "/web/20260227071834id_/https://pixelplace.io/js/script.min.js",
            },
          });
        },
      },
    ),
    /different capture/,
  );
  assert.equal(calls, 1);
});
test("cache provenance is checked and offline mode sends no requests", async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), "replace-archive-test-"),
  );
  const capture = {
    timestamp: "20260103192131",
    original: "https://pixelplace.io/js/script.min.js?cache=one",
  };
  let calls = 0;
  const fetchImpl = async () => {
    calls++;
    return new Response("var example=1;");
  };
  try {
    const first = await sourceFor(capture, directory, { fetchImpl });
    const second = await sourceFor(capture, directory, {
      offline: true,
      fetchImpl,
    });
    assert.equal(first.inputSha256, second.inputSha256);
    assert.equal(calls, 1);
    const code = fs.readdirSync(directory).find((file) => file.endsWith(".js"));
    fs.writeFileSync(path.join(directory, code), "changed");
    await assert.rejects(
      sourceFor(capture, directory, { offline: true, fetchImpl }),
      /integrity mismatch/,
    );
  } finally {
    for (const filename of fs.readdirSync(directory))
      fs.unlinkSync(path.join(directory, filename));
    fs.rmdirSync(directory);
  }
});
test("unsupported bootstrap fails before executing application code", () => {
  assert.throws(
    () => expand("globalThis.shouldNeverRun = true;"),
    /Unsupported bootstrap/,
  );
});
test("readable comparison accepts scoped repeated names and rejects changed endpoint/payload/selector", () => {
  const source =
    '$(function(){var _0xa="/api/original.php"; if("same"==="same"){ function _0xb(_0xc){$("#panel").text(_0xc);return {payload:_0xc,url:_0xa};} } });';
  const baseline = parse(source),
    target = parse(source);
  simplify(target);
  const names = rename(target, {
    reviewed: { _0xa: "endpoint", _0xb: "renderPanel", _0xc: "text" },
    reviewPath: false,
  });
  const code = generate(target).code;
  assert.equal(verifyApplication(baseline, code, names), true);
  for (const modified of [
    code.replace("/api/original.php", "/api/changed.php"),
    code.replace("#panel", "#other"),
    code.replace("payload:", "changedPayload:"),
  ])
    assert.throws(() => verifyApplication(parse(source), modified, names));
});
test("changelog separates endpoint, outgoing event, DOM, and implementation changes", () => {
  const changes = compareVersions(
    "function render(){ $('#old').text('Original user-facing message'); socket.emit('old-event',{}); api.req('GET','/api/old.php',{}); }",
    "function render(){ $('#new').text('Changed user-facing message'); socket.emit('new-event',{}); api.req('GET','/api/new.php',{}); }",
  );
  assert.deepEqual(changes.endpoints.added, ["/api/new.php"]);
  assert.deepEqual(changes.emits.removed, ["old-event"]);
  assert.deepEqual(changes.selectors.added, ["#new"]);
  assert.ok(changes.functions.changed.includes("render"));
});
test("scope collisions include writes to captured outer variables", () => {
  const ast = parse(
    "$(function(){var _0xa=0;function _0xb(_0xc){_0xa=_0xc;return _0xc;}});",
  );
  assert.throws(
    () =>
      rename(ast, {
        reviewed: { _0xa: "state", _0xb: "setState", _0xc: "state" },
        reviewPath: false,
      }),
    /requires review/,
  );
});
test("small numeric-only differences are classified without hiding exact patch values", () => {
  const result = compareVersions(
    "function distance(x){return x*0.04500000000007276;}",
    "function distance(x){return x*0.04499999999825377;}",
  );
  assert.deepEqual(result.functions.changed, []);
  assert.deepEqual(result.functions.smallNumericOnly, ["distance"]);
});
