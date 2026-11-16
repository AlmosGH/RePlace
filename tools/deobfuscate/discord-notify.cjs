const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");
const { sha256 } = require("./common.cjs");
function webhookUrl(secret) {
  const url = new URL(secret.trim());
  if (
    url.protocol !== "https:" ||
    url.hostname !== "discord.com" ||
    !/^\/api(?:\/v\d+)?\/webhooks\/\d+\/[A-Za-z0-9_-]+$/.test(url.pathname)
  )
    throw Error("Invalid Discord webhook URL");
  url.searchParams.set("wait", "true");
  return url;
}
function payload(item, everyone = false) {
  const prefix = everyone ? "@everyone\n" : "";
  const body = String(item.summary || "").replace(/@/g, "@\u200b");
  const link = item.url ? "\n" + item.url : "";
  const content = prefix + body + link;
  if (content.length > 1950) throw Error("Notification is too long");
  return { content, allowed_mentions: { parse: everyone ? ["everyone"] : [] } };
}
async function deliver(
  items,
  secret,
  { ledgerFile, everyone = false, fetchImpl = fetch } = {},
) {
  const endpoint = webhookUrl(secret);
  let ledger =
    ledgerFile && fs.existsSync(ledgerFile)
      ? JSON.parse(fs.readFileSync(ledgerFile, "utf8"))
      : { messages: {} };
  let delivered = 0,
    skipped = 0;
  for (const item of items) {
    const body = payload(item, everyone),
      key = item.id || sha256(JSON.stringify(body));
    if (ledger.messages[key]?.status === "delivered") {
      skipped++;
      continue;
    }
    if (ledger.messages[key]?.status === "unknown")
      throw Error(
        "Previous delivery is uncertain; inspect the local ledger before retrying",
      );
    let response,
      attempt = 0;
    while (attempt++ < 4) {
      try {
        response = await fetchImpl(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(20000),
          redirect: "error",
        });
      } catch {
        ledger.messages[key] = {
          status: "unknown",
          reason:
            "Transport failure; delivery may have succeeded. Do not automatically retry.",
          at: new Date().toISOString(),
        };
        if (ledgerFile) {
          fs.mkdirSync(path.dirname(ledgerFile), { recursive: true });
          fs.writeFileSync(ledgerFile, JSON.stringify(ledger, null, 2) + "\n");
        }
        throw Error(
          "Discord transport failed; delivery status is uncertain (credential redacted)",
        );
      }
      if (response.status !== 429) break;
      const limited = await response.json();
      const delay = Number(limited.retry_after);
      if (!Number.isFinite(delay) || delay < 0 || delay > 60)
        throw Error("Discord rate-limit wait exceeds the configured bound");
      await new Promise((resolve) =>
        setTimeout(resolve, Math.ceil(delay * 1000) + 100),
      );
    }
    if (!response.ok)
      throw Error(
        "Discord rejected the message: HTTP " +
          response.status +
          " (credential redacted)",
      );
    const result = await response.json();
    if (!result.id)
      throw Error("Discord did not return a message acknowledgement");
    ledger.messages[key] = {
      status: "delivered",
      messageId: result.id,
      report: item.url || null,
      at: new Date().toISOString(),
    };
    delivered++;
    if (ledgerFile) {
      fs.mkdirSync(path.dirname(ledgerFile), { recursive: true });
      fs.writeFileSync(ledgerFile, JSON.stringify(ledger, null, 2) + "\n");
    }
    console.log("Discord acknowledged " + key);
    await new Promise((resolve) => setTimeout(resolve, 600));
  }
  return { delivered, skipped };
}
async function main() {
  const args = process.argv.slice(2);
  const option = (name) => args[args.indexOf(name) + 1];
  const queue = option("--queue");
  if (!args.includes("--queue") || !queue)
    throw Error(
      "Pass --queue FILE and provide the credential through stdin or DISCORD_WEBHOOK_URL",
    );
  let secret = process.env.DISCORD_WEBHOOK_URL;
  if (!secret) {
    console.log("Waiting for webhook credential on stdin (not echoed).");
    const input = readline.createInterface({
      input: process.stdin,
      terminal: false,
    });
    secret = await new Promise((resolve, reject) => {
      let received = false;
      input.once("line", (line) => {
        received = true;
        input.close();
        resolve(line);
      });
      input.once("close", () => {
        if (!received) reject(Error("No webhook credential received on stdin"));
      });
    });
  }
  const items = JSON.parse(fs.readFileSync(queue, "utf8"));
  const ledger = args.includes("--ledger")
    ? option("--ledger")
    : path.join(path.dirname(queue), "discord-delivery.local.json");
  const result = await deliver(items, secret, {
    ledgerFile: ledger,
    everyone: args.includes("--everyone"),
  });
  secret = "";
  console.log(JSON.stringify(result));
}
if (require.main === module)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
module.exports = { webhookUrl, payload, deliver };
