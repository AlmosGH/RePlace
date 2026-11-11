# RePlace implementation plan

Prepared 12 November 2026. Working product name: **RePlace**.

## Product goal

Build a multiplayer pixel-art canvas with the immediacy of r/place and the persistent community features of PixelPlace. Use a full-screen canvas, fast navigation, a fixed palette, discoverable paintings, and integrated chat, presented through an original, modern interface.

Required stack: Svelte frontend and Rust backend. The first public version should support a shared art canvas and a world-map canvas, configurable placement cooldowns, accounts, chat, ownership controls, and basic moderation.

## Decisions for the first version

| Area | Decision | Reason |
| --- | --- | --- |
| Frontend | Svelte 5, SvelteKit, TypeScript | Reactive UI with an independent canvas rendering engine |
| Renderer | Canvas 2D first; tiled WebGL only if profiling requires it | Avoid premature renderer complexity |
| Backend | Rust, Axum, Tokio | HTTP and persistent WebSocket connections in one service |
| First deployment | One Rust instance behind a TLS reverse proxy | One writer per canvas makes ordering and recovery tractable |
| Database | PostgreSQL in the persistence milestone | Accounts, permissions, pixel history, audit records, and durable state |
| Hot canvas state | Palette-indexed byte arrays, one actor per canvas | Compact state, serialized writes, predictable ordering |
| Additional services | Add Redis and object storage only when needed | Keep the initial operational footprint small |
| Canvas modes | Art and world-map templates | Match the two main use cases without adding separate game engines |
| Placement policy | Configurable cooldown; initial public default 1 second | Tune after measuring; zero-cooldown boards still enforce limits |
| Identity | Guest spectators; authenticated placement for public beta | Anonymous shared writes make abuse controls less effective |
| Branding | Original artwork and assets | References guide interactions and layout |

These are initial implementation choices, not claims about PixelPlace's internal technology. The local starter intentionally runs without a database or external identity provider.

## Milestones and acceptance criteria

Effort is estimated for one experienced developer working full time, excluding waiting for external services. Treat each range as a planning estimate, not a delivery promise. Rough total: **9–14 development weeks**, followed by tuning from beta feedback.

### M0 — Research and foundation · 2–3 days

- [x] Review the supplied screenshots and PixelPlace's published interface/features.
- [x] Record product scope, UI direction, architecture, protocol, and risks.
- [x] Create a Svelte/Rust monorepo foundation with a local editor and API stubs.
- [x] Add unit tests for coordinate transforms, restored edits, and palette integrity.
- [ ] Complete dependency installation, frontend build, Rust compilation, and CI in a network-enabled environment.
- [ ] Capture and review desktop and mobile UI renders.

Exit: a new checkout starts using the README, all required checks pass, and the starter's local-only behavior is explicit.

### M1 — Shared realtime canvas · 1–2 weeks

Build the first complete multiplayer slice on one art board, initially in a private development environment.

- Axum WebSocket endpoint and a per-canvas actor that serializes writes.
- Snapshot bootstrap and ordered pixel updates using `docs/PROTOCOL.md`.
- Server checks for bounds, palette, payload length, request duplication, and placement rate.
- Reconnecting client with jittered backoff and snapshot replacement on gaps.
- Visible pending placement, acknowledgement, rejection, cooldown, and connection state.
- Canvas rendering isolated from UI reactivity; requestAnimationFrame batches updates.
- Touch pan, pinch zoom, and a deliberate tap-to-place interaction; desktop shortcuts.
- URL restores board and position; PNG export uses accepted state.

Exit: two independent browser sessions converge after simultaneous writes. Disconnection, stale snapshots, duplicate requests, oversized messages, a slow consumer, and rejected placements cannot corrupt the board. In-memory state loss is acceptable only for this private milestone and must be labeled.

### M2 — Accounts, persistence, and chat · 2 weeks

- PostgreSQL migrations and integration tests; accepted writes survive process restart.
- Pixel event log, snapshot checkpoints, and recovery verification.
- Accounts via a selected OIDC provider, server-managed sessions, and profile handles.
- Private development identities replaced with authenticated sessions.
- Painting chat and global chat with bounded history, message limits, mute/report, and moderator deletion.
- Profile basics: avatar, creation date, public pixel count, current guild placeholder only if applicable.
- Keyboard-accessible controls, mobile chat bottom sheet, screen-reader status announcements.

Exit: an acknowledged placement survives a forced restart. Unauthorized placement and chat writes are rejected. Account logout invalidates the session; chat escapes user content and enforces server rate limits. Two users see the same authorized messages.

### M3 — Painting browser, ownership, and world maps · 2 weeks

- Featured, recent, popular, owned, and favorited paintings with search and pagination.
- Owner-created paintings with title, description, dimensions, palette, cooldown, and rules.
- Public, approval-only, and owner-only access modes.
- Owner/moderator roles, access requests, protected rectangles, and audited configuration changes.
- A properly licensed geographic dataset rasterized into an original world template.
- Separate paintable mask for land/ocean restrictions; config decides whether water is writable.
- Canvas thumbnails generated from snapshots; PNG export; configurable default background.

Exit: painting creation and switching work end to end. Access settings and protected regions cannot be bypassed with direct WebSocket messages. World-map pixel coordinates stay consistent across zoom and reconnect.

### M4 — Community and history · 1–2 weeks

- Guild creation, membership/invites, guild chat, emblems, owner/moderator/member roles.
- Follow/block controls and presence with privacy settings.
- Pixel inspector showing allowed ownership/history information, not private metadata.
- Read-only timelapse playback from checkpoints plus events.
- In-app announcements and a compact optional community drawer.

Exit: guild membership and chat isolation are enforced on the server. A blocked user cannot send a direct message if direct messages are enabled later. Playback reproduces a known board state without altering live drawing.

### M5 — Public beta readiness · 1–2 weeks

- Moderator dashboard: reports, mutes/bans, canvas freeze, protected regions, rollback preview/confirm, and append-only audits.
- Secure sessions, WebSocket origin checks, authorization revocation on open connections, CSRF protection for HTTP mutations, and content limits.
- Load tests, soak tests, profiling, backups, restore drills, migration procedure, and deployment rollback.
- Observability for write latency, fan-out queues, disconnects, reconnects, database lag, and blocked requests.
- TLS, reverse proxy, environment configuration, health/readiness endpoints, and hosting instructions.
- Community rules, reporting flow, and retention decisions before a public launch.

Exit: every public-beta gate below passes and a backup can be restored into a clean environment.

## Beta quality gates

These are test targets to validate, not achieved benchmark results.

| Area | Initial target |
| --- | --- |
| Scale | 500 connected clients, 100 accepted pixel writes/sec sustained, 2× short burst |
| Interaction | Smooth pan/zoom near 60 fps on a defined mid-range desktop test device |
| Feedback | Placement acknowledgement p95 under 250 ms in a single-region test |
| Bootstrap | 2048 × 2048 art board displayed within 3 seconds on a recorded 20 Mbps connection |
| Memory | Less than 150 MB renderer memory per 2048 × 2048 board on the desktop test device |
| Durability | No loss of acknowledged writes after forced process termination |
| Recovery | Client gap/overflow detection always triggers a consistent resync |
| Boundaries | Malformed coordinates, palette values, revoked roles, and bypassed UI cannot write |
| Accessibility | Keyboard controls, visible focus, accessible labels, reduced-motion support, no color-only statuses |
| Operations | Database backup/restore and service rollback demonstrated |

## Deliberately deferred

Paid premium, coin shops, bombs/missiles, automated image-drawing bots, auctions, streamer subscriptions, diplomacy forums, territory combat, and multi-region writers. They add economy, abuse, and operational complexity before the core collaborative product is proven. World-map painting and guild collaboration are included; a combat simulation is a later product decision.

## Implementation order within a milestone

1. Define the accepted behavior and failure cases in the protocol or API contract.
2. Implement backend validation and state changes.
3. Wire the frontend using real responses and explicit loading/error/reconnect states.
4. Test a complete flow with two independent sessions.
5. Update the plan and README to reflect what actually works.

## Main risks and responses

| Risk | Response |
| --- | --- |
| Large canvases exhaust memory | Palette indices, reusable buffers, bounds on active boards, eventual chunking |
| Snapshot race loses pixels | Actor establishes snapshot version and event subscription at one ordering boundary |
| Slow clients stall everyone | Bounded queues and explicit resync/close behavior |
| Accepted pixels disappear on restart | Durable commit before acknowledgement in M2 |
| Botting or multi-account abuse | Auth, account/IP limits, moderation, and configurable cooldown policies |
| Protected-region bypass | Server checks at write time; owner tools use the same permission layer |
| Too many features delay a usable product | Finish the shared art canvas before guilds and world-template complexity |
| Infrastructure costs grow early | Single-region service first; measure before adding Redis, a CDN, or sharding |

## Starter validation notes

Coordinate/zoom/storage tests run directly on Node 24 and pass. The official Svelte component checker reports no component issues. Rust formatting was applied. Full dependency installation, Svelte type/build checks, Rust compilation/tests, and visual browser QA still require verification; the initial environment could not resolve package hosts and did not have the needed dependencies cached. CI is included to run those checks when GitHub Actions is available. Do not count a configured workflow as a passing workflow.
