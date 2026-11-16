// Runs as a short-lived, memory-limited child. Only the recognized decoder
// prefix is evaluated, never the downloaded application or network/UI code.
const vm = require("node:vm");
const crypto = require("node:crypto");
let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  input += chunk;
  if (input.length > 4_000_000) process.exit(2);
});
process.stdin.on("end", () => {
  try {
    const { prefix, decoder, entries } = JSON.parse(input);
    if (!/^[A-Za-z_$][\w$]*$/.test(decoder) || entries > 30000)
      throw Error("Invalid decoder request");
    const context = vm.createContext(Object.create(null), {
      codeGeneration: { strings: false, wasm: false },
    });
    vm.runInContext(prefix, context, { timeout: 2500 });
    const values = vm.runInContext(
      `Array.from({length:${entries}},(_,i)=>${decoder}(i))`,
      context,
      { timeout: 2500 },
    );
    process.stdout.write(
      crypto.createHash("sha256").update(JSON.stringify(values)).digest("hex"),
    );
  } catch (error) {
    process.stderr.write(error.message);
    process.exitCode = 1;
  }
});
