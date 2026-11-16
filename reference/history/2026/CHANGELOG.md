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

## 20260103192131-7c807d1b → 20260227071834-18cc5114

[Detailed changes](diffs/20260103192131-7c807d1b--20260227071834-18cc5114.md) · [Readable patch](diffs/20260103192131-7c807d1b--20260227071834-18cc5114.patch)

1 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 98 named implementations changed.

- Added endpoint literal `/api/get-lovemail.php`

## 20260227071834-18cc5114 → 20260524052024-c5d5ffa7

[Detailed changes](diffs/20260227071834-18cc5114--20260524052024-c5d5ffa7.md) · [Readable patch](diffs/20260227071834-18cc5114--20260524052024-c5d5ffa7.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 97 named implementations changed.

## 20260524052024-c5d5ffa7 → 20260824144436-501ca950

[Detailed changes](diffs/20260524052024-c5d5ffa7--20260824144436-501ca950.md) · [Readable patch](diffs/20260524052024-c5d5ffa7--20260824144436-501ca950.patch)

2 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 98 named implementations changed.

- Added endpoint literal `/api/post-sess.php`
- Added endpoint literal `/api/xauth.php?client=`

## 20260824144436-501ca950 → live

[Detailed changes](diffs/20260824144436-501ca950--live.md) · [Readable patch](diffs/20260824144436-501ca950--live.patch)

0 endpoint literals added, 0 removed; 0 outgoing events added, 0 removed; 94 named implementations changed.

## Coverage and limits

Only the exact `/js/script.min.js` pathname on pixelplace.io/www.pixelplace.io is in scope, with every indexed query string. This is not a crawl of vendor bundles, other JavaScript paths, or unarchived releases. Automatic names are inferred/aligned and can need editorial review; they are not recovered author names. The obfuscator bootstrap is deliberately removed; application networking/UI code is structurally checked. No live application/backend flow is executed. Original notice headers are retained.
