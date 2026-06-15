# Handoff: Boulder Biologics Marketing Site

> **Latest update — 2026-06-15.** Refreshed from production for GitHub Pages deploy.
> - **The site now ships a DARK THEME as its production look.** Every page sets
>   `<html data-theme="dark">` and loads `pages/_theme-dark.css` LAST in `<head>`. That layer
>   remaps the design tokens, paints the cell-image hero/card backgrounds
>   (`assets/cell-glow.png`, `cell-orange.jpg`, `cell-platelet.jpg`, `cell-network.jpg`), and
>   fixes on-dark CTA/link colors. **All of those CSS + image files MUST ship** or pages render
>   broken/light. The light-theme base tokens still live inline per page, so removing
>   `_theme-dark.css` cleanly reverts to the old light look if ever needed.
> - **LD-PRP & Hydrodissection** (`prp-hydrodissection.html`) was moved out of the PRP family —
>   removed from the PRP subnav, relisted under **Additional Treatments / Orthopedics** on the
>   homepage, and its breadcrumb + JSON-LD now route Home › Orthopedics (not Home › PRP).
> - **fda-guidelines.html** hero eyebrow + breadcrumb: "science" → "regulations".
> - **learn.html**: MSC deep-clinical article renumbered to Article 04; BMAC "coming soon" → 05.
> - **Header "Contact" button** color unified site-wide via `--brand-accent` (the faq/legal
>   pages previously hardcoded teal).
> - **Deploy note:** when you generate `sitemap.xml`, include `/prp-eyedrops` and the four
>   orthopedic condition URLs; the dark theme does not change any URLs.
>
> _Previous update — 2026-06-09._ Refreshed from production. Changes in that push:
> - **New page — PRP Eyedrops** (`pages/prp-eyedrops.html`): autologous PRP eyedrops for
>   ocular surface disease (dry eye, persistent epithelial defects, recurrent erosion,
>   neurotrophic keratopathy, Sjögren's, post-LASIK, GVHD). Modeled on the PRP family
>   service pages — full SEO head + JSON-LD (canonical `/prp-eyedrops`), conditions strip,
>   PRP-vs-serum-vs-artificial-tears comparison, process steps, a "PRP & orthobiologics
>   practice, not an eye clinic" positioning note in the procedure section, candidacy CTA,
>   FAQ, and a **peer-reviewed references** list. Added to the **PRP family subnav** on all
>   five PRP pages and to the **footer "Orthopedics" column** site-wide. Hero image slot
>   `data-img-id="prp-eyedrops-hero"` still needs real art in `assets/images/`.
> - **Homepage** (`pages/index.html`): added an **"Eye & ocular surface"** card to the
>   "Find care for your condition" grid (→ `prp-eyedrops.html`) and an **"Eye & ocular
>   surface"** row to the **Medical Applications** service card.
> - **Deploy note:** add `/prp-eyedrops` to the production `sitemap.xml` when you generate it.
>
> _Previous update — 2026-06-01:_
> - **Prolotherapy** (`pages/prolotherapy.html`): added the SI-joint step-by-step diagram
>   (`assets/images/prolotherapy-si-steps.png`) in the "What a course of treatment looks like"
>   section; removed the "Driving home" at-a-glance row. (The diagram art was corrected — the
>   stray duplicate/misspelled "and Stabilituy" label was trimmed to "Restored Joint Stability".)
> - **Contact** (`pages/contact.html`): Office-hours card restyled to match the contact card
>   (white bg, mono label, 600 heading); contact + directions row labels switched from IBM Plex
>   Mono to Montserrat (weight 500, sentence case); hours list constrained to a centered ~380px
>   block; address block removed from hero; RTD link added to the Transit line.
> - **Team** (`pages/jason-glowney-md.html`): restored "Apeiron / Boulder Biologics Research
>   Center" in the Research Affiliation row.
> - **Facilities** (`pages/facilities.html`): removed the "4 patient rooms" chip and the
>   Logging / Self-attestation spec rows.
> - **EPAT** (`pages/epat.html`): removed the "Driving home" fact row and the Manufacturer spec row.

## Overview

A complete, multi-page marketing website for **Boulder Biologics**, a physician-led
Boulder, CO clinic offering autologous orthobiologic, longevity, and medical-applications
therapies. This package contains the full set of redesigned pages (homepage, service
pages, condition/education pages, team bio, facilities, FAQ, contact) plus the brand
system, design tokens, content/voice rules, and SEO/redirect plan.

## About the design files

The files in this bundle are **design references authored in static HTML/CSS** — they
are high-fidelity, production-intent prototypes of the finished site, not a framework
app. There is **no build step and no JavaScript framework**: each page is a standalone
HTML document with an inline `<style>` block, a few shared CSS partials, Google Fonts,
and inline SVG icons.

You have two valid paths:

1. **Ship as a static site (fastest).** The HTML is clean and deployable as-is to any
   static host (Netlify, Vercel, S3, nginx, or back into the Squarespace/CMS as custom
   blocks). Wire up the 301 redirects in `REDIRECTS.md`, drop in final imagery, done.
2. **Recreate in a component framework.** If this is going into an existing React/Vue/
   Astro/etc. codebase, treat these files as the visual + content spec and rebuild using
   that codebase's conventions, extracting the shared header/footer/CTA into components
   and the tokens in `colors_and_type.css` into the existing theme.

If no environment exists yet and the goal is a marketing site, **Astro** (or plain static
hosting) is the most natural fit — these are content pages, not an app.

## Fidelity

**High-fidelity.** Colors, typography, spacing, radii, shadows, and copy are final and
intentional. Recreate pixel-accurately. Exact values are in `colors_and_type.css` and the
per-page inline `<style>` blocks; the design rationale is in `README.md`.

## Tech stack as built

- **Pure HTML + CSS.** No bundler, no framework, no npm.
- **Fonts:** Google Fonts — **Montserrat** (display, 500–800), **Source Sans 3** (body),
  **Source Serif 4** (editorial/lede accents), **IBM Plex Mono** (eyebrows, lab figures,
  "at a glance" facts). Loaded via `<link>` in each page's `<head>`.
  > Note: the original wordmark is a Montserrat-family geometric sans; Montserrat is used
  > as the proximate match. If the clinic licenses a brand font, swap it in.
- **Icons:** inline stroke SVGs (Lucide-style, 1.75px stroke). No icon library dependency.
- **Images:** real photography lives in `assets/images/` (`.webp`/`.jpg`/`.png`). A small
  helper (`assets/image-loader.js` + `image-loader.css`) powers drag-and-drop image
  *placeholders* used during design (elements with `data-img-id` / `data-label`). **In
  production, replace any remaining placeholder slots with real `<img>` tags** pointing at
  files in `assets/images/`. The hero/featured/team/facilities images are already real.
- **SEO:** every page has a `<title>`, meta description, canonical URL, Open Graph tags,
  and JSON-LD structured data (LocalBusiness / MedicalClinic / Physician / FAQ). Keep
  these — they are tuned for the migration.

## File structure

```
claude_code_handoff/
├── HANDOFF.md                ← this file
├── index.html                ← root redirect → pages/index.html (GitHub Pages landing)
├── .nojekyll                 ← REQUIRED: lets GitHub Pages serve the _-prefixed CSS files
├── README.md                 ← brand system: voice, palette, type, foundations (READ FIRST)
├── CLAUDE.md                 ← project conventions: nav order, component patterns, copy rules
├── REDIRECTS.md              ← 301 redirect map + deploy checklist (CRITICAL for SEO)
├── colors_and_type.css       ← all design tokens (CSS variables + semantic classes)
├── assets/
│   ├── logo-stacked.png        ← master logotype (favicon / OG)
│   ├── logo-stacked-light.webp ← light gradient mark for the dark header + footer
│   ├── cell-glow.png           ← homepage hero cell glow (screen-blended)
│   ├── cell-orange.jpg         ← service hero / pillar-card cell background
│   ├── cell-platelet.jpg       ← PRP-family cell background variant
│   ├── cell-network.jpg        ← "additional treatments" cell background variant
│   ├── image-loader.css/.js    ← design-time image placeholder helper
│   └── images/                 ← real photography (hero, team, facilities, MRI/microscopy)
└── pages/
    ├── _shared.css            ← shared header/footer/base partial (faq + legal pages)
    ├── _v2-service.css        ← service-page template styles (incl. candidacy CTA card)
    ├── _learn-explainer.css   ← education/explainer article styles
    ├── _theme-dark.css        ← DARK THEME layer — loaded LAST on every page (html[data-theme="dark"]); remaps tokens, cell backgrounds, on-dark CTA colors
    ├── _nav.css / _nav.js      ← centralized responsive header / mobile nav drawer
    ├── index.html             ← Homepage
    ├── cellular-therapy.html  ← Bone Marrow Cellular Therapy (BMAC) service page
    ├── prp.html               ← Platelet-Rich Plasma
    ├── prp-ha.html            ← PRP + Hyaluronic Acid (knee OA)
    ├── prp-protein.html       ← PRP + Protein-Rich Plasma
    ├── prp-hydrodissection.html ← LD-PRP / nerve hydrodissection (under Orthopedics, not PRP)
    ├── prp-eyedrops.html      ← PRP eyedrops (ocular surface)
    ├── plasma-eyedrops.html   ← Plasma eye drops (ocular surface)
    ├── prolotherapy.html      ← Prolotherapy
    ├── epat.html              ← EPAT (pulse activation)
    ├── longevity.html         ← Longevity medicine
    ├── msc.html               ← Mesenchymal Stromal Cells (MSCs)
    ├── long-covid.html        ← Long COVID & post-viral (investigational)
    ├── tbi-cte.html           ← Traumatic Brain Injury & CTE
    ├── medical-applications-other.html ← Other systemic conditions
    ├── facilities.html        ← Clinic / lab facilities
    ├── knee-pain-arthritis.html       ← Condition: knee pain & arthritis
    ├── hip-back-si-pain.html          ← Condition: hip, back & SI joint pain
    ├── shoulder-rotator-cuff.html     ← Condition: shoulder & rotator cuff
    ├── tendon-ligament-injuries.html  ← Condition: tendon & ligament injuries
    ├── jason-glowney-md.html  ← Physician bio (E-E-A-T page)
    ├── faq.html               ← FAQ
    ├── contact.html           ← Location & contact
    ├── fda-guidelines.html    ← FDA / HCT/P regulatory page
    ├── learn.html             ← Patient education hub
    ├── is-stem-cell-therapy-fda-approved.html      ← explainer
    ├── autologous-vs-donor-derived-stem-cells.html ← explainer
    ├── mesenchymal-stromal-vs-stem-cells.html      ← explainer
    ├── hipaa.html             ← HIPAA notice (noindex)
    ├── privacy.html           ← Privacy policy (noindex)
    └── terms.html             ← Terms & conditions (noindex)
```

Pages link to each other with relative URLs (e.g. `cellular-therapy.html`) and reference
assets with `../assets/...`. **Keep `pages/` and `assets/` as siblings** or all relative
paths break.

## Shared components & conventions

These are consistent across every page — extract them first if componentizing. Full
detail is in `CLAUDE.md`:

- **Top navigation** (`.site-header nav`), in order: **Services · Conditions · Our Team ·
  Facilities · FDA Guidelines · Learn · FAQ**, with a phone number and a teal **Contact**
  button on the right. (Cellular Therapy / PRP / Longevity were intentionally removed from
  the top bar; they remain in the footer.) Add new top-level pages to every page's nav.
- **Footer** — multi-column: Orthopedics / Longevity service links, a "Clinic" column
  (Our Team → FDA Guidelines → FAQ), contact info, and logo.
- **Service-page template** (`_v2-service.css`): `.svc-hero` with a left content column +
  right **"At a glance"** facts card; chips row; primary + outline CTA buttons; a
  **candidacy section** (`.candidacy-grid`) with a "Likely a fit" list (`.cand-col.is-yes`)
  beside a navy CTA card (`.cand-col.is-cta`). Do **not** reintroduce the old `.mid-cta`
  strip — it was removed everywhere.
- **Breadcrumbs** on interior pages (`Home › Section › Page`).

## Design tokens (summary — authoritative source is `colors_and_type.css`)

- **Brand:** teal `#04979d` (accent), blue `#15457a` (primary/trust), navy `#07172a`
  (text). Sampled from the logo gradient.
- **Neutrals are warm:** page background is bone `#fbfaf7`, not pure white. Section breaks
  use a soft stone step.
- **Radii:** 8px inputs/buttons, 14–20px cards, 999px pills/tags.
- **Borders:** 1px warm-navy at ~8% — quiet boundaries, never colored accent borders.
- **Shadows:** soft, navy-tinted (never neutral black); cards lift one step on hover.
- **Spacing:** 4px base grid; sections breathe at 64–128px desktop.
- **Motion:** `cubic-bezier(0.2,0.7,0.2,1)`, 140/220/420ms, no bounce/spring.

## Content & voice (do not skip)

Patient-facing copy follows strict, FDA-guidance-aligned rules. Before editing any copy,
read the **Content fundamentals** section of `README.md` and the voice rules in
`CLAUDE.md`. Key points:

- **`boulderbiologics.com` is the source of truth** for patient copy.
- **Regulatory passages** ("stem cell" terminology disclaimers, autologous vs donor-derived
  framing, FDA-approval status, investigational-nature language, HCT/P / 21 CFR 1271
  statements) must be **verbatim** — do not paraphrase.
- Plain, clinical, understated voice. No hype, no "stem cell cure," no emoji, no gradient
  backgrounds, no decorative medical SVG illustrations.

## SEO / deployment

`REDIRECTS.md` is **required reading before launch** — the new site uses cleaner URL slugs
than the live site, so several old URLs need 301s to preserve search equity (notably
`/stem-cell-therapy → /long-covid` and the `/fda-guidlines` typo fix). It includes
platform-specific redirect syntax (Squarespace/Wix/WordPress/nginx/Apache/Netlify/Vercel)
and a post-deploy checklist (sitemap, Search Console, backlinks).

## How to run locally

It's static — no build:

```bash
cd claude_code_handoff
python3 -m http.server 8000
# open http://localhost:8000/  (root index.html redirects to pages/index.html)
```

Or just open `pages/index.html` in a browser.

## GitHub Pages

This bundle is ready to publish at a repo root:

- **`.nojekyll`** is included — without it, GitHub Pages (Jekyll) hides files/dirs that
  start with `_`, which would break `_shared.css`, `_v2-service.css`, and
  `_learn-explainer.css` and leave every page unstyled. Keep this file.
- **Root `index.html`** redirects `https://<user>.github.io/<repo>/` to `pages/index.html`
  (preserving any query/hash), so visitors landing at the root don't see a directory list.
- The six homepage **condition cards** now resolve to real static pages: the four
  orthopedic conditions (`knee-pain-arthritis.html`, `hip-back-si-pain.html`,
  `shoulder-rotator-cuff.html`, `tendon-ligament-injuries.html`) plus `tbi-cte.html`
  (concussion/TBI) and `long-covid.html`. The old client-side `condition.html?c=<slug>`
  template was removed for SEO — update any deploy `sitemap.xml` to add the four new
  canonical URLs (`/knee-pain-arthritis`, `/hip-back-si-pain`, `/shoulder-rotator-cuff`,
  `/tendon-ligament-injuries`) and drop `condition.html`.

## Suggested first steps for the developer

1. Read `README.md` (brand) and `CLAUDE.md` (conventions) end to end.
2. Decide: ship static, or rebuild in the target framework.
3. If rebuilding: port `colors_and_type.css` into the theme, then extract header/footer/
   CTA/service-template into components, then build pages content-first.
4. Replace any remaining drag-drop image placeholders with real `<img>` from
   `assets/images/`.
5. Wire up the 301 redirects and submit the updated sitemap (`REDIRECTS.md`).
