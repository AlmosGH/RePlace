# UI direction

## Feel

A quiet, precise creative workspace: a large pixel canvas, warm artwork, dark neutral chrome, a mint/cyan accent, generous spacing, readable labels, subtle borders, and very restrained motion. Keep the artwork crisp with nearest-neighbor rendering.

Reference: the user-provided PixelPlace screenshots. Create original branding and components. RePlace should feel like a new product with familiar controls.

## Desktop composition

| Position | Element | Behavior |
| --- | --- | --- |
| Full viewport | Canvas | Pixel placement and cursor-centered pan/zoom |
| Top left | RePlace / current painting | Open searchable canvas drawer; show dimensions and mode |
| Top right | Connection/account status | Distinguish local, connecting, live, offline, and reconnecting |
| Left edge | Pencil, pan, eyedropper, grid, settings | Tooltips, active states, keyboard shortcuts |
| Right edge | Color palette | Fixed palette with selected color and hex value |
| Bottom left | Collapsible painting chat | Readable timestamps, channel selector, unread badge, send/error states |
| Bottom center/left | Coordinates / pixel inspector | Current pixel, optional author/history, protection status |
| Bottom right | Zoom and fit | Accessible buttons plus current zoom |
| Drawer or dialog | Paintings, profiles, guilds, settings | Keep context; focus management and Escape-to-close |

In the local starter, a compact introduction occupies the future chat area. The community drawer labels future features rather than simulating messages or participants.

## Mobile composition

- Canvas occupies the viewport below a compact painting header.
- Palette becomes a bottom tray with touch targets of at least 44 × 44 CSS pixels in the public version.
- One-finger drag pans; two-finger pinch zooms. A deliberate tap previews/places according to the selected placement mode, without drawing during a pan gesture.
- Chat, painting browser, profiles, and settings use bottom sheets; only one sheet is active.
- Account/status details collapse; zoom and selected color remain reachable.
- Respect safe-area insets and dynamic viewport height.

The starter has a responsive compact palette and pointer-based panning. Full pinch gestures, the bottom-tray palette, focus-managed sheets, and mobile interaction QA are M1/M2 work.

## UI tokens

| Token | Initial value |
| --- | --- |
| App background | `#11171d` |
| Raised panel | `#1c252d` |
| Primary text | `#eef2f2` |
| Secondary text | `#99aab6` |
| Accent | `#8ce3d3` |
| Panel border | White at 7–10% opacity |
| Panel radius | 14 px |
| Control radius | 7–9 px |
| UI font | System sans; evaluate a self-hosted font later |
| Artwork palette | 32 explicit colors, independent of UI tokens |

## Required interaction states

- Placement: ready → pending → accepted or rejected, with cooldown timing based on server state.
- Socket: connecting → live → reconnecting/offline; disable submission while unsynchronized.
- Protected pixel: show why placement is blocked and how to request access when applicable.
- Canvas switch: loading → snapshot applied → live; discard stale events from the prior painting.
- Forms: dirty, saving, saved, field errors, permission denied, request timeout.
- Chat: sending, sent, failed/retry, rate limited, muted, reported.
- Palette: selected state must have an outline/icon and accessible name, not color alone.

## Accessibility and performance

Keyboard shortcuts must not fire while typing in forms or chat. Visible focus, semantic controls, screen-reader status announcements, text alternatives, reduced-motion support, and sufficient contrast are baseline requirements. Public placement also needs a keyboard-accessible coordinate/placement control, because a visual canvas alone is insufficient.

Do not create a DOM node per pixel. Keep pixel buffers in the rendering engine; update UI reactively only for tools, selection, metadata, and connection state. Batch canvas rendering to animation frames once realtime traffic is added.
