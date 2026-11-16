# Observed Pixelplace script changes in 2025

These are capture-to-capture observations, not release dates or a complete release history. Query parameter names/values are preserved, never used to infer chronology. The live snapshot is separate from Internet Archive captures.

Discovery: complete for the recorded CDX queries. Indexed captures: 29. Verified unique snapshots: 8.

| Snapshot | Query | Result | Readable source |
| --- | --- | --- | --- |
| 20250101065720 | ?v3=84349 | verified | [source](versions/20250101065720-6c95e191.js) |
| 20250114132048 | ?v3=84353 | verified (duplicate content) | [source](versions/20250101065720-6c95e191.js) |
| 20250205173655 | ?v3=84353 | verified (duplicate content) | [source](versions/20250101065720-6c95e191.js) |
| 20250224010006 | ?v3=84353 | verified (duplicate content) | [source](versions/20250101065720-6c95e191.js) |
| 20250321053456 | ?v3=84353 | verified (duplicate content) | [source](versions/20250101065720-6c95e191.js) |
| 20250402000636 | ?v3=84355 | verified | [source](versions/20250402000636-2a173c78.js) |
| 20250407184332 | ?v3=84355 | verified (duplicate content) | [source](versions/20250402000636-2a173c78.js) |
| 20250408175834 | ?v3=84355 | verified (duplicate content) | [source](versions/20250402000636-2a173c78.js) |
| 20250410141857 | ?v3=84355 | verified (duplicate content) | [source](versions/20250402000636-2a173c78.js) |
| 20250426210948 | ?v3=84355 | verified (duplicate content) | [source](versions/20250402000636-2a173c78.js) |
| 20250630100424 | ?v3=84356 | verified | [source](versions/20250630100424-1924c5c9.js) |
| 20250630101230 | ?v3=84356 | verified (duplicate content) | [source](versions/20250630100424-1924c5c9.js) |
| 20250713190242 | ?v3=84356 | verified (duplicate content) | [source](versions/20250630100424-1924c5c9.js) |
| 20250715183130 | ?v3=84356 | verified (duplicate content) | [source](versions/20250630100424-1924c5c9.js) |
| 20250727231235 | ?v3=84356 | verified (duplicate content) | [source](versions/20250630100424-1924c5c9.js) |
| 20250808100957 | ?v3=84356 | verified (duplicate content) | [source](versions/20250630100424-1924c5c9.js) |
| 20250809204646 | ?v3=84356 | verified (duplicate content) | [source](versions/20250630100424-1924c5c9.js) |
| 20250809220349 | ?v3=84356 | verified (duplicate content) | [source](versions/20250630100424-1924c5c9.js) |
| 20250811050112 | ?v3=84356 | verified (duplicate content) | [source](versions/20250630100424-1924c5c9.js) |
| 20250812022545 | ?v3=84356 | verified (duplicate content) | [source](versions/20250630100424-1924c5c9.js) |
| 20250815033838 | ?v3=84361 | verified | [source](versions/20250815033838-1c82ebcf.js) |
| 20250816043734 | ?v3=84361 | verified (duplicate content) | [source](versions/20250815033838-1c82ebcf.js) |
| 20250816192134 | ?v3=84361 | verified (duplicate content) | [source](versions/20250815033838-1c82ebcf.js) |
| 20250817220131 | ?v3=84361 | verified (duplicate content) | [source](versions/20250815033838-1c82ebcf.js) |
| 20250818082359 | ?v3=84361 | verified (duplicate content) | [source](versions/20250815033838-1c82ebcf.js) |
| 20250831022816 | ?v3=84388 | verified | [source](versions/20250831022816-d7a51841.js) |
| 20250928073151 | ?v3=84391 | verified | [source](versions/20250928073151-4569c498.js) |
| 20251026111529 | ?v3=85015 | verified | [source](versions/20251026111529-31529cb9.js) |
| 20251120000855 | ?v3=85030 | verified | [source](versions/20251120000855-7c807d1b.js) |

Snapshots are sorted by capture timestamp, even when a later capture has a lower version number. Failed captures are not silently skipped: any comparison spanning one is a comparison of the available verified snapshots only.

[Initial observed baseline](BASELINE.md). Security changes before the earliest verified capture are unknown.

## 20250101065720-6c95e191 → 20250402000636-2a173c78

[Detailed changes](diffs/20250101065720-6c95e191--20250402000636-2a173c78.md) · [Readable patch](diffs/20250101065720-6c95e191--20250402000636-2a173c78.patch)

0 endpoint literals added, 0 removed; 1 outgoing events added, 0 removed; 89 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+6/-11); synthetic input (+2/-4); sessions/authentication (+3/-3); placement cooldown/rate (+11/-12); permissions/moderation (+6/-6). Static observations; review source evidence. Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise).
Account and access: changed object.goBackFromCaptcha, changed requestCaptcha; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.checkDuplicateFromPainting; Guilds and social features: added chat.user.command, changed canvasRenderer.loadFriends; Store and inventory: added toggleInventory, changed canvasRenderer.loadFreeCoins

- Added outgoing event `chat.user.command`

## 20250402000636-2a173c78 → 20250630100424-1924c5c9

[Detailed changes](diffs/20250402000636-2a173c78--20250630100424-1924c5c9.md) · [Readable patch](diffs/20250402000636-2a173c78--20250630100424-1924c5c9.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 83 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+7/-4); synthetic input (+1/-1); sessions/authentication (+7/-7); placement cooldown/rate (+15/-13); permissions/moderation (+8/-5). Static observations; review source evidence. Removed obfuscator guard features and implementation fingerprint unchanged.
Account and access: changed object.goBackFromCaptcha; Canvas and placement: changed canvasRenderer.centerPositionTo, changed canvasRenderer.checkDuplicateFromPainting; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: changed canvasRenderer.loadFreeCoins, changed canvasRenderer.loadUserItems

## 20250630100424-1924c5c9 → 20250815033838-1c82ebcf

[Detailed changes](diffs/20250630100424-1924c5c9--20250815033838-1c82ebcf.md) · [Readable patch](diffs/20250630100424-1924c5c9--20250815033838-1c82ebcf.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 96 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+8/-8); synthetic input (+3/-3); sessions/authentication (+6/-5); client integrity/bot detection (+1/-0); placement cooldown/rate (+10/-18); permissions/moderation (+6/-7). Static observations; review source evidence. Removed obfuscator guard features and implementation fingerprint unchanged.
Account and access: changed requestCaptcha; Canvas and placement: added /tm - Replay all placed pixels from the past few hours (only available on certain off, added You are currently rate-limited for placing pixels too quickly. This usually occurs wh; Guilds and social features: added chat.system.announce.forums, added #chat .tabs a.forums .unread-count; Store and inventory: added .user-inventory, added Hide inventory & frames

## 20250815033838-1c82ebcf → 20250831022816-d7a51841

[Detailed changes](diffs/20250815033838-1c82ebcf--20250831022816-d7a51841.md) · [Readable patch](diffs/20250815033838-1c82ebcf--20250831022816-d7a51841.patch)

1 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 94 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+7/-5); synthetic input (+3/-3); sessions/authentication (+6/-6); placement cooldown/rate (+18/-14); permissions/moderation (+7/-6). Static observations; review source evidence. Removed obfuscator guard features and implementation fingerprint unchanged.
Account and access: changed requestCaptcha, changed runCaptchaAction; Canvas and placement: added Enter a painting ID to be used as a profile background, changed canvasRenderer.centerPositionTo; Guilds and social features: added refreshGuildRequests, changed canvasRenderer.loadFriends; Store and inventory: changed canvasRenderer.loadFreeCoins, changed canvasRenderer.loadUserItems

- Added endpoint literal `/api/post-user-background.php`

## 20250831022816-d7a51841 → 20250928073151-4569c498

[Detailed changes](diffs/20250831022816-d7a51841--20250928073151-4569c498.md) · [Readable patch](diffs/20250831022816-d7a51841--20250928073151-4569c498.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 85 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+4/-6); synthetic input (+4/-2); sessions/authentication (+6/-6); placement cooldown/rate (+16/-13); permissions/moderation (+8/-11). Static observations; review source evidence. Removed obfuscator guard features and implementation fingerprint unchanged.
Account and access: changed runCaptchaAction; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.centerPositionTo; Guilds and social features: removed refreshGuildRequests, changed canvasRenderer.loadFriends; Store and inventory: changed canvasRenderer.useItem, changed openCoinIsland

## 20250928073151-4569c498 → 20251026111529-31529cb9

[Detailed changes](diffs/20250928073151-4569c498--20251026111529-31529cb9.md) · [Readable patch](diffs/20250928073151-4569c498--20251026111529-31529cb9.patch)

1 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 89 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+5/-8); synthetic input (+3/-5); sessions/authentication (+6/-6); placement cooldown/rate (+9/-8); permissions/moderation (+6/-6). Static observations; review source evidence. Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise).
Account and access: changed object.goBackFromCaptcha, changed requestCaptcha; Canvas and placement: added Cannot change color in Protect / Unprotect mode, added Pixelplace Moderators (Do not ping admin); Guilds and social features: added You won Crate King chat/profile icon! Congratz!, added refreshFriends; Store and inventory: added #item .item-action, added #item .item-odds

- Added endpoint literal `/api/pxpcrate.php`

## 20251026111529-31529cb9 → 20251120000855-7c807d1b

[Detailed changes](diffs/20251026111529-31529cb9--20251120000855-7c807d1b.md) · [Readable patch](diffs/20251026111529-31529cb9--20251120000855-7c807d1b.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 95 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+5/-4); synthetic input (+4/-2); sessions/authentication (+6/-6); placement cooldown/rate (+8/-10); permissions/moderation (+10/-6). Static observations; review source evidence. Removed obfuscator guard features and implementation fingerprint unchanged.
Account and access: added This user has been banned, added This user has been banned for the following reason: ; Canvas and placement: changed animateWeaponEffect, changed applyPixelBatch; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: added #profile .user-inventory, added #profile a[data-id="hide-inventory"]

## Coverage and limits

Only the exact `/js/script.min.js` pathname on pixelplace.io/www.pixelplace.io is in scope, with every indexed query string. This is not a crawl of vendor bundles, other JavaScript paths, or unarchived releases. Automatic names are inferred/aligned and can need editorial review; they are not recovered author names. The obfuscator bootstrap is deliberately removed; application networking/UI code is structurally checked. No live application/backend flow is executed. Original notice headers are retained.
