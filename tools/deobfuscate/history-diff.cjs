const fs = require("node:fs");
const path = require("node:path");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const { createTwoFilesPatch } = require("diff");
const { parse, sha256 } = require("./common.cjs");
const { digest } = require("./name-model.cjs");
function inventory(source) {
  const endpoints = new Set(),
    emits = new Set(),
    listeners = new Set(),
    selectors = new Set(),
    text = new Set(),
    functions = new Map();
  function label(p) {
    if (p.isFunctionDeclaration()) return p.node.id.name;
    const parent = p.parentPath;
    if (parent.isObjectProperty() || p.isObjectMethod()) {
      const key = p.isObjectMethod() ? p.node.key : parent.node.key;
      const owner = p.findParent(
        (x) => x.isVariableDeclarator() && t.isIdentifier(x.node.id),
      );
      return (owner?.node.id.name || "object") + "." + (key.name || key.value);
    }
    return null;
  }
  traverse(parse(source), {
    Function(p) {
      const key = label(p);
      if (key) {
        if (!functions.has(key)) functions.set(key, []);
        const tolerant = t.cloneNode(p.node, true);
        function round(node) {
          if (!node) return;
          if (t.isNumericLiteral(node) && Math.abs(node.value) < 1e7)
            node.value = Math.round(node.value * 1e8) / 1e8;
          for (const key of t.VISITOR_KEYS[node.type] || []) {
            const value = node[key];
            if (Array.isArray(value)) value.forEach(round);
            else round(value);
          }
        }
        round(tolerant);
        functions
          .get(key)
          .push({ strict: digest(p.node), numericTolerant: digest(tolerant) });
      }
    },
    StringLiteral(p) {
      const value = p.node.value;
      if (/^\/api\//.test(value)) endpoints.add(value);
      else if (
        value.length > 20 &&
        value.length < 500 &&
        !/[<>]/.test(value) &&
        /\s/.test(value) &&
        !/^https?:/.test(value)
      )
        text.add(value);
    },
    CallExpression(p) {
      const n = p.node,
        c = n.callee,
        method = t.isMemberExpression(c)
          ? c.property.name || c.property.value
          : null,
        arg = n.arguments[0];
      if (t.isStringLiteral(arg)) {
        if (method === "emit") emits.add(arg.value);
        if (method === "on") listeners.add(arg.value);
        if (t.isIdentifier(c, { name: "$" }) && /^[#.\[]/.test(arg.value))
          selectors.add(arg.value);
      }
    },
  });
  return {
    endpoints: [...endpoints].sort(),
    emits: [...emits].sort(),
    listeners: [...listeners].sort(),
    selectors: [...selectors].sort(),
    text: [...text].sort(),
    functions: Object.fromEntries(
      [...functions]
        .sort()
        .map(([key, values]) => [
          key,
          {
            strict: sha256(JSON.stringify(values.map((x) => x.strict))),
            numericTolerant: sha256(
              JSON.stringify(values.map((x) => x.numericTolerant)),
            ),
          },
        ]),
    ),
  };
}
function setChanges(before, after) {
  const a = new Set(before),
    b = new Set(after);
  return {
    added: after.filter((x) => !a.has(x)),
    removed: before.filter((x) => !b.has(x)),
  };
}
function compareVersions(before, after) {
  const a = inventory(before),
    b = inventory(after),
    result = {};
  for (const key of ["endpoints", "emits", "listeners", "selectors", "text"])
    result[key] = setChanges(a[key], b[key]);
  result.functions = {
    added: Object.keys(b.functions).filter((key) => !a.functions[key]),
    removed: Object.keys(a.functions).filter((key) => !b.functions[key]),
    changed: Object.keys(b.functions).filter(
      (key) =>
        a.functions[key] &&
        a.functions[key].strict !== b.functions[key].strict &&
        a.functions[key].numericTolerant !== b.functions[key].numericTolerant,
    ),
    smallNumericOnly: Object.keys(b.functions).filter(
      (key) =>
        a.functions[key] &&
        a.functions[key].strict !== b.functions[key].strict &&
        a.functions[key].numericTolerant === b.functions[key].numericTolerant,
    ),
  };
  return result;
}
const safe = (text) =>
  String(text).replace(/`/g, "'").replace(/\r?\n/g, " ").replace(/\|/g, "\\|");
function markdownChanges(changes) {
  const headings = {
    endpoints: "HTTP endpoint literals",
    emits: "Outgoing socket events",
    listeners: "Registered event names (socket and DOM)",
    selectors: "DOM selectors",
    text: "UI text",
  };
  let text = "";
  for (const [key, title] of Object.entries(headings)) {
    const delta = changes[key];
    text += `\n### ${title}\n\n${delta.added.length} added; ${delta.removed.length} removed.\n`;
    for (const kind of ["added", "removed"])
      for (const item of delta[kind].slice(0, 15))
        text += `\n- ${kind === "added" ? "+" : "−"} \`${safe(item)}\`\n`;
    if (delta.added.length > 15 || delta.removed.length > 15)
      text += "\nThe companion JSON contains the complete list.\n";
  }
  const f = changes.functions;
  text += `\n### Named function implementations\n\n${f.added.length} added; ${f.removed.length} removed; ${f.changed.length} changed; ${f.smallNumericOnly.length} with only small numeric-constant differences.\n\nThe small-numeric category compares after rounding constants below 10 million to eight decimal places, solely for classification. The source and patches retain exact values; this is not a behavioral-equivalence claim.\n\n`;
  for (const kind of ["added", "removed", "changed", "smallNumericOnly"])
    if (f[kind].length)
      text += `${kind}: ${f[kind]
        .slice(0, 35)
        .map((x) => "`" + safe(x) + "`")
        .join(", ")}${f[kind].length > 35 ? " (full list in JSON)" : ""}.\n\n`;
  return text;
}
function writeHistory(out, manifest) {
  const versions = manifest.versions.filter(
      (v) => v.status === "verified" && !v.duplicateOf,
    ),
    directory = path.join(out, "diffs");
  fs.mkdirSync(directory, { recursive: true });
  let changelog =
    "# Observed Pixelplace script changes in 2026\n\nThese are capture-to-capture observations, not release dates or a complete release history. Query parameter names/values are preserved, never used to infer chronology. The live snapshot is separate from Internet Archive captures.\n\n";
  changelog += `Discovery: ${manifest.discoveryComplete ? "complete for the recorded CDX queries" : "INCOMPLETE"}. Indexed captures: ${manifest.captures.length}. Verified unique snapshots: ${versions.length}.\n\n`;
  changelog +=
    "| Snapshot | Query | Result | Readable source |\n| --- | --- | --- | --- |\n";
  for (const version of manifest.versions)
    changelog += `| ${version.live ? "Live " + version.retrievedAt : version.timestamp} | ${safe(new URL(version.original).search || "(none)")} | ${version.status}${version.duplicateOf ? " (duplicate content)" : ""} | ${version.file ? "[source](" + version.file + ")" : "—"} |\n`;
  changelog +=
    "\nSnapshots are sorted by capture timestamp, even when a later capture has a lower version number. Failed captures are not silently skipped: any comparison spanning one is a comparison of the available verified snapshots only.\n";
  manifest.comparisons = [];
  for (let index = 1; index < versions.length; index++) {
    const previous = versions[index - 1],
      current = versions[index],
      before = fs.readFileSync(path.join(out, previous.file), "utf8"),
      after = fs.readFileSync(path.join(out, current.file), "utf8");
    const id = previous.id + "--" + current.id,
      changes = compareVersions(before, after);
    const patch = createTwoFilesPatch(
      previous.file,
      current.file,
      before,
      after,
      "",
      "",
      { context: 3, timeout: 10000 },
    );
    if (typeof patch !== "string" || Buffer.byteLength(patch) > 20_000_000)
      throw Error("Diff exceeds the configured resource limit");
    fs.writeFileSync(path.join(directory, id + ".patch"), patch);
    fs.writeFileSync(
      path.join(directory, id + ".json"),
      JSON.stringify(
        { before: previous.id, after: current.id, changes },
        null,
        2,
      ) + "\n",
    );
    const summary =
      `# ${previous.id} → ${current.id}\n\nObserved between [before](${previous.sourceUrl}) and [after](${current.sourceUrl}). [Full readable patch](${id}.patch), [complete machine-readable changes](${id}.json).\n\nRenaming/formatting can contribute to the patch. The summary compares public strings/properties and implementation fingerprints with local identifier spelling ignored. Tiny numeric changes are retained, not rounded away. Added/removed endpoint literals do not alone prove a new/removed server capability.\n` +
      markdownChanges(changes);
    fs.writeFileSync(path.join(directory, id + ".md"), summary.trimEnd() + '\n');
    changelog += `\n## ${previous.id} → ${current.id}\n\n[Detailed changes](diffs/${id}.md) · [Readable patch](diffs/${id}.patch)\n\n${changes.endpoints.added.length} endpoint literals added, ${changes.endpoints.removed.length} removed; ${changes.emits.added.length} outgoing events added, ${changes.emits.removed.length} removed; ${changes.functions.changed.length} named implementations changed.\n`;
    const noteworthy = [
      ...changes.endpoints.added.map(
        (x) => "Added endpoint literal `" + safe(x) + "`",
      ),
      ...changes.emits.added.map(
        (x) => "Added outgoing event `" + safe(x) + "`",
      ),
    ].slice(0, 8);
    if (noteworthy.length)
      changelog += "\n" + noteworthy.map((x) => "- " + x).join("\n") + "\n";
    manifest.comparisons.push({
      before: previous.id,
      after: current.id,
      summary: "diffs/" + id + ".md",
      patch: "diffs/" + id + ".patch",
      details: "diffs/" + id + ".json",
    });
  }
  changelog +=
    "\n## Coverage and limits\n\nOnly the exact `/js/script.min.js` pathname on pixelplace.io/www.pixelplace.io is in scope, with every indexed query string. This is not a crawl of vendor bundles, other JavaScript paths, or unarchived releases. Automatic names are inferred/aligned and can need editorial review; they are not recovered author names. The obfuscator bootstrap is deliberately removed; application networking/UI code is structurally checked. No live application/backend flow is executed. Original notice headers are retained.\n";
  fs.writeFileSync(path.join(out, "CHANGELOG.md"), changelog);
}
module.exports = { inventory, compareVersions, writeHistory };
