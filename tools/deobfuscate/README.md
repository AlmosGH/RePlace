# Readable JavaScript and 2022–2026 archive history

Requires Node.js 24.21.0+ and npm. From the repository root:

```powershell
npm ci --prefix tools/deobfuscate --no-audit --no-fund
node tools/deobfuscate/archive-2026.cjs
node tools/deobfuscate/archive-range.cjs
```

This discovers 2026 Internet Archive captures of **the exact
`/js/script.min.js` pathname**, including every query parameter name/value and
URLs with no query string. Both bare and `www` hosts are queried; HTTP/HTTPS
captures are accepted. Nothing depends on a parameter being named `v3`.
Other JavaScript paths, vendor bundles, source maps, non-200 captures, and
unarchived releases are outside this scope.

`archive-range.cjs` runs the same bounded pipeline for 2022 through 2026 and
assembles a chronological changelog in `reference/history/CHANGELOG.md`, including
comparisons across year boundaries. Use `--offline` to reuse verified raw caches,
or `--reports-only` to regenerate the combined reports from yearly manifests.
Each unavailable capture or unsupported transformation stays visible as a failure;
the tool never labels a failed snapshot verified. Comparisons across gaps describe
only the available snapshots, not every release deployed during the interval.

The default output is [reference/history/2026](../../reference/history/2026).
The live URL defaults to the supplied `?v3=85301` URL and is a separately labeled
snapshot. Update it explicitly when the site's live script reference changes:

```powershell
node tools/deobfuscate/archive-2026.cjs --live-url 'https://pixelplace.io/js/script.min.js?newParameter=newValue'
node tools/deobfuscate/archive-2026.cjs --no-live
node tools/deobfuscate/archive-2026.cjs --offline --rebuild
node --test tools/deobfuscate/archive.test.cjs
node --test tools/deobfuscate/reports.test.cjs
node tools/deobfuscate/audit-history.cjs
```

Online runs refresh the CDX index and live response. Archived responses are cached
with SHA-256 integrity metadata; `--refresh` redownloads them. Offline runs use the
saved `index.json` and `.cache` without network requests. The raw cache is ignored
by Git. A checkout without that cache needs an online run first. `--rebuild`
regenerates outputs even when the recipe and input hashes match. `--out`, `--cache`,
`--index`, `--year`, and `--max-captures` are also supported. Passing an external
raw CDX table via `--index` does not claim complete discovery.

`--revalidate-cache` can reuse detailed historical outputs after a tooling change
only after a fresh decoder audit and complete application comparison. Reports keep
the original generation fingerprint and separately record the verifier fingerprint
and revalidation time. Failed revalidation falls back to regeneration. `--rebuild`
always regenerates names and comments instead.

## Outputs

- `index.json` and `index-pages/`: discovery queries, continuation keys, and raw
  CDX evidence. There is no digest collapse at discovery time.
- `manifest.json`: every capture, original URL, archive replay URL, retrieval
  timestamp, source/output hashes, verification state, duplicate association,
  failures, and comparison links. Capture dates determine ordering; version query
  values do not.
- `versions/*.js`: commented, decoded, simplified code with scoped names and
  original notice headers. A companion name map and transformation/verification
  report accompany each unique downloaded body.
- `CHANGELOG.md`, `diffs/*.md`, `diffs/*.json`, `diffs/*.patch`: concise summaries,
  complete contract/function inventories, and full readable unified patches.
  Small numeric-only changes are classified separately; exact constants remain
  in the code and patches.

Reports include inferred feature areas, changed event/selector registrations,
statically visible request payload keys, and a security/anticheat section with
source-line evidence. Security summaries always appear, including when the scan
finds no candidates. The scan covers retained application statements and is not
a full security assessment or evidence of server enforcement. Removed obfuscator
bootstrap behavior is documented separately as a consistent transformation delta.
Historical reports also inventory changes to the removed guards, including
console suppression, source self-defense, debugger guards and domain restrictions.
Guard fingerprint changes can be generated obfuscation noise; reports distinguish
those from detected changes in protection features.

The latest reference includes detailed flow comments and direct observations of
network calls, state writes, DOM operations and timers. Comments describe inferred
roles and observed code; they are not recovered original documentation. A separate
comment-verification report checks that adding these comments changes no executable
AST content.

Content deduplication uses the SHA-256 of downloaded response bytes, not version
query strings. The CDX digest is retained as archive provenance; it is **not**
claimed to validate the downloaded replay bytes. In these recovered responses,
the SHA-1/base32 of delivered bytes did not equal the indexed digest. The tool
records its own response hashes instead of silently asserting WARC-byte identity.

## Deobfuscation and verification

The supported family is the rotated string-array/custom-base64 family observed
in the recovered 2022–2026 captures and the supplied current file. Detection uses
AST structure and numeric evaluation, not hard-coded hex identifiers, table size,
or a filename query version. New unsupported families fail explicitly.

The table is decoded statically. Every entry is then compared with the original
decoder in a short-lived Node child restricted by the permission model, a 128 MiB
heap, an eight-second process limit, VM timeouts, and disabled string/Wasm code
generation. The recognized prefix is screened for free identifiers outside its
built-in allowlist. **The downloaded application is never executed.** This worker
is a bounded decoder audit, not a claim of a general-purpose hostile-code sandbox.

An independent AST comparison checks lookup expansion/constant simplification.
A second comparison checks branch cleanup and renamed binding identities,
including captures of outer variables and assignment targets. The deliberate
behavior delta remains removal of the obfuscator bootstrap/console suppression;
application input checks, payload fields, URLs, DOM selectors, and event names
remain part of the compared application.

Historical names are transferred from the curated current reference using
fingerprints and statement/method alignment. Narrow role rules and contextual
inference cover unmatched bindings. These are **heuristic editorial names**, not
recovered original author names or a promise of perfect meaning. Ambiguity that
cannot be resolved without identifier collisions fails with a review report.
The current commented reference retains its curated names.
In historical name maps, `reviewed` is the renamer's reference-hint category;
it does not mean that every historical correspondence was manually reviewed.
Capture timestamps use UTC `YYYYMMDDHHMMSS` notation.

Older bundled libraries can reuse short identifiers across lexical scopes. The
pipeline first assigns unique internal binding identities and records source
names/scopes. Legacy globals reused as renderer scratch slots are retained only
when a preceding unconditional assignment or bounded path analysis proves every
reachable read initialized. The path analysis handles the image-painter's guarded
post-loop reads, treats calls and non-boolean values as unknown, and rejects
unsupported control flow. Unproven dependencies on removed bootstrap state fail.

## Discord summaries

`discord-notify.cjs` posts an explicit JSON queue of `{id, summary, url}` objects.
Provide the webhook via `DISCORD_WEBHOOK_URL` or one line on stdin; never pass it
as a CLI argument or place it in a committed file. `--everyone` explicitly enables
the requested everyone mention; mentions embedded in summary text are neutralized.
Messages are bounded, rate-limit retries are bounded, successful acknowledgements
are recorded, and uncertain transport outcomes block automatic duplicate retries.
Keep the queue and delivery ledger under the ignored history `.cache` directory.

```powershell
node tools/deobfuscate/discord-notify.cjs --queue reference/history/.cache/notifications.json --everyone
```

For publication, generate links using the pushed immutable Git commit and the
report path. Do not send a report link until that report is publicly available.
Progress notifications are sent during the active task; this tool does not install
a recurring background service or store webhook credentials.

Implementation summaries ignore local identifier spelling, so they are useful
for navigating changes rather than proofs of semantic equivalence between
different releases. Full patches retain renamed code, exact numbers, and strings.
Endpoint literals may include dynamic prefixes; adding/removing one does not by
itself establish a backend capability change. No authenticated UI, live canvas,
payments, or backend flow is tested by this archive tool.

Limits: two attempts per request, 40-second request timeout, four redirects,
12 MB per source, 4 MB per CDX page, 20 pages per host, 500 captures by default
(configurable up to 5,000), 128 MB aggregate source bytes per run, and 20 MB per
patch with a ten-second diff timeout. Resumption loops, changed-capture redirects,
cache mismatches, limits, unsupported code, and verification failures are reported
instead of producing a misleading complete result. Partial successful snapshots
remain listed when another snapshot fails. A repeated run reuses verified output
only when input, recipe, output, and name-map hashes agree.

The discovery format and continuation behavior follow the
[Internet Archive CDX documentation](https://github.com/internetarchive/wayback/blob/master/wayback-cdx-server/README.md).
Existing authorship and notices are retained; the tool does not assign a new
license to third-party code.
