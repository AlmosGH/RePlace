const fs = require("node:fs");
const path = require("node:path");
const t = require("@babel/types");
const traverse = require("@babel/traverse").default;
const prettier = require("prettier");
const { sha256, parse, SOURCE_SHA256 } = require("./common.cjs");
const { application, simplify, print } = require("./readable.cjs");
const { expand } = require("./family.cjs");
const { learn, hints, alignNames } = require("./name-model.cjs");
const { resolveRoles } = require("./roles.cjs");
const { rename } = require("./rename.cjs");
const { annotate } = require("./annotate.cjs");
const { preserveScratchBindings } = require("./binding-identity.cjs");
const {
  restoreNames,
  annotateBindings,
  compare,
  statements,
} = require("./verify-readable.cjs");
const {
  LIVE_URL,
  isScriptUrl,
  parseCdx,
  discover,
  sourceFor,
} = require("./archive-core.cjs");
const { writeHistory } = require("./history-diff.cjs");
const ROOT = path.resolve(__dirname, "../..");
function json(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
}
function verifyApplication(expected, code, names) {
  const candidate = parse(code);
  traverse(candidate, {
    Identifier(p) {
      if (/^_0x[\da-f]+$/i.test(p.node.name))
        throw Error("Obfuscated identifier remains");
    },
  });
  annotateBindings(expected);
  annotateBindings(candidate);
  restoreNames(candidate, names);
  compare(
    statements(expected.program.body),
    statements(candidate.program.body),
  );
  return true;
}
async function transformVersion(source, reference, known, model) {
  const expanded = expand(source);
  // Reparse the unsimplified expanded application to remove optional AST fields
  // inserted by Babel's cloneNode (e.g. method/id defaults). This baseline still
  // contains every application branch and every original binding identity.
  const expected = parse(print(expanded.ast)),
    counts = simplify(expanded.ast);
  const removedBindings = new Set(expanded.bootstrapBindings || []);
  const scratchBindings = preserveScratchBindings(
    expanded.ast,
    removedBindings,
  );
  if (scratchBindings.length)
    expected.program.body.unshift(
      t.variableDeclaration(
        "var",
        scratchBindings.map((name) => t.variableDeclarator(t.identifier(name))),
      ),
    );
  const proposed =
    expanded.report.bodySha256 === SOURCE_SHA256
      ? Object.fromEntries(
          known.map((entry) => [entry.original, entry.readable]),
        )
      : {
          ...alignNames(reference, expanded.ast, known),
          ...hints(expanded.ast, model),
        };
  Object.assign(
    proposed,
    Object.fromEntries(
      scratchBindings.map((name) => {
        let role = "legacyRendererScratch";
        traverse(expanded.ast, {
          AssignmentExpression(p) {
            if (!t.isIdentifier(p.node.left, { name })) return;
            const rhs = p.node.right;
            if (t.isBinaryExpression(rhs, { operator: "%" }))
              role = "imageColumnOffset";
            else if (
              t.isCallExpression(rhs) &&
              t.isMemberExpression(rhs.callee) &&
              t.isIdentifier(rhs.callee.object, { name: "Math" }) &&
              t.isIdentifier(rhs.callee.property, { name: "floor" })
            )
              role = "imageRowOffset";
            else if (
              t.isMemberExpression(rhs) &&
              t.isIdentifier(rhs.property, { name: "data" })
            )
              role = "paintingPixelData";
          },
        });
        return [name, role];
      }),
    ),
  );
  let names;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      names = rename(expanded.ast, {
        reviewed: proposed,
        reviewPath: false,
        contextualFallback: true,
        extraBindings: scratchBindings,
      });
      break;
    } catch (error) {
      if (!error.collisions) throw error;
      const resolved = resolveRoles(expanded.ast, proposed, error.collisions);
      if (!Object.keys(resolved).length) throw error;
      Object.assign(proposed, resolved);
    }
  }
  if (!names) throw Error("Unresolved semantic names");
  if (expanded.sourceBindings)
    names = names.map((entry) => ({
      ...entry,
      sourceOriginal: expanded.sourceBindings[entry.original]?.original,
      sourceScope: expanded.sourceBindings[entry.original]?.scope,
    }));
  const explanatoryComments = annotate(expanded.ast);
  traverse(expanded.ast, {
    NumericLiteral(p) {
      delete p.node.extra;
    },
    StringLiteral(p) {
      delete p.node.extra;
    },
  });
  const code =
    expanded.header +
    (await prettier.format(print(expanded.ast), {
      parser: "babel",
      printWidth: 110,
      singleQuote: true,
      trailingComma: "none",
    }));
  verifyApplication(expected, code, names);
  return {
    code,
    names,
    report: {
      ...expanded.report,
      preservedLegacyScratchGlobals: scratchBindings,
      scratchNamingVersion: 1,
      ...counts,
      explanatoryComments,
      renamedBindings: names.length,
      transferredNameHints: Object.keys(proposed).length,
      readableApplicationVerified: true,
      naming:
        "Heuristic structural alignment, inferred roles, and contextual fallback; not recovered author names",
      outputSha256: sha256(code),
    },
  };
}
function options(args) {
  const result = {
    year: 2026,
    out: path.join(ROOT, "reference/history/2026"),
    liveUrl: LIVE_URL,
    maxCaptures: 500,
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (
      [
        "--offline",
        "--rebuild",
        "--no-live",
        "--refresh",
        "--revalidate-cache",
      ].includes(arg)
    )
      result[arg.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] =
        true;
    else if (
      [
        "--year",
        "--out",
        "--cache",
        "--index",
        "--max-captures",
        "--live-url",
      ].includes(arg)
    ) {
      const value = args[++i];
      if (!value || value.startsWith("--"))
        throw Error("Missing value for " + arg);
      result[arg.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] =
        value;
    } else throw Error("Unknown option " + arg);
  }
  result.year = Number(result.year);
  result.maxCaptures = Number(result.maxCaptures);
  if (
    !Number.isInteger(result.year) ||
    result.year < 2000 ||
    result.year > 2100 ||
    !Number.isInteger(result.maxCaptures) ||
    result.maxCaptures < 1 ||
    result.maxCaptures > 5000
  )
    throw Error("Invalid year or capture bound");
  if (!isScriptUrl(result.liveUrl))
    throw Error("Live URL must use the target script pathname");
  if (result.offline && result.refresh)
    throw Error("--offline cannot be combined with --refresh");
  result.out = path.resolve(result.out);
  result.cache = path.resolve(result.cache || path.join(result.out, ".cache"));
  return result;
}
async function run(opts) {
  fs.mkdirSync(opts.out, { recursive: true });
  fs.mkdirSync(path.join(opts.out, "versions"), { recursive: true });
  const indexFile = path.join(opts.out, "index.json");
  let index;
  if (opts.offline || opts.index) {
    const data = JSON.parse(fs.readFileSync(opts.index || indexFile, "utf8"));
    index = Array.isArray(data)
      ? {
          year: opts.year,
          captures: parseCdx(JSON.stringify(data), opts.year).rows,
          queries: [],
          discoveryComplete: false,
        }
      : data;
    if (index.year !== opts.year || !Array.isArray(index.captures))
      throw Error("Index year/layout does not match");
  } else {
    fs.mkdirSync(path.join(opts.out, "index-pages"), { recursive: true });
    index = await discover({
      year: opts.year,
      maxCaptures: opts.maxCaptures,
      onPage(page) {
        fs.writeFileSync(
          path.join(
            opts.out,
            "index-pages",
            page.host + "-" + page.page + ".json",
          ),
          page.body,
        );
      },
    });
    index.discoveredAt = new Date().toISOString();
    json(indexFile, index);
  }
  if (index.captures.length > opts.maxCaptures)
    throw Error("Index exceeds capture bound");
  index.captures = index.captures
    .filter(
      (row) =>
        isScriptUrl(row.original) &&
        /^\d{14}$/.test(row.timestamp) &&
        row.timestamp.startsWith(String(opts.year)),
    )
    .sort(
      (a, b) =>
        a.timestamp.localeCompare(b.timestamp) ||
        a.original.localeCompare(b.original),
    );
  const known = JSON.parse(
    fs.readFileSync(
      path.join(ROOT, "reference/script.readable.js.names.json"),
      "utf8",
    ),
  );
  const reference = application(
    fs.readFileSync(
      path.join(ROOT, "reference/script.deobfuscated.js"),
      "utf8",
    ),
  );
  simplify(reference);
  const model = learn(reference, known);
  const toolFingerprint = sha256(
    fs
      .readdirSync(__dirname)
      .filter(
        (name) =>
          /\.(cjs|json)$/.test(name) &&
          !name.endsWith(".test.cjs") &&
          !name.includes("naming-model"),
      )
      .sort()
      .map((name) => name + sha256(fs.readFileSync(path.join(__dirname, name))))
      .join("|") +
      sha256(JSON.stringify(known)) +
      sha256(
        fs.readFileSync(path.join(ROOT, "reference/script.deobfuscated.js")),
      ),
  );
  const manifest = {
    year: opts.year,
    discoveredAt: index.discoveredAt || null,
    discoveryComplete: Boolean(index.discoveryComplete),
    coverage:
      "Exact script pathname, all query strings; only captures indexed by the recorded CDX queries",
    queries: index.queries,
    captures: index.captures,
    toolFingerprint,
    versions: [],
  };
  const list = [...index.captures];
  if (!opts.noLive) list.push({ live: true, original: opts.liveUrl });
  const seen = new Map();
  let totalBytes = 0;
  for (const capture of list) {
    const version = {
      ...capture,
      id: capture.live
        ? "live"
        : capture.timestamp + "-" + sha256(capture.original).slice(0, 8),
      status: "failed",
    };
    try {
      const download = await sourceFor(capture, opts.cache, {
        offline: opts.offline,
        refresh: !opts.offline && (capture.live || opts.refresh),
      });
      totalBytes += download.bytes;
      if (totalBytes > 128_000_000)
        throw Error("Aggregate source-byte limit exceeded");
      Object.assign(
        version,
        Object.fromEntries(
          Object.entries(download).filter(([key]) => key !== "source"),
        ),
      );
      if (seen.has(download.inputSha256)) {
        version.status = "verified";
        version.duplicateOf = seen.get(download.inputSha256).id;
        version.file = seen.get(download.inputSha256).file;
        version.outputSha256 = seen.get(download.inputSha256).outputSha256;
      } else {
        const file = "versions/" + version.id + ".js",
          reportFile = path.join(opts.out, file + ".report.json");
        let report;
        if (!opts.rebuild && fs.existsSync(reportFile)) {
          const cached = JSON.parse(fs.readFileSync(reportFile, "utf8"));
          if (
            cached.inputSha256 === download.inputSha256 &&
            cached.outputSha256 ===
              sha256(fs.readFileSync(path.join(opts.out, file))) &&
            cached.namesSha256 ===
              sha256(fs.readFileSync(path.join(opts.out, file + ".names.json")))
          ) {
            if (
              cached.toolFingerprint === toolFingerprint ||
              cached.revalidatedWithToolFingerprint === toolFingerprint
            )
              report = cached;
            else if (
              opts.revalidateCache &&
              cached.explanatoryComments > 45 &&
              (!cached.preservedLegacyScratchGlobals?.length ||
                cached.scratchNamingVersion === 1)
            ) {
              // Preserve the generation recipe as provenance. A fresh decoder
              // audit and full application comparison validate reuse under the
              // current verifier; this does not pretend the source was regenerated.
              const expanded = expand(download.source),
                expected = parse(print(expanded.ast)),
                cleaned = parse(print(expanded.ast));
              simplify(cleaned);
              const scratch = preserveScratchBindings(
                cleaned,
                new Set(expanded.bootstrapBindings || []),
              );
              if (scratch.length)
                expected.program.body.unshift(
                  t.variableDeclaration(
                    "var",
                    scratch.map((name) =>
                      t.variableDeclarator(t.identifier(name)),
                    ),
                  ),
                );
              try {
                verifyApplication(
                  expected,
                  fs.readFileSync(path.join(opts.out, file), "utf8"),
                  JSON.parse(
                    fs.readFileSync(
                      path.join(opts.out, file + ".names.json"),
                      "utf8",
                    ),
                  ),
                );
                report = {
                  ...cached,
                  bootstrapProtection: expanded.report.bootstrapProtection,
                  revalidatedWithToolFingerprint: toolFingerprint,
                  revalidatedAt: new Date().toISOString(),
                };
                json(reportFile, report);
              } catch {
                /* Regenerate when the current baseline rejects an old output. */
              }
            }
          }
        }
        if (!report) {
          const result = await transformVersion(
            download.source,
            reference,
            known,
            model,
          );
          fs.writeFileSync(path.join(opts.out, file), result.code);
          const namesText = JSON.stringify(result.names, null, 2) + "\n";
          fs.writeFileSync(
            path.join(opts.out, file + ".names.json"),
            namesText,
          );
          report = {
            ...result.report,
            toolFingerprint,
            inputSha256: download.inputSha256,
            namesSha256: sha256(namesText),
          };
          json(reportFile, report);
        }
        Object.assign(version, {
          status: "verified",
          file,
          outputSha256: report.outputSha256,
          report: file + ".report.json",
          names: file + ".names.json",
        });
        const reviewFile = path.join(
          opts.out,
          "versions",
          version.id + ".review.json",
        );
        if (fs.existsSync(reviewFile)) fs.unlinkSync(reviewFile);
        seen.set(download.inputSha256, version);
      }
      console.log(
        version.id +
          ": " +
          version.status +
          (version.duplicateOf ? " (duplicate content)" : ""),
      );
    } catch (error) {
      version.error = error.message;
      if (error.collisions)
        json(
          path.join(opts.out, "versions", version.id + ".review.json"),
          error.collisions,
        );
      console.error(version.id + ": FAILED: " + error.message);
    }
    manifest.versions.push(version);
    json(path.join(opts.out, "manifest.json"), manifest);
  }
  writeHistory(opts.out, manifest);
  json(path.join(opts.out, "manifest.json"), manifest);
  if (manifest.versions.some((version) => version.status !== "verified"))
    throw Error(
      "One or more snapshots failed; see manifest.json and any review reports",
    );
  return manifest;
}
if (require.main === module)
  run(options(process.argv.slice(2))).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
module.exports = { options, run, transformVersion, verifyApplication };
