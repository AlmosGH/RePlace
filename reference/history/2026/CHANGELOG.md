# Observed Pixelplace script changes in 2026

These are capture-to-capture observations, not release dates or a complete release history. Query parameter names/values are preserved, never used to infer chronology. The live snapshot is separate from Internet Archive captures.

Discovery: complete for the recorded CDX queries. Indexed captures: 4. Verified unique snapshots: 5.

| Snapshot | Query | Result | Readable source |
| --- | --- | --- | --- |
| 20260103192131 | ?v3=85030 | verified | [source](versions/20260103192131-7c807d1b.js) |
| 20260227071834 | ?v3=85049 | verified | [source](versions/20260227071834-18cc5114.js) |
| 20260524052024 | ?v3=84338 | verified | [source](versions/20260524052024-c5d5ffa7.js) |
| 20260824144436 | ?v3=85291 | verified | [source](versions/20260824144436-501ca950.js) |
| Live 2026-11-16T18:31:37.098Z | ?v3=85301 | verified | [source](versions/live.js) |

Snapshots are sorted by capture timestamp, even when a later capture has a lower version number. Failed captures are not silently skipped: any comparison spanning one is a comparison of the available verified snapshots only.

[Initial observed baseline](BASELINE.md). Security changes before the earliest verified capture are unknown.

## 20260103192131-7c807d1b → 20260227071834-18cc5114

[Detailed changes](diffs/20260103192131-7c807d1b--20260227071834-18cc5114.md) · [Readable patch](diffs/20260103192131-7c807d1b--20260227071834-18cc5114.patch)

1 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 98 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+6/-8); synthetic input (+3/-3); sessions/authentication (+8/-7); placement cooldown/rate (+9/-15); permissions/moderation (+3/-5). Static observations; review source evidence. Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise).
Account and access: changed object.goBackFromCaptcha, changed runCaptchaAction; Canvas and placement: removed Everyday, you have a chance to earn one of the following daily reward: 3 coins - 26.8, removed drawBrushFrame; Guilds and social features: added /api/get-lovemail.php, added item.notification.lovemail; Store and inventory: added item.notification.lovemail, removed Everyday, you have a chance to earn one of the following daily reward: 3 coins - 26.8

- Added endpoint literal `/api/get-lovemail.php`

## 20260227071834-18cc5114 → 20260524052024-c5d5ffa7

[Detailed changes](diffs/20260227071834-18cc5114--20260524052024-c5d5ffa7.md) · [Readable patch](diffs/20260227071834-18cc5114--20260524052024-c5d5ffa7.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 97 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+3/-5); synthetic input (+3/-3); sessions/authentication (+4/-5); placement cooldown/rate (+20/-13); permissions/moderation (+9/-9). Static observations; review source evidence. Removed obfuscator guard features and implementation fingerprint unchanged.
Account and access: changed requestCaptcha, changed runCaptchaAction; Canvas and placement: added /pps - Toggle pixels per second display (shown while holding space), added Pixels per second display disabled; Guilds and social features: added chat.report.message, changed canvasRenderer.loadFriends; Store and inventory: changed canvasRenderer.loadFreeCoins, changed canvasRenderer.loadUserItems

## 20260524052024-c5d5ffa7 → 20260824144436-501ca950

[Detailed changes](diffs/20260524052024-c5d5ffa7--20260824144436-501ca950.md) · [Readable patch](diffs/20260524052024-c5d5ffa7--20260824144436-501ca950.patch)

2 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 98 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+6/-6); synthetic input (+4/-5); sessions/authentication (+4/-4); client integrity/bot detection (+4/-0); placement cooldown/rate (+14/-9); permissions/moderation (+12/-7). Static observations; review source evidence. Removed obfuscator guard features and implementation fingerprint unchanged.
Account and access: added /api/xauth.php?client=, changed object.goBackFromCaptcha; Canvas and placement: changed animateWeaponEffect, changed applyPixelBatch; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: changed canvasRenderer.loadFreeCoins, changed canvasRenderer.loadUserItems

- Added endpoint literal `/api/post-sess.php`
- Added endpoint literal `/api/xauth.php?client=`

## 20260824144436-501ca950 → live

[Detailed changes](diffs/20260824144436-501ca950--live.md) · [Readable patch](diffs/20260824144436-501ca950--live.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 94 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+7/-4); synthetic input (+4/-2); sessions/authentication (+8/-7); placement cooldown/rate (+14/-12); permissions/moderation (+4/-5). Static observations; review source evidence. Removed obfuscator guard features and implementation fingerprint unchanged.
Canvas and placement: changed animateWeaponEffect, changed applyPixelBatch; Guilds and social features: added #guild .edit-guild-desc, added #guild .edit-guild-desc; Store and inventory: changed canvasRenderer.loadFreeCoins, changed canvasRenderer.loadUserItems; Realtime and connection handling: changed connectRealtime

## Coverage and limits

Only the exact `/js/script.min.js` pathname on pixelplace.io/www.pixelplace.io is in scope, with every indexed query string. This is not a crawl of vendor bundles, other JavaScript paths, or unarchived releases. Automatic names are inferred/aligned and can need editorial review; they are not recovered author names. The obfuscator bootstrap is deliberately removed; application networking/UI code is structurally checked. No live application/backend flow is executed. Original notice headers are retained.
