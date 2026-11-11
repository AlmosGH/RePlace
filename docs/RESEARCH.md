# PixelPlace reference research

Reviewed 12 November 2026 using the supplied screenshots and first-party PixelPlace pages. This is a product/interaction review; it does not identify their private implementation or backend stack.

## Observed reference behavior

PixelPlace combines persistent shared canvases with a painting directory, chat channels, profiles, guilds, and owner controls. Its public site describes configurable placement cooldowns, palettes, access settings, templates, and protected areas. Navigation includes drawing, drag-to-pan, wheel zoom, middle-click color picking, grid tools, keyboard shortcuts, and shareable view coordinates. The reference also includes world maps and separate artistic canvases.

The screenshots show a dominant edge-to-edge canvas, a narrow right-hand palette, compact left-side controls, chat at the lower left, and central painting/settings dialogs. The interface keeps drawing visible while discovery and configuration appear as overlays.

## Design conclusions for RePlace

These are our choices based on the reference, not additional claims about its behavior.

| Preserve | Modernize |
| --- | --- |
| Canvas is the primary workspace | Make panels compact, legible, and easy to dismiss |
| Palette stays immediately available | Use larger selection targets, clear selected color, and keyboard focus |
| Chat stays close to the canvas | Give chat its own collapsible panel with explicit channel names |
| Users can discover paintings without leaving | Use searchable cards and a side drawer with purposeful hierarchy |
| Owners control painting rules | Use grouped settings with explanations and clear permission states |
| World and art canvases coexist | Share one renderer and permission engine; swap templates/masks |
| Zoom and pixel inspection support detail work | Add cursor-centered zoom, a readable coordinate chip, and fit/reset controls |

The starter uses an original procedural landscape to establish the visual direction. World-map artwork will be generated from separately sourced geographic data. The reference screenshots are not redistributed as application assets.

## Sources

- [PixelPlace live site](https://pixelplace.io/) — navigation, painting settings, controls, and feature descriptions.
- [PixelPlace painting page](https://pixelplace.io/18929-rules-demonstration-in-10x10-areas) — painting tools and interaction tips.
- [PixelPlace updates](https://pixelplace.io/blog/?t=update-and-bug-fixes) — published changes to painting tools and moderation.
- [PixelPlace forums](https://pixelplace.io/forums/) — community and guild-related navigation.
- Five user-supplied screenshots — primary visual reference for overall composition.

## Implementation documentation checked

- [SvelteKit introduction](https://svelte.dev/docs/kit/introduction)
- [Axum documentation](https://docs.rs/axum/latest/axum/)
- [Tokio documentation](https://tokio.rs/)

Re-check dependency compatibility and pin lockfiles when package installation is available. PixelPlace features and pricing can change; this document is a dated design reference.
