// Static report evidence only. These classifications do not execute the client
// or establish what its server enforces.
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const { parse } = require("./common.cjs");
const { digest } = require("./name-model.cjs");
const securityPattern =
  /captcha|turnstile|recaptcha|anti.?cheat|known.{0,30}bot|using a bot|botting|automated|isTrusted|originalEvent|is_trigger|isTrigger|isSimulated|fingerprint|integrity|tamper|csrf|authenticat|authoriz|permission|password|session|token|cookie|banned|blacklist|whitelist|cooldown|rate.?limit|painting\.rate|logout|invalid.?client|unsupported.?client|debugger/i;
const domains = [
  [
    "Account and access",
    /login|logout|account|password|session|auth|captcha|permission|bann|token/i,
  ],
  [
    "Canvas and placement",
    /paint|pixel|canvas|brush|palette|color|cooldown|placement|weapon|bomb/i,
  ],
  [
    "Guilds and social features",
    /guild|clan|chat|message|mail|friend|social|ignore|mute/i,
  ],
  [
    "Store and inventory",
    /shop|store|invent|purchase|payment|coin|premium|subscription|item|trade/i,
  ],
  [
    "Realtime and connection handling",
    /socket|connect|disconnect|transport|reconnect|packet|ping|pong/i,
  ],
  ["Maps and navigation", /map|minimap|zoom|viewport|navigation|coordinates/i],
  [
    "Interface and settings",
    /setting|modal|popup|notification|theme|language|profile|display/i,
  ],
];
function facts(source) {
  const security = new Map(),
    registrations = new Set(),
    requests = new Set();
  const ast = parse(source);
  const record = (p) => {
    const statement = p.findParent(
      (q) => q.isStatement() && !q.isBlockStatement(),
    );
    if (!statement || statement.isFunctionDeclaration()) return;
    const snippet = generate(statement.node, {
      comments: false,
      compact: true,
    }).code;
    if (snippet.length > 1800) return; // Large container blocks obscure evidence.
    const key = digest(statement.node);
    if (!security.has(key))
      security.set(key, {
        fingerprint: key,
        line: statement.node.loc?.start.line || 1,
        code: snippet,
      });
  };
  traverse(ast, {
    StringLiteral(p) {
      if (securityPattern.test(p.node.value)) record(p);
    },
    MemberExpression(p) {
      const key = p.node.computed
        ? t.isStringLiteral(p.node.property) && p.node.property.value
        : p.node.property.name;
      if (
        key &&
        (securityPattern.test(key) ||
          (key === "rate" &&
            t.isMemberExpression(p.node.object) &&
            (p.node.object.property.name || p.node.object.property.value) ===
              "painting"))
      )
        record(p);
    },
    DebuggerStatement(p) {
      record(p);
    },
    CallExpression(p) {
      const n = p.node,
        c = n.callee;
      const method = t.isMemberExpression(c)
        ? c.property.name || c.property.value
        : t.isIdentifier(c)
          ? c.name
          : "";
      const strings = n.arguments
        .filter((x) => t.isStringLiteral(x))
        .map((arg) => arg.value);
      if (
        ["on", "one", "once", "addEventListener"].includes(method) &&
        strings.length
      )
        registrations.add(
          method + "(" + strings.map((x) => JSON.stringify(x)).join(", ") + ")",
        );
      if (
        /req|request|ajax|fetch|post|get|put|delete/i.test(method || "") &&
        strings.some((x) => /^\/api\//.test(x))
      ) {
        const object = n.arguments.find((x) => t.isObjectExpression(x));
        const keys = object
          ? object.properties
              .map((x) => x.key?.name || x.key?.value)
              .filter(Boolean)
              .sort()
          : [];
        requests.add(
          (method === "req" && t.isStringLiteral(n.arguments[0])
            ? n.arguments[0].value
            : method) +
            " " +
            strings.filter((x) => /^\/api\//.test(x)).join(" ") +
            " payload keys: " +
            (keys.join(", ") || "(dynamic or none)"),
        );
      }
    },
  });
  return {
    security: [...security.values()],
    registrations: [...registrations].sort(),
    requests: [...requests].sort(),
  };
}
function difference(a, b) {
  const before = new Set(a),
    after = new Set(b);
  return {
    added: b.filter((x) => !before.has(x)),
    removed: a.filter((x) => !after.has(x)),
  };
}
function assess(before, after, changes, protection = {}) {
  const a = facts(before),
    b = facts(after),
    old = new Set(a.security.map((x) => x.fingerprint)),
    current = new Set(b.security.map((x) => x.fingerprint));
  const security = {
    added: b.security.filter((x) => !old.has(x.fingerprint)),
    removed: a.security.filter((x) => !current.has(x.fingerprint)),
  };
  const contracts = {
    registrations: difference(a.registrations, b.registrations),
    requests: difference(a.requests, b.requests),
  };
  const evidence = [
    ...["endpoints", "emits", "listeners", "selectors", "text"].flatMap((key) =>
      ["added", "removed"].flatMap((kind) =>
        changes[key][kind].map((value) => ({ kind, key, value })),
      ),
    ),
    ...["added", "removed", "changed"].flatMap((kind) =>
      changes.functions[kind].map((value) => ({
        kind,
        key: "functions",
        value,
      })),
    ),
  ];
  const major = domains
    .map(([area, pattern]) => ({
      area,
      evidence: evidence.filter((x) => pattern.test(x.value)),
    }))
    .filter((x) => x.evidence.length);
  const securitySummary =
    security.added.length || security.removed.length
      ? `Security/anticheat: ${security.added.length} added/changed and ${security.removed.length} removed/previous security-related statements require review (static candidates).`
      : "Security/anticheat: no changes identified by the static security-statement scan; this is not a complete security assessment.";
  const topics = [
    ["CAPTCHA", /captcha|turnstile|recaptcha/i],
    ["synthetic input", /isTrusted|originalEvent|isTrigger|isSimulated/i],
    [
      "sessions/authentication",
      /password|session|token|cookie|authenticat|logout/i,
    ],
    [
      "client integrity/bot detection",
      /using a bot|known.{0,30}bot|botting|fingerprint|integrity|tamper|invalid.?client|unsupported.?client|debugger/i,
    ],
    ["placement cooldown/rate", /cooldown|rate.?limit|painting\.rate/i],
    [
      "permissions/moderation",
      /permission|banned|blacklist|whitelist|authoriz/i,
    ],
  ];
  const securityTopics = topics
    .map(([topic, pattern]) => ({
      topic,
      added: security.added.filter((x) => pattern.test(x.code)).length,
      removed: security.removed.filter((x) => pattern.test(x.code)).length,
    }))
    .filter((x) => x.added || x.removed);
  const topicalSummary = securityTopics.length
    ? "Security/anticheat: candidates include " +
      securityTopics
        .map((x) => x.topic + " (+" + x.added + "/-" + x.removed + ")")
        .join("; ") +
      ". Static observations; review source evidence."
    : securitySummary;
  const featureSummary =
    major
      .slice(0, 4)
      .map(
        (x) =>
          x.area +
          ": " +
          x.evidence
            .slice(0, 2)
            .map(
              (e) =>
                e.kind +
                " " +
                String(e.value).replace(/\s+/g, " ").slice(0, 85).trimEnd(),
            )
            .join(", "),
      )
      .join("; ") ||
    "No categorized public feature changes identified; inspect the implementation diff.";
  const bootstrap =
    protection.before && protection.after
      ? {
          ...difference(protection.before.features, protection.after.features),
          implementationChanged:
            protection.before.implementationFingerprint !==
            protection.after.implementationFingerprint,
        }
      : null;
  const bootstrapSummary = bootstrap
    ? bootstrap.added.length || bootstrap.removed.length
      ? "Removed obfuscator guards: " +
        bootstrap.added
          .map((x) => "introduced " + x)
          .concat(bootstrap.removed.map((x) => "removed " + x))
          .join("; ") +
        "."
      : bootstrap.implementationChanged
        ? "Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise)."
        : "Removed obfuscator guard features and implementation fingerprint unchanged."
    : "Removed obfuscator guards: comparison metadata unavailable.";
  return {
    major,
    security,
    contracts,
    securityTopics,
    bootstrap,
    bootstrapSummary,
    shortSummary:
      topicalSummary + " " + bootstrapSummary + "\n" + featureSummary,
    limits:
      "Categories are inferred from public literals, member names and function names. Security entries show exact changed statement fingerprints with source lines; they can include refactoring, renaming and numeric changes. They do not prove an exploit, anticheat bypass, server enforcement, or complete security coverage. Obfuscator bootstrap removal is the same deliberate transform in every generated version; this scan covers retained application code only.",
  };
}
const clean = (s) => String(s).replace(/`/g, "'").replace(/\r?\n/g, " ");
function describe(assessment, previousFile, currentFile) {
  let text = "\n## Major observed changes\n\n";
  if (!assessment.major.length)
    text +=
      "No categorized feature change was identified. Review the inventories and patch for changes outside these categories.\n";
  for (const group of assessment.major) {
    text += "\n### " + group.area + "\n\n";
    for (const fact of group.evidence.slice(0, 10))
      text +=
        "- " +
        fact.kind +
        " " +
        fact.key +
        ": `" +
        clean(fact.value).slice(0, 350) +
        "`\n";
    if (group.evidence.length > 10)
      text += "\nAdditional observations are listed in the companion JSON.\n";
  }
  text +=
    "\n## Security and anticheat\n\n" +
    assessment.shortSummary.split("\n")[0] +
    "\n\n" +
    assessment.limits +
    "\n";
  for (const [kind, file] of [
    ["added", currentFile],
    ["removed", previousFile],
  ])
    for (const item of assessment.security[kind].slice(0, 30))
      text +=
        "\n- " +
        kind +
        " candidate ([source line " +
        item.line +
        "](../" +
        file +
        "#L" +
        item.line +
        ")): `" +
        clean(item.code).slice(0, 500) +
        "`\n";
  if (
    assessment.security.added.length > 30 ||
    assessment.security.removed.length > 30
  )
    text += "\nThe JSON lists all security candidates.\n";
  text +=
    "\n## Handler and request contracts\n\nDelegated handler signatures include event names and literal selectors. Request entries include statically visible helper names and object keys; dynamic arguments remain unknown.\n";
  for (const [key, delta] of Object.entries(assessment.contracts))
    for (const kind of ["added", "removed"])
      for (const item of delta[kind].slice(0, 20))
        text += "\n- " + key + " " + kind + ": `" + clean(item) + "`\n";
  return text;
}
module.exports = { facts, assess, describe };
