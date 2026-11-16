# Observed Pixelplace script changes in 2024

These are capture-to-capture observations, not release dates or a complete release history. Query parameter names/values are preserved, never used to infer chronology. The live snapshot is separate from Internet Archive captures.

Discovery: complete for the recorded CDX queries. Indexed captures: 18. Verified unique snapshots: 15.

| Snapshot | Query | Result | Readable source |
| --- | --- | --- | --- |
| 20240105150336 | ?v3=84239 | verified | [source](versions/20240105150336-9905fee5.js) |
| 20240106030339 | ?v3=84239 | verified (duplicate content) | [source](versions/20240105150336-9905fee5.js) |
| 20240203101739 | ?v3=84246 | verified | [source](versions/20240203101739-e846e96d.js) |
| 20240205142924 | ?v3=84249 | verified | [source](versions/20240205142924-20e11ca2.js) |
| 20240221181413 | ?v3=84262 | verified | [source](versions/20240221181413-592e3265.js) |
| 20240223002627 | ?v3=84262 | verified (duplicate content) | [source](versions/20240221181413-592e3265.js) |
| 20240320231312 | ?v3=84262 | verified (duplicate content) | [source](versions/20240221181413-592e3265.js) |
| 20240403065209 | ?v3=84269 | verified | [source](versions/20240403065209-fef54496.js) |
| 20240416012013 | ?v3=84270 | verified | [source](versions/20240416012013-c9ea73d0.js) |
| 20240509012635 | ?v3=84279 | verified | [source](versions/20240509012635-e6a9c6fd.js) |
| 20240603205833 | ?v3=84310 | verified | [source](versions/20240603205833-8bb1eff9.js) |
| 20240616214036 | ?v3=84321 | verified | [source](versions/20240616214036-47e79884.js) |
| 20240711205621 | ?v3=84329 | verified | [source](versions/20240711205621-277ccc0a.js) |
| 20240817191018 | ?v3=84336 | verified | [source](versions/20240817191018-15e0b060.js) |
| 20240904191930 | ?v3=84345 | verified | [source](versions/20240904191930-8a5afc76.js) |
| 20241105043106 | ?v3=84346 | verified | [source](versions/20241105043106-5c0982e6.js) |
| 20241117110809 | ?v3=84348 | verified | [source](versions/20241117110809-4b0fe246.js) |
| 20241202215905 | ?v3=84352 | verified | [source](versions/20241202215905-ca289ef5.js) |

Snapshots are sorted by capture timestamp, even when a later capture has a lower version number. Failed captures are not silently skipped: any comparison spanning one is a comparison of the available verified snapshots only.

[Initial observed baseline](BASELINE.md). Security changes before the earliest verified capture are unknown.

## 20240105150336-9905fee5 → 20240203101739-e846e96d

[Detailed changes](diffs/20240105150336-9905fee5--20240203101739-e846e96d.md) · [Readable patch](diffs/20240105150336-9905fee5--20240203101739-e846e96d.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 96 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+6/-7); synthetic input (+5/-3); sessions/authentication (+9/-8); placement cooldown/rate (+14/-11); permissions/moderation (+8/-8). Static observations; review source evidence. Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise).
Account and access: changed object.goBackFromCaptcha, changed requestCaptcha; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.centerPositionTo; Guilds and social features: added .april-connected > div > a[data-id="guild"], changed canvasRenderer.loadFriends; Store and inventory: added .april-connected .coins-infos span, added .april-connected .coins-infos span

## 20240203101739-e846e96d → 20240205142924-20e11ca2

[Detailed changes](diffs/20240203101739-e846e96d--20240205142924-20e11ca2.md) · [Readable patch](diffs/20240203101739-e846e96d--20240205142924-20e11ca2.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 84 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+3/-3); sessions/authentication (+3/-3); placement cooldown/rate (+18/-12); permissions/moderation (+5/-6). Static observations; review source evidence. Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise).
Account and access: changed runCaptchaAction; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.checkProtectionFromPainting; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: added shopDropdownCallback, removed toggleInventory

## 20240205142924-20e11ca2 → 20240221181413-592e3265

[Detailed changes](diffs/20240205142924-20e11ca2--20240221181413-592e3265.md) · [Readable patch](diffs/20240205142924-20e11ca2--20240221181413-592e3265.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 93 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+2/-3); synthetic input (+3/-3); sessions/authentication (+4/-5); placement cooldown/rate (+16/-18); permissions/moderation (+7/-7). Static observations; review source evidence. Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise).
Account and access: changed runCaptchaAction; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.centerPositionTo; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: added toggleInventory, removed shopDropdownCallback

## 20240221181413-592e3265 → 20240403065209-fef54496

[Detailed changes](diffs/20240221181413-592e3265--20240403065209-fef54496.md) · [Readable patch](diffs/20240221181413-592e3265--20240403065209-fef54496.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 87 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+8/-5); synthetic input (+1/-1); sessions/authentication (+5/-4); placement cooldown/rate (+14/-19); permissions/moderation (+9/-7). Static observations; review source evidence. Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise).
Account and access: changed requestCaptcha; Canvas and placement: changed canvasRenderer.centerPositionTo, changed canvasRenderer.checkDuplicateFromPainting; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: changed canvasRenderer.loadFreeCoins, changed canvasRenderer.loadUserItems

## 20240403065209-fef54496 → 20240416012013-c9ea73d0

[Detailed changes](diffs/20240403065209-fef54496--20240416012013-c9ea73d0.md) · [Readable patch](diffs/20240403065209-fef54496--20240416012013-c9ea73d0.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 87 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+3/-6); synthetic input (+3/-3); sessions/authentication (+6/-5); placement cooldown/rate (+12/-7); permissions/moderation (+5/-7). Static observations; review source evidence. Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise).
Account and access: changed runCaptchaAction; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.centerPositionTo; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: changed canvasRenderer.loadUserItems, changed canvasRenderer.useItem

## 20240416012013-c9ea73d0 → 20240509012635-e6a9c6fd

[Detailed changes](diffs/20240416012013-c9ea73d0--20240509012635-e6a9c6fd.md) · [Readable patch](diffs/20240416012013-c9ea73d0--20240509012635-e6a9c6fd.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 86 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+2/-2); synthetic input (+2/-2); sessions/authentication (+4/-4); placement cooldown/rate (+16/-13); permissions/moderation (+11/-8). Static observations; review source evidence. Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise).
Account and access: changed runCaptchaAction; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.centerPositionTo; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: changed canvasRenderer.loadFreeCoins, changed canvasRenderer.loadUserItems

## 20240509012635-e6a9c6fd → 20240603205833-8bb1eff9

[Detailed changes](diffs/20240509012635-e6a9c6fd--20240603205833-8bb1eff9.md) · [Readable patch](diffs/20240509012635-e6a9c6fd--20240603205833-8bb1eff9.patch)

0 endpoint literals added, 0 removed; 1 outgoing events added, 0 removed; 84 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+8/-5); synthetic input (+1/-1); sessions/authentication (+6/-7); placement cooldown/rate (+11/-13); permissions/moderation (+6/-9). Static observations; review source evidence. Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise).
Account and access: changed object.goBackFromCaptcha, changed requestCaptcha; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.centerPositionTo; Guilds and social features: added refreshFriendsList, changed canvasRenderer.loadFriends; Store and inventory: changed canvasRenderer.loadFreeCoins, changed canvasRenderer.loadUserItems

- Added outgoing event `users.profile`

## 20240603205833-8bb1eff9 → 20240616214036-47e79884

[Detailed changes](diffs/20240603205833-8bb1eff9--20240616214036-47e79884.md) · [Readable patch](diffs/20240603205833-8bb1eff9--20240616214036-47e79884.patch)

1 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 89 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+4/-4); synthetic input (+3/-5); sessions/authentication (+7/-7); placement cooldown/rate (+16/-11); permissions/moderation (+11/-4). Static observations; review source evidence. Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise).
Account and access: added #form-account-appeal, added .box-content[data-id="login"] #form-account-login; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.centerPositionTo; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: changed canvasRenderer.loadFreeCoins, changed canvasRenderer.loadUserItems

- Added endpoint literal `/api/post-appeal.php`

## 20240616214036-47e79884 → 20240711205621-277ccc0a

[Detailed changes](diffs/20240616214036-47e79884--20240711205621-277ccc0a.md) · [Readable patch](diffs/20240616214036-47e79884--20240711205621-277ccc0a.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 84 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+4/-7); synthetic input (+4/-2); sessions/authentication (+6/-5); placement cooldown/rate (+11/-11); permissions/moderation (+7/-8). Static observations; review source evidence. Removed obfuscator guards: removed obfuscator domain restriction.
Account and access: added #submit-account-appeal, added Your account is permanently banned from the chat, please contact moderators by creati; Canvas and placement: removed Your account is permanently banned from the chat, please contact moderators on discor, changed animateWeaponEffect; Guilds and social features: added Your account is permanently banned from the chat, please contact moderators by creati, removed Your account is permanently banned from the chat, please contact moderators on discor; Store and inventory: changed canvasRenderer.loadFreeCoins, changed canvasRenderer.loadUserItems

## 20240711205621-277ccc0a → 20240817191018-15e0b060

[Detailed changes](diffs/20240711205621-277ccc0a--20240817191018-15e0b060.md) · [Readable patch](diffs/20240711205621-277ccc0a--20240817191018-15e0b060.patch)

1 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 99 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+7/-4); synthetic input (+3/-5); sessions/authentication (+3/-3); placement cooldown/rate (+11/-18); permissions/moderation (+8/-10). Static observations; review source evidence. Removed obfuscator guard features and implementation fingerprint unchanged.
Canvas and placement: removed .display-my-painting-list, removed .my-paintings-list; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: changed canvasRenderer.loadFreeCoins, changed canvasRenderer.loadUserItems; Realtime and connection handling: changed canvasRenderer.disconnectUser, changed connectRealtime

- Added endpoint literal `/api/post-favorite.php`

## 20240817191018-15e0b060 → 20240904191930-8a5afc76

[Detailed changes](diffs/20240817191018-15e0b060--20240904191930-8a5afc76.md) · [Readable patch](diffs/20240817191018-15e0b060--20240904191930-8a5afc76.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 90 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+12/-5); synthetic input (+5/-3); sessions/authentication (+4/-4); placement cooldown/rate (+20/-13); permissions/moderation (+9/-7). Static observations; review source evidence. Removed obfuscator guard features and implementation fingerprint unchanged.
Account and access: added #recaptchaCF, added #recaptchaCFLogin; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.centerPositionTo; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: changed canvasRenderer.loadUserItems, changed canvasRenderer.useItem

## 20240904191930-8a5afc76 → 20241105043106-5c0982e6

[Detailed changes](diffs/20240904191930-8a5afc76--20241105043106-5c0982e6.md) · [Readable patch](diffs/20240904191930-8a5afc76--20241105043106-5c0982e6.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 89 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+6/-10); synthetic input (+2/-2); sessions/authentication (+6/-7); placement cooldown/rate (+13/-13); permissions/moderation (+9/-12). Static observations; review source evidence. Removed obfuscator guard features and implementation fingerprint unchanged.
Account and access: changed requestCaptcha, changed runCaptchaAction; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.centerPositionTo; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: removed toggleInventory, changed canvasRenderer.loadUserItems

## 20241105043106-5c0982e6 → 20241117110809-4b0fe246

[Detailed changes](diffs/20241105043106-5c0982e6--20241117110809-4b0fe246.md) · [Readable patch](diffs/20241105043106-5c0982e6--20241117110809-4b0fe246.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 94 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+9/-9); synthetic input (+2/-4); sessions/authentication (+7/-6); placement cooldown/rate (+11/-11); permissions/moderation (+4/-4). Static observations; review source evidence. Removed obfuscator guard implementation differs; detected guard features are unchanged (possibly obfuscation noise).
Account and access: changed object.goBackFromCaptcha, changed requestCaptcha; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.centerPositionTo; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: added toggleInventory, changed canvasRenderer.loadFreeCoins

## 20241117110809-4b0fe246 → 20241202215905-ca289ef5

[Detailed changes](diffs/20241117110809-4b0fe246--20241202215905-ca289ef5.md) · [Readable patch](diffs/20241117110809-4b0fe246--20241202215905-ca289ef5.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 87 named implementations changed.

Security/anticheat: candidates include CAPTCHA (+8/-5); synthetic input (+2/-2); sessions/authentication (+7/-8); placement cooldown/rate (+11/-15); permissions/moderation (+7/-4). Static observations; review source evidence. Removed obfuscator guard features and implementation fingerprint unchanged.
Account and access: changed object.goBackFromCaptcha, changed requestCaptcha; Canvas and placement: changed animateWeaponEffect, changed canvasRenderer.centerPositionTo; Guilds and social features: changed canvasRenderer.loadFriends, changed canvasRenderer.loadGuildMembers; Store and inventory: removed toggleInventory, changed canvasRenderer.loadFreeCoins

## Coverage and limits

Only the exact `/js/script.min.js` pathname on pixelplace.io/www.pixelplace.io is in scope, with every indexed query string. This is not a crawl of vendor bundles, other JavaScript paths, or unarchived releases. Automatic names are inferred/aligned and can need editorial review; they are not recovered author names. The obfuscator bootstrap is deliberately removed; application networking/UI code is structurally checked. No live application/backend flow is executed. Original notice headers are retained.
