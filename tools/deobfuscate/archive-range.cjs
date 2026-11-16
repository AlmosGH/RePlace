// Assemble chronological reports across year boundaries after each yearly run.
const fs = require("node:fs");
const path = require("node:path");
const { run, options } = require("./archive-2026.cjs");
const { writeHistory } = require("./history-diff.cjs");
const ROOT = path.resolve(__dirname, "../../reference/history");
function assemble(root = ROOT, start = 2022, end = 2026) {
  const manifest = {
    range: start + "–" + end,
    discoveryComplete: true,
    captures: [],
    versions: [],
    queries: [],
    years: [],
    existingComparisons: [],
  };
  for (let year = start; year <= end; year++) {
    const file = path.join(root, String(year), "manifest.json");
    if (!fs.existsSync(file)) {
      manifest.discoveryComplete = false;
      manifest.years.push({ year, error: "No manifest" });
      continue;
    }
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    manifest.discoveryComplete &&= data.discoveryComplete;
    manifest.queries.push(...(data.queries || []));
    for (const comparison of data.comparisons || [])
      manifest.existingComparisons.push({
        ...comparison,
        summary: year + "/" + comparison.summary,
        patch: year + "/" + comparison.patch,
        details: year + "/" + comparison.details,
      });
    manifest.captures.push(...data.captures);
    manifest.years.push({
      year,
      indexed: data.captures.length,
      verified: data.versions.filter((x) => x.status === "verified").length,
      failed: data.versions.filter((x) => x.status !== "verified").length,
    });
    for (const v of data.versions) {
      const version = { ...v };
      for (const key of ["file", "report", "names"])
        if (version[key]) version[key] = year + "/" + version[key];
      manifest.versions.push(version);
    }
  }
  manifest.versions.sort((a, b) =>
    a.live
      ? b.live
        ? 0
        : 1
      : b.live
        ? -1
        : a.timestamp.localeCompare(b.timestamp),
  );
  const seen = new Map();
  for (const version of manifest.versions) {
    if (version.status !== "verified") continue;
    const previous = seen.get(version.inputSha256);
    if (previous) {
      version.duplicateOf = previous.id;
      version.file = previous.file;
    } else {
      delete version.duplicateOf;
      seen.set(version.inputSha256, version);
    }
  }
  writeHistory(root, manifest);
  delete manifest.existingComparisons;
  fs.writeFileSync(
    path.join(root, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  return manifest;
}
async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--reports-only"))
    for (let year = 2022; year <= 2026; year++) {
      const out = path.join(ROOT, String(year)),
        file = path.join(out, "manifest.json");
      if (!fs.existsSync(file)) continue;
      const data = JSON.parse(fs.readFileSync(file, "utf8"));
      data.reusePatches = true;
      writeHistory(out, data);
      delete data.reusePatches;
      fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
      console.log(year + ": reports refreshed");
    }
  if (!args.includes("--reports-only"))
    for (let year = 2022; year <= 2026; year++) {
      const flags = [
        "--year",
        String(year),
        "--out",
        path.join(ROOT, String(year)),
        ...args.filter((x) => x !== "--reports-only"),
      ];
      if (year !== 2026) flags.push("--no-live");
      try {
        await run(options(flags));
      } catch (error) {
        console.error(year + ": " + error.message);
        process.exitCode = 1;
      }
    }
  const result = assemble();
  console.log(
    JSON.stringify({ years: result.years, reports: result.comparisons.length }),
  );
}
if (require.main === module)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
module.exports = { assemble };
