# Image drop folder

Files placed here are auto-resolved by `assets/image-loader.js` against
every `[data-img-id]` slot in `pages/`.

## Naming

`<slot-id>.<ext>` — extensions tried in order: `avif`, `webp`, `jpg`, `jpeg`, `png`.

Examples:
- `prp-hero.jpg` → fills the slot `data-img-id="prp-hero"` on `pages/prp.html`
- `facilities-room-01.webp` → fills room 01 on `pages/facilities.html`
- `index-doc-portrait.jpg` → fills Dr. Glowney's portrait section on `pages/index.html`

## Source of truth for slot IDs

See `pages/_image-inventory.html` — every slot is listed with its slug,
the page it lives on, the section, intended subject, aspect ratio, and
fill status.

## Tips

- Match the aspect ratio listed in the inventory (the loader uses
  `object-fit: cover`, so off-ratio images will be cropped).
- Prefer `webp` for photos, `avif` if you can — both fall back to `jpg`/`png`.
- Per-slot tuning is available via `data-img-fit` (`cover` | `contain`) and
  `data-img-position` (any CSS `object-position` value) on the slot itself.
