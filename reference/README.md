# Supplied JavaScript: deobfuscated reference

The latest readable source includes explanatory comments for protocol-sensitive
code, coordinate transforms, rendering, HTTP/realtime handling, and UI state.
Its comment-only update was checked against the previous version's parsed code.

For recovered 2026 captures and the separate live snapshot, see the
[observed changelog](history/2026/CHANGELOG.md). The
[archive deobfuscator documentation](../tools/deobfuscate/README.md) describes
query-independent discovery, regeneration, verification, and coverage limits.

## Readable version

Use **[`script.readable.js`](script.readable.js)** for the full application cleanup.
It starts directly with the application's document-ready handler. The string
table, decoder, obfuscator self-defense, and console suppression are removed.
All 2,152 local bindings have role-based names; handlers use ordinary scoped
names such as `event`, with no generated numeric suffixes. Shared components
include `api`, `connection`, `ui`, `canvasRenderer`, `pointer`, `chat`,
`serverData`, and `imagePainter`. The source removes 1,272 constant junk branches
and expands 1,805 comma-expression statements into ordinary statements.

The original variable names are not present in the download and cannot be
recovered. The readable names describe inferred roles, backed by the mapping in
`script.readable.js.names.json`; they are not claimed to be the author's names.
That mapping records lexical scopes so repeated names in separate handlers are
verified without introducing shadowing or changing captured variables.

Client/server URLs, HTTP methods, generated headers, socket event names, payload
fields, DOM selectors, displayed strings, timers, event handlers, and application
logic are preserved by structural verification. Original gameplay/input-integrity
checks remain application behavior. Only the obfuscator bootstrap and its console
side effects were deliberately removed. Function source text and inferred function
names necessarily differ after readable renaming.

```powershell
npm ci --prefix tools/deobfuscate --no-audit --no-fund
node tools/deobfuscate/readable.cjs reference/script.deobfuscated.js reference/script.readable.js
node --check reference/script.readable.js
node tools/deobfuscate/verify-readable.cjs C:/Users/Almos/Downloads/script.min.js reference/script.deobfuscated.js reference/script.readable.js --self-test
node tools/deobfuscate/test-readable.cjs reference/script.deobfuscated.js reference/script.readable.js
node tools/deobfuscate/test-requests.cjs reference/script.deobfuscated.js reference/script.readable.js
```

The independent readable verifier first checks the conservative baseline against
the original download. It then restores recorded binding identities, checks that
references still resolve locally/globally as before, and compares the complete
application after narrowly defined control-flow normalization. Declaration counts
are checked before restoring names. Its mutation tests reject changed references,
strings, numbers, operators, HTTP URLs, socket events, payload keys, DOM selectors,
inserted statements, and reintroduced bootstrap code.

Runtime tests compare 640 cases across 17 pure helpers with deterministic clocks
and random streams, plus seven hoisting/block/sequence examples. Another 40 cases
compare HTTP request construction, generated headers, cancellation, callback data,
notifications, and redirects using an inert AJAX recorder. No live network requests
are sent. A startup smoke test confirms that the readable script registers its
ready handler and leaves console logging intact. The full application's startup
callback is not executed in that smoke test.

Reports are in `readable-verification.json`, `readable-runtime-tests.json`, and
`readable-request-tests.json`. Live DOM rendering, authenticated multiplayer,
payments, and the original backend have not been tested; the original website's
supporting environment was not supplied. Structural checks and isolated runtime
tests support correspondence, not a proof for every possible host environment.

## Conservative baseline

The older `script.deobfuscated.js` is retained unchanged as a verification baseline;
its obfuscated prefix is **not** part of `script.readable.js`.

`script.deobfuscated.js` is a conservative transformation of the supplied
`script.min.js` (1,357,806 bytes). It is a reference artifact, with no integration
into the RePlace application. Its original authorship and licensing are unchanged;
this transformation does not establish redistribution or reuse rights.

The application begins on line 3. Its encoded lookup calls are replaced with their
decoded strings, constant arithmetic and string concatenation are simplified, and
static property accesses use readable dot notation where valid. All application
decoder calls are resolved. Original variable names, control flow, unreachable
branches, function declarations, and external dependencies are retained. Removing
apparently dead declarations can change JavaScript hoisting behavior.

The first 127,995 bytes remain **exactly unchanged**. They contain the encoded
table, decoder, and source-sensitive self-defense/console code. Reformatting that
prefix can trigger the original code's self-defense behavior. Consequently this
is not a completely unobfuscated reconstruction, and original pre-obfuscation
names and comments cannot be recovered from this file.

## Reproduce and verify

Requires Node.js 24.21.0 (the version used for verification) and npm. From the
repository root, with the original download still at the shown path:

```powershell
npm ci --prefix tools/deobfuscate --no-audit --no-fund
node tools/deobfuscate/transform.cjs C:/Users/Almos/Downloads/script.min.js reference/script.deobfuscated.js
node --check reference/script.deobfuscated.js
node tools/deobfuscate/verify.cjs C:/Users/Almos/Downloads/script.min.js reference/script.deobfuscated.js --self-test
```

The original download is not duplicated in this repository. The tooling requires
its exact SHA-256 before executing the audited table/rotation/decoder statements
in a VM with a timeout and string/Wasm code generation disabled. It never runs
the application's networking, DOM, payment, or console-suppression code.

The verifier is independent of the transformer. It evaluates the original
decoder for all 7,755 entries, checks that the prefix is byte-identical, and
compares the entire parsed application after normalizing only decoded lookups,
primitive constant operations, equivalent property notation, and associative
grouping of identical logical operators. Operand order, short circuiting, calls,
assignments, declarations, and branches remain subject to comparison. Its
self-test rejects changed bootstrap bytes, an inserted statement, and changed
strings, numbers, and operators.

`script.deobfuscated.js.report.json` records transformation counts and hashes.
`verification.json` records the verifier and mutation-test results. Regeneration
was checked to produce byte-identical output.

## Limits

This establishes structural correspondence under the documented transformations,
not a proof of identical behavior in every possible host environment. Decoder
cache writes are omitted for replaced calls; no application code accesses that
cache. Application function source strings and source locations change. The
source-sensitive bootstrap is preserved, but externally inspecting application
functions with `Function.prototype.toString` will observe the readable version.

No original website, assets, backend, browser session, or service credentials
were supplied, so live browser behavior and external-service integration have
not been tested. The script still depends on its original environment and retains
its original side effects. This artifact is not an independent multiplayer
implementation or an instruction to execute it against live services.
