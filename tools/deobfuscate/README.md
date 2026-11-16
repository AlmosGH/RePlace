# Readable JavaScript and 2026 archive history

Requires Node.js 24.21.0+ and npm. From the repository root:

```powershell
npm ci --prefix tools/deobfuscate --no-audit --no-fund
node tools/deobfuscate/archive-2026.cjs
```

This discovers 2026 Internet Archive captures of **the exact
`/js/script.min.js` pathname**, including every query parameter name/value and
URLs with no query string. Both bare and `www` hosts are queried; HTTP/HTTPS
captures are accepted. Nothing depends on a parameter being named `v3`.
Other JavaScript paths, vendor bundles, source maps, non-200 captures, and
unarchived releases are outside this scope.

The default output is [reference/history/2026](../../reference/history/2026).
The live URL defaults to the supplied `?v3=85301` URL and is a separately labeled
snapshot. Update it explicitly when the site's live script reference changes:

```powershell
node tools/deobfuscate/archive-2026.cjs --live-url 'https://pixelplace.io/js/script.min.js?newParameter=newValue'
node tools/deobfuscate/archive-2026.cjs --no-live
node tools/deobfuscate/archive-2026.cjs --offline --rebuild
node --test tools/deobfuscate/archive.test.cjs
```

Online runs refresh the CDX index and live response. Archived responses are cached
with SHA-256 integrity metadata; `--refresh` redownloads them. Offline runs use the
saved `index.json` and `.cache` without network requests. The raw cache is ignored
by Git. A checkout without that cache needs an online run first. `--rebuild`
regenerates outputs even when the recipe and input hashes match. `--out`, `--cache`,
`--index`, `--year`, and `--max-captures` are also supported. Passing an external
raw CDX table via `--index` does not claim complete discovery.

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

Content deduplication uses the SHA-256 of downloaded response bytes, not version
query strings. The CDX digest is retained as archive provenance; it is **not**
claimed to validate the downloaded replay bytes. In these recovered responses,
the SHA-1/base32 of delivered bytes did not equal the indexed digest. The tool
records its own response hashes instead of silently asserting WARC-byte identity.

## Deobfuscation and verification

The supported family is the rotated string-array/custom-base64 family observed
in the four indexed 2026 captures and the supplied current file. Detection uses
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
