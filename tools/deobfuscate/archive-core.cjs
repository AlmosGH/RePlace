const fs = require("node:fs");
const path = require("node:path");
const { sha256 } = require("./common.cjs");
const LIVE_URL = "https://pixelplace.io/js/script.min.js?v3=85301";
function isScriptUrl(text) {
  try {
    const url = new URL(text);
    return (
      ["http:", "https:"].includes(url.protocol) &&
      ["pixelplace.io", "www.pixelplace.io"].includes(url.hostname) &&
      url.pathname === "/js/script.min.js"
    );
  } catch {
    return false;
  }
}
function parseCdx(text, year = 2026) {
  const data = JSON.parse(text),
    header = data[0];
  if (Array.isArray(data) && data.length === 0)
    return { rows: [], resumeKey: null };
  if (!Array.isArray(header)) throw Error("CDX response is not a table");
  for (const field of ["timestamp", "original", "digest", "statuscode"])
    if (!header.includes(field)) throw Error("CDX field missing: " + field);
  const rows = [];
  let resumeKey = null;
  for (const values of data.slice(1)) {
    if (!Array.isArray(values)) throw Error("Invalid CDX row");
    if (!values.length) continue;
    if (values.length === 1) {
      if (resumeKey) throw Error("Multiple CDX resume keys");
      resumeKey = values[0];
      continue;
    }
    if (values.length !== header.length) throw Error("Incomplete CDX row");
    const row = Object.fromEntries(
      header.map((name, index) => [name, values[index]]),
    );
    if (
      /^\d{14}$/.test(row.timestamp) &&
      row.timestamp.startsWith(String(year)) &&
      row.statuscode === "200" &&
      isScriptUrl(row.original)
    )
      rows.push(row);
  }
  return { rows, resumeKey };
}
async function fetchBytes(
  url,
  {
    maxBytes = 12_000_000,
    timeout = 40000,
    attempts = 2,
    fetchImpl = fetch,
    expectedTimestamp,
  } = {},
) {
  let failure;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const signal = AbortSignal.timeout(timeout);
      let current = url,
        response;
      for (let redirects = 0; redirects <= 4; redirects++) {
        const parsed = new URL(current);
        if (
          !["web.archive.org", "pixelplace.io", "www.pixelplace.io"].includes(
            parsed.hostname,
          ) ||
          !["http:", "https:"].includes(parsed.protocol)
        )
          throw Error("Redirect outside allowed source hosts");
        if (expectedTimestamp && parsed.hostname === "web.archive.org") {
          const stamp = parsed.pathname.match(/^\/web\/(\d{14})/);
          if (stamp && stamp[1] !== expectedTimestamp)
            throw Error("Archive redirected to a different capture");
        }
        response = await fetchImpl(current, {
          signal,
          redirect: "manual",
          headers: { "User-Agent": "RePlace-2026-script-history/1.0" },
        });
        if (response.status >= 300 && response.status < 400) {
          if (redirects === 4) throw Error("Redirect limit exceeded");
          const next = response.headers.get("location");
          if (!next) throw Error("Missing redirect location");
          await response.body?.cancel();
          current = new URL(next, current).href;
          continue;
        }
        break;
      }
      if (!response.ok) {
        await response.body?.cancel();
        throw Error("HTTP " + response.status);
      }
      if (Number(response.headers.get("content-length") || 0) > maxBytes) {
        await response.body?.cancel();
        throw Error("Response size limit exceeded");
      }
      const chunks = [];
      let bytes = 0;
      for await (const chunk of response.body) {
        bytes += chunk.length;
        if (bytes > maxBytes) {
          await response.body.cancel().catch(() => {});
          throw Error("Response size limit exceeded");
        }
        chunks.push(chunk);
      }
      return { bytes: Buffer.concat(chunks), finalUrl: current };
    } catch (error) {
      failure = error;
      if (attempt + 1 < attempts)
        await new Promise((resolve) =>
          setTimeout(resolve, 500 * (attempt + 1)),
        );
    }
  }
  throw failure;
}
async function discover({
  year = 2026,
  fetchImpl = fetch,
  maxCaptures = 500,
  maxPages = 20,
  onPage = () => {},
} = {}) {
  const captures = new Map(),
    queries = [];
  for (const host of ["pixelplace.io", "www.pixelplace.io"]) {
    let resumeKey = null;
    const seen = new Set();
    let complete = false;
    for (let page = 0; page < maxPages; page++) {
      const url = new URL("https://web.archive.org/cdx/search/cdx");
      url.search = new URLSearchParams({
        url: host + "/js/script.min.js",
        matchType: "prefix",
        from: String(year),
        to: String(year),
        output: "json",
        filter: "statuscode:200",
        fl: "urlkey,timestamp,original,digest,statuscode,mimetype",
        limit: "500",
        showResumeKey: "true",
      });
      if (resumeKey) url.searchParams.set("resumeKey", resumeKey);
      const { bytes } = await fetchBytes(url.href, {
        maxBytes: 4_000_000,
        fetchImpl,
      });
      const parsed = parseCdx(bytes.toString("utf8"), year);
      onPage({ host, page, url: url.href, body: bytes.toString("utf8") });
      for (const capture of parsed.rows) {
        captures.set(capture.timestamp + " " + capture.original, capture);
        if (captures.size > maxCaptures)
          throw Error(
            "Capture limit exceeded; increase --max-captures and rerun",
          );
      }
      queries.push({
        url: url.href,
        rows: parsed.rows.length,
        responseSha256: sha256(bytes),
        resumeKey: parsed.resumeKey,
      });
      if (!parsed.resumeKey) {
        complete = true;
        break;
      }
      if (seen.has(parsed.resumeKey))
        throw Error("Repeated CDX continuation key");
      seen.add(parsed.resumeKey);
      resumeKey = parsed.resumeKey;
    }
    if (!complete)
      throw Error("CDX page limit exceeded; discovery is incomplete");
  }
  return {
    year,
    queries,
    captures: [...captures.values()].sort(
      (a, b) =>
        a.timestamp.localeCompare(b.timestamp) ||
        a.original.localeCompare(b.original),
    ),
    discoveryComplete: true,
  };
}
async function sourceFor(
  capture,
  cache,
  { offline = false, fetchImpl = fetch, refresh = false } = {},
) {
  fs.mkdirSync(cache, { recursive: true });
  const key = capture.live
    ? "live-" + sha256(capture.original).slice(0, 12)
    : capture.timestamp + "-" + sha256(capture.original).slice(0, 12);
  const file = path.join(cache, key + ".js"),
    metaFile = file + ".json";
  if (!refresh && fs.existsSync(file) && fs.existsSync(metaFile)) {
    const bytes = fs.readFileSync(file),
      meta = JSON.parse(fs.readFileSync(metaFile, "utf8"));
    if (
      meta.original !== capture.original ||
      meta.inputSha256 !== sha256(bytes)
    )
      throw Error("Cached source integrity mismatch");
    return { source: bytes.toString("utf8"), ...meta };
  }
  if (offline) throw Error("Source is not cached: " + capture.original);
  const sourceUrl = capture.live
    ? capture.original
    : "https://web.archive.org/web/" +
      capture.timestamp +
      "id_/" +
      capture.original;
  const { bytes, finalUrl } = await fetchBytes(sourceUrl, {
    fetchImpl,
    expectedTimestamp: capture.live ? undefined : capture.timestamp,
  });
  const source = bytes.toString("utf8");
  if (/^\s*(?:<!doctype|<html)/i.test(source))
    throw Error("Archive returned HTML, not JavaScript");
  const meta = {
    original: capture.original,
    sourceUrl,
    finalUrl,
    retrievedAt: new Date().toISOString(),
    inputSha256: sha256(bytes),
    bytes: bytes.length,
  };
  fs.writeFileSync(file, bytes);
  fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2) + "\n");
  return { source, ...meta };
}
module.exports = {
  LIVE_URL,
  isScriptUrl,
  parseCdx,
  fetchBytes,
  discover,
  sourceFor,
};
