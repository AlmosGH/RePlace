# Verification recorded 2026-11-16

Reference: `origin/main` at
`4d027fe27debb02dd8b1aa87a3eb246425b5c94f`.
Runtime: Python 3.14.7, aiohttp 3.14.5, Node.js 24.21.0, Windows.

## Live guest session

The live site loaded as a guest in the browser, without logging in or accepting
the welcome agreement. DOM inspection showed `CFVersion="335"`, `#ls=6`, and
the application asset `/js/script.min.js?v3=85301`. The guest API reported
application `update_version=7`, board 7, and user ID 0 with `connected=false`.

Direct Python HTTP requests to the painting HTML encountered Cloudflare HTTP
403. The generated `CACHE-L0CAL` header was accepted by the guest painting API.
Direct Engine.IO 3 attempts failed; Engine.IO 4 completed its handshake with
`pingInterval=25000`, `pingTimeout=20000`, and `maxPayload=1000000`.

This read-only command ran for 180 seconds after canvas initialization:

```powershell
clients/pixelplace/.venv/Scripts/python clients/pixelplace/pixelplace_client.py --cf-version 335 --ls 6 --seconds 180 --reconnect-attempts 0
```

Observed output, with no raw messages or session identifiers recorded:

```json
{"status":"canvas_received","board":7,"engineio":4,"read_only":true}
{"status":"observation_complete","events":{"other":130,"server_time":1,"rate_change":1,"canvas":1,"p":2570},"sent":{"init":1,"hb":1},"ready":true}
```

The connection remained ready, with one initialization, no reconnection, and
no application rejection. The `p` count is the number of server **batches**, not
individual pixels. The session spanned several Engine.IO ping intervals and
the first application `hb` keepalive.

A subsequent 30-second smoke test using the default profile also completed
successfully, receiving 428 `p` batches and remaining ready.

No `ping.alive` event was sent to either guest session. Therefore, live acceptance
of `pong.alive` remains unverified. Its construction is checked against the
supplied JavaScript, and its event handling is exercised on a local server.

A direct `/api/ping.php` request with a generated header returned HTTP **204 No
Content**, which the client accepts. The 180-second session does not reach the
300-second maintenance timer; the endpoint was checked separately.

## Local and reference checks

- Python unit and loopback HTTP/WebSocket integration suite: all 13 tests passed. Covers
  Engine.IO 3 and 4, application/transport heartbeats, canvas ordering,
  authenticated packet construction with dummy local credentials, rejected
  operations, timeout cleanup, bounded queues, HTTP 204, and reconnect without
  replaying writes.
- JavaScript comparison: 40 `CACHE-L0CAL` and 40 `pong.alive` deterministic
  vectors matched exactly against isolated blocks extracted from the pinned
  reference. The application itself was not executed.
- Existing repository `npm test`: all four canvas model tests passed.

## Limits

No authenticated live credentials were used. No pixels, chat messages,
moderation commands, or reports were sent to the live service. Authenticated
placement, protected areas, membership/premium gates, dot detection, and
browser input-integrity reports were not live-tested. A successful guest
session does not establish that all unpublished server integrity checks pass.
The default heartbeat profile records observed page values and must be updated
or rediscovered if the site changes them. No infrastructure was deployed.
