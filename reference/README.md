# Supplied JavaScript: deobfuscated reference

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
