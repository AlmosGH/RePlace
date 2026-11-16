// Audit published artifacts and their recorded verification provenance. The
// transformation pipeline performs the decoder audits and application proofs.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const traverse = require("@babel/traverse").default;
const { parse, sha256 } = require("./common.cjs");
function audit(root = path.resolve(__dirname, "../../reference/history")) {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, "manifest.json"), "utf8"),
  );
  let unique = 0,
    comments = 0;
  const outputs = new Set();
  for (const version of manifest.versions) {
    if (version.status !== "verified") continue;
    const code = fs.readFileSync(path.join(root, version.file), "utf8");
    assert.equal(
      sha256(code),
      version.outputSha256,
      "Source hash " + version.id,
    );
    if (version.duplicateOf) continue;
    const report = JSON.parse(
      fs.readFileSync(path.join(root, version.report), "utf8"),
    );
    const names = fs.readFileSync(path.join(root, version.names), "utf8");
    assert.equal(
      sha256(names),
      report.namesSha256,
      "Name-map hash " + version.id,
    );
    assert.equal(report.inputSha256, version.inputSha256);
    assert.equal(report.outputSha256, version.outputSha256);
    for (const key of [
      "decoderAudited",
      "expandedApplicationVerified",
      "readableApplicationVerified",
    ])
      assert.equal(report[key], true, version.id + " " + key);
    assert.ok(
      report.bootstrapProtection?.features,
      version.id + " bootstrap inventory missing",
    );
    assert.equal(JSON.parse(names).length, report.renamedBindings);
    traverse(parse(code), {
      Identifier(p) {
        assert.ok(
          !/^_0x[\da-f]+$/i.test(p.node.name),
          "Obfuscated identifier " + version.id,
        );
      },
    });
    unique++;
    comments += report.explanatoryComments;
    outputs.add(version.id);
  }
  for (const comparison of manifest.comparisons) {
    assert.match(comparison.shortSummary, /Security\/anticheat:/);
    for (const key of ["summary", "patch", "details"])
      assert.ok(
        fs.statSync(path.join(root, comparison[key])).size > 0,
        "Missing comparison " + comparison[key],
      );
    const data = JSON.parse(
      fs.readFileSync(path.join(root, comparison.details), "utf8"),
    );
    assert.ok(
      data.assessment.bootstrap,
      "Missing obfuscator comparison " + comparison.details,
    );
    assert.equal(data.before, comparison.before);
    assert.equal(data.after, comparison.after);
  }
  const result = {
    passed: true,
    indexedCaptures: manifest.captures.length,
    verifiedCaptures: manifest.versions.filter(
      (v) => !v.live && v.status === "verified",
    ).length,
    liveSnapshots: manifest.versions.filter(
      (v) => v.live && v.status === "verified",
    ).length,
    uniqueVerifiedSnapshots: unique,
    updateReports: manifest.comparisons.length,
    explanatoryCommentsAcrossUniqueSnapshots: comments,
    unavailable: manifest.versions
      .filter((v) => v.status !== "verified")
      .map((v) => ({ id: v.id, original: v.original, error: v.error })),
    checks: [
      "Source and name-map hashes",
      "Recorded decoder and structural verification provenance",
      "JavaScript parsing and absence of obfuscated hex identifiers",
      "Security/anticheat summary and obfuscator inventory on every update",
      "Report, JSON and patch links",
    ],
    applicationExecuted: false,
  };
  fs.writeFileSync(
    path.join(root, "verification.json"),
    JSON.stringify(result, null, 2) + "\n",
  );
  let coverage =
    "# Archive coverage\n\n" +
    result.verifiedCaptures +
    " of " +
    result.indexedCaptures +
    " indexed archive captures verified, plus " +
    result.liveSnapshots +
    " separately labeled live snapshot. " +
    unique +
    " unique downloaded bodies; " +
    result.updateReports +
    " observed update comparisons.\n\n| Year | Indexed | Verified archive captures | Unavailable |\n| --- | ---: | ---: | ---: |\n";
  for (const year of manifest.years) {
    const rows = manifest.versions.filter(
      (v) => !v.live && v.timestamp?.startsWith(String(year.year)),
    );
    coverage +=
      "| " +
      year.year +
      " | " +
      year.indexed +
      " | " +
      rows.filter((v) => v.status === "verified").length +
      " | " +
      rows.filter((v) => v.status !== "verified").length +
      " |\n";
  }
  coverage += "\n## Gaps\n\n";
  for (const failed of result.unavailable) {
    const version = manifest.versions.find((v) => v.id === failed.id),
      url =
        "https://web.archive.org/web/" +
        version.timestamp +
        "id_/" +
        version.original;
    coverage +=
      "- [" +
      failed.id +
      "](" +
      url +
      "): " +
      failed.error.replace(/\r?\n/g, " ") +
      "\n";
  }
  coverage +=
    "\nFailed captures have no equivalence claim. Adjacent available snapshots can span gaps and combine multiple deployed releases. Discovery covers the exact script pathname with arbitrary query parameter names/values, according to the recorded CDX queries; unarchived versions and other script paths are unknown. Query values do not establish release order.\n\nDownloaded response SHA-256 hashes validate these artifacts; indexed CDX digests are provenance, not a claim of replay/WARC byte identity. Verification preserves retained application structure and binding resolution, with the deliberate removal of obfuscator guards. It does not test the original live backend or prove every browser interaction. Security classifications are static candidates with source evidence, not a complete security assessment.\n";
  fs.writeFileSync(path.join(root, "COVERAGE.md"), coverage);
  return result;
}
if (require.main === module) {
  try {
    console.log(JSON.stringify(audit(), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
module.exports = { audit };
