# Mobile navigation — for Claude Design to fold into the source

**Status:** Added post-export on 2026-06-02 and deployed to GitHub Pages. These
changes live *outside* the Design source, so **the next export will overwrite
them** unless the fix is incorporated upstream. This note is the handoff for
doing that.

---

## The problem

The exported site had no working mobile navigation:

- **`index.html` and `condition.html`** — the primary nav is set to
  `display:none` below 960px with **no replacement**. On a phone the header
  showed only the logo and the "Contact" button; the 10 nav links were
  unreachable except via the footer.
- **All other pages** (those using `_v2-service.css` or `_shared.css`) — the nav
  *wraps* into several centered rows under the logo below 1024px. Functional but
  cluttered on a phone.

Root cause: **the header is not centralized.** Header CSS is duplicated across
inline `<style>` blocks (`index`, `condition`), `_v2-service.css` (~20 pages),
and `_shared.css` (`faq`), each with its own breakpoint (960px vs 1024px). There
was nowhere to add the menu *once*.

## The fix that shipped (reference implementation)

Two new files, linked into every page and **loaded last** so they override the
per-page header rules by cascade order + specificity:

- `pages/_nav.css` — a `.nav-toggle` hamburger button and a dropdown panel.
  Below 1024px the inline `<nav>` collapses; opening it adds `.nav--open`, which
  shows the nav as a full-width dropdown anchored under the header. Uses
  design-system CSS vars with **hard fallbacks** so it works no matter which
  stylesheet a page loads.
- `pages/_nav.js` — progressive-enhancement toggle: sets `aria-expanded`, closes
  on Escape (returns focus), on outside-click, and after a link is tapped;
  clears the open state if the viewport grows back past 1024px.

Per page, three insertions (anchors are uniform across all 23 pages):

```html
<!-- before  <nav aria-label="Primary">  -->
<button class="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false">
  <span class="nav-toggle__bar"></span>
  <span class="nav-toggle__bar"></span>
  <span class="nav-toggle__bar"></span>
</button>

<!-- before </head> -->
<link rel="stylesheet" href="_nav.css" />

<!-- before </body> -->
<script src="_nav.js" defer></script>
```

Verified in-browser at 375px on both CSS variants (inline `index`, shared
`_v2-service` via `epat`): button shows, opens a clean full-width dropdown with
all links, animates to an X, and desktop (>1024px) restores the original inline
nav.

## What we'd like Design to do (the durable fix)

1. **Centralize the site header** into one shared stylesheet + one shared
   script, instead of three duplicated copies with two different breakpoints.
2. **Build the hamburger menu into that shared header** so it ships in every
   export by default. The `pages/_nav.css` / `pages/_nav.js` in this folder are a
   working reference — adopt them as-is or reimplement against the consolidated
   header.
3. Standardize on a **single mobile breakpoint** (we used 1024px) for the nav.

Once Design ships a built-in mobile menu, `_nav.css` / `_nav.js` and these
per-page insertions can be dropped.
