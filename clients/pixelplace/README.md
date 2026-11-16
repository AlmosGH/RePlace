# Python Pixelplace client

Standalone client for the JSON Socket.IO traffic observed in the 2026 reference.
It does not change the RePlace frontend or Rust service.

## Run

From the repository root, in PowerShell (Python 3.11+):

```powershell
python -m venv clients/pixelplace/.venv
clients/pixelplace/.venv/Scripts/python -m pip install -r clients/pixelplace/requirements.txt
clients/pixelplace/.venv/Scripts/python clients/pixelplace/pixelplace_client.py --board 7 --seconds 180
```

The CLI is read-only, requires no login, and prints aggregate event counts. It
never prints chat bodies, session IDs, cookies, or authentication payloads.
`canvas_received` means that the server sent its initial `canvas` event. The
client exposes pixel batches; it does not download/render the background PNG,
implement bomb artwork, or maintain a complete painting image.

Defaults match the live guest page observed on **2026-11-16**: Engine.IO **4**,
`CFVersion="335"`, `#ls=6`, `wsa=6`, and initialized `pSave=3`. These values are
a version profile, not timeless constants. Override the page values with
`--cf-version VALUE --ls NUMBER`, or use `--discover-heartbeat` to read them
from the painting HTML. Direct HTML requests encounter Cloudflare HTTP 403 in
this environment; the guest JSON API and Engine.IO 4 WebSocket work directly.
No Cloudflare challenge solver or cookie extraction is included.

`--engineio 3` supports the older Engine.IO heartbeat direction for archived
protocol experiments. The live server rejected version 3 during verification;
it is not the 2026 default. `--socket-url` overrides the advertised socket
origin. `--bootstrap-file` can supply a previously obtained JSON bootstrap;
such files may contain account information and are ignored by this directory's
`.gitignore`. Normal operation fetches fresh bootstrap data from the API.

## Protocol behavior

- A new `CACHE-L0CAL` header is generated for every HTTP request. It encodes
  Unix seconds plus 258 with the reference alphabets, digit mapping, padding,
  case randomization, and final `=`. It is not an HTTP cache directive.
- The default namespace connection emits `init` with `boardId` and any supplied
  `authKey`, `authToken`, and `authId`. Guests omit the undefined auth fields,
  matching JSON serialization of the browser's guest payload.
- `server_time` establishes the time offset. `ping.alive` produces a
  `pong.alive` token using the separate digit alphabet, seconds minus 5400,
  page profile, one session-selected digit from the actual user ID, and suffix.
- Engine.IO 4 server pings receive Engine.IO pongs. These differ from
  `ping.alive`/`pong.alive` and the `hb` application keepalive. `hb` starts after
  120 seconds and repeats every 73–92 seconds. The HTTP `/api/ping.php`
  keepalive runs every 300 seconds after canvas initialization.
- `p` events received before `canvas` are buffered within limits and delivered
  after the initial batches. No event is treated as an individual placement
  acknowledgement. `throw.error` and `throw.error.special` stop the session
  and surface the numeric code; they are never suppressed or retried blindly.

This is a focused default-namespace Socket.IO implementation on `aiohttp`
WebSockets, not a general Socket.IO library. It supports the packet types used
by this client. Polling, binary attachments, custom namespaces, and Socket.IO
acknowledgement callbacks are unsupported and fail explicitly.

## Using it from Python

Place your script beside `pixelplace_client.py`, or add this directory to your
Python module path:

```python
import asyncio
from pixelplace_client import PixelplaceClient

def receive(event, payload):
    if event == "p":
        # Server tuples are [x, y, color, width, userId, optionalCommand].
        print(f"Received {len(payload)} pixel updates")

async def main():
    async with PixelplaceClient(board_id=7, on_event=receive) as client:
        await asyncio.sleep(180)
        if client.error:
            raise client.error

asyncio.run(main())
```

Callbacks run synchronously in the receive loop; keep them short. The client
holds no chat history or background tasks for individual events.

For authenticated operation, supply existing credentials through
`PIXELPLACE_AUTH_ID`, `PIXELPLACE_AUTH_KEY`, and `PIXELPLACE_AUTH_TOKEN`, then
pass `credentials=Credentials.from_environment()`. Set all three or none.
Credentials are used only for the requested service and are omitted from
object representations and CLI output. Do not commit credentials or session
files. Login, CAPTCHA, and authentication refresh are not automated.

`place_pixel(x, y, color)` is available with `allow_placements=True` and a
bootstrap that reports an authenticated user. It sends the normal four-element
`p` payload. It checks bounds, integral color indices, palette, connection state,
and the observed rate/cooldown locally. Server permissions, protection,
membership, premium status, and all server limits remain authoritative.
An empty painting palette means the original browser uses its global palette;
provide the observed indices through `default_palette=(...)` before writing on
such a painting. The Python client refuses to invent them.

The method returns after transmission, **not server acceptance**. No offline
placement queue, retry, automatic drawing, or replay is implemented. A native
Python process has no DOM, keyboard trust flags, or JavaScript WebSocket hooks;
this client does not fabricate browser input or clean integrity reports.
Client-source compatibility cannot prove every unpublished server check passes.
Authenticated placement and browser-only integrity reporting have not been
verified against the live server.

## Bounds and reconnect

HTTP responses and WebSocket messages are capped at 4 MiB, initial pending
updates at 4,096 pixels and 4,096 batches, individual batches at 32,768 tuples,
and configurable reconnect attempts at 0–10 (default 3). Unknown event names
share one aggregate counter rather than growing an unbounded dictionary.

Transport failures clear readiness and pending updates, then use exponential
backoff with jitter. Each retry obtains fresh metadata and repeats `init`.
The total retry budget does not reset after successful connections. Protocol,
HTTP, and application rejections stop immediately. Writes are disabled until
the next `canvas` event, and previously sent writes are never replayed.
There is no sequence/resume protocol in the supplied source, so reconnect
does not promise delivery of every event missed while disconnected. Consumers
maintaining an image must reload their authoritative background snapshot.

## Validation

```powershell
clients/pixelplace/.venv/Scripts/python -m unittest discover -s clients/pixelplace -v
clients/pixelplace/.venv/Scripts/python clients/pixelplace/verify_reference.py
```

The reference comparison also requires Node.js and a fetched `origin/main`
containing `reference/script.readable.js`. It extracts only the pure generator
functions and token-building blocks into a timed Node VM, never runs the
application, and compares 40 HTTP token vectors plus 40 heartbeat vectors
against Python using identical deterministic random streams. The output
records the exact reference commit. The local tests use real loopback HTTP
and WebSocket connections for both Engine.IO versions, initialization order,
rejections, timeouts, queue overflow, and explicit placement behavior.

Reference analyzed: `origin/main` commit
`4d027fe27debb02dd8b1aa87a3eb246425b5c94f`,
`reference/script.readable.js`. Relevant regions: HTTP header at lines 488–547,
application heartbeat at 18231–18265, server clock at 18442–18461, initialization
at 18190–18207, canvas ordering at 20600–20769, and `hb` at 21518–21595.
The implementation follows these observed wire formats without importing
Pixelplace's application source, UI, branding, or assets into RePlace.

See `VERIFICATION.md` for the recorded live check and its limits.
