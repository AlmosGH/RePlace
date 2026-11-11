# Realtime protocol draft · v1

**Design only. The current API does not implement `/ws`.** JSON first for readability; introduce binary snapshots/deltas after profiling while retaining explicit version negotiation.

## Envelope and limits

All messages carry a `type` and protocol `v: 1`. One canvas subscription per connection initially. Server validates both schema and authorization. Initial limits to validate in load tests: 4 KiB inbound JSON, 64-byte request ID, 500-character chat body, 256 KiB snapshot chunks, and at most 1 MiB queued outbound bytes per client. A single metadata/control frame cannot bypass the inbound limit.

Palette colors are integer indices. Coordinates are integers with `0 <= x < width` and `0 <= y < height`. Sequence numbers are decimal strings so JavaScript does not lose integer precision; epoch is an opaque identifier changed when continuity cannot be guaranteed.

## Bootstrap

Client:

```json
{"v":1,"type":"subscribe","canvasId":"atelier"}
```

Server:

```json
{"v":1,"type":"snapshot_begin","canvasId":"atelier","epoch":"opaque-epoch","seq":"12345","width":2048,"height":2048,"palette":["#ffffff","#11171d"],"encoding":"palette-u8-base64","chunks":16,"totalBytes":4194304}
```

The palette above is abbreviated for illustration; send the complete palette in a real snapshot. Chunk payload:

```json
{"v":1,"type":"snapshot_chunk","epoch":"opaque-epoch","seq":"12345","index":0,"data":"BASE64_BYTES"}
```

`data` above is a placeholder, not a valid snapshot. Finish with:

```json
{"v":1,"type":"snapshot_end","epoch":"opaque-epoch","seq":"12345","checksum":"sha256-of-raw-indexed-bytes"}
```

The receiver checks chunk count/index uniqueness, decoded length, every palette index, and checksum before replacing its live buffer. Do not allocate from untrusted dimensions before checking board size limits. Server subscribes at snapshot sequence `S` and queues every accepted event `> S` while streaming. Abort/resync if the bounded queue overflows.

## Place a pixel

Client:

```json
{"v":1,"type":"place","requestId":"client-generated-uuid","canvasId":"atelier","x":42,"y":73,"color":8}
```

Accepted placement, sent to authorized subscribers including the originator:

```json
{"v":1,"type":"pixel","canvasId":"atelier","epoch":"opaque-epoch","seq":"12346","requestId":"client-generated-uuid","x":42,"y":73,"color":8,"userId":"public-user-id","nextAllowedAt":"2026-11-12T10:00:01Z"}
```

The server derives user identity from the session. It does not trust client-supplied owner, timestamps, cooldown, or roles. An originator may preview a pending placement separately; accepted state changes only upon a valid server event. Rejection clears the pending marker without painting over a newer accepted pixel.

Rejected placement:

```json
{"v":1,"type":"rejected","requestId":"client-generated-uuid","code":"COOLDOWN","retryAfterMs":800}
```

Other rejection codes: `UNAUTHENTICATED`, `FORBIDDEN`, `OUT_OF_BOUNDS`, `INVALID_COLOR`, `PROTECTED`, `RATE_LIMITED`, `CANVAS_FROZEN`, `INVALID_MESSAGE`, `UNAVAILABLE`. Error text must not expose private moderation details. Duplicate request IDs return the original outcome for the authenticated user and canvas within a bounded cache; a retry must not create another placement.

## Ordering and reconnect

- Apply a `pixel` only when epoch matches and sequence is exactly the next expected value.
- Ignore previously applied sequences; a sequence gap requests resync and disables placement.
- `resync_required` means discard partial state and request a new snapshot.
- On reconnect, take a fresh snapshot in v1. Resume-by-sequence can be added after a retained-log window and epoch checks exist.
- Exponential reconnect backoff with jitter: start near 500 ms, cap near 15 seconds; suspend while the browser reports offline.
- Coalesce display work into animation frames, not message ordering itself.
- Heartbeats detect stale sockets. Disconnect a slow subscriber rather than buffering indefinitely or blocking all writers.
- Canvas switches close/unsubscribe the old connection before creating the new subscription; late events cannot affect the new canvas.

## Later messages

Add authenticated `chat_send`/`chat_message`, presence aggregates, permission changes, and canvas configuration revisions in M2/M3. Aggregate presence initially; exact cursor tracking is optional and requires privacy controls. Guild channels require active membership checks on subscribe and on send, including revocation during an open connection.

Generate or validate shared TypeScript/Rust schemas when M1 is implemented. JSON examples are a reviewable contract draft, not a promise of existing endpoints.
