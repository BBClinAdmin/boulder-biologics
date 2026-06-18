# DESIGN-SYNC.md — keeping Claude Design in sync with this repo

**Purpose.** This repo (`BBClinAdmin/boulder-biologics`) and the upstream **Claude Design**
project (the Claude.ai Project that produces the `claude_code_handoff N/` exports) have
**diverged**. Design regenerates each export from its own context + the copy it reads from
`boulderbiologics.com`; it does **not** merge into the repo, it overwrites. This file is the
single record of every repo-only divergence so it can be (a) respected when cherry-picking a
new export, and (b) **pasted into the upstream Claude.ai Project's instructions/knowledge** so
future exports stop regressing the repo.

> **Maintain this file on every manual repo change** that Design wouldn't know about, then
> paste the relevant entries into the Claude.ai Project. Last updated: **2026-06-18.**

---

## How the two sides sync (read first)

| Change type | Auto-syncs back to Design? | Action required |
|---|---|---|
| **Copy / content** (text edits, removed sections) | ✅ *eventually* — Design re-reads `boulderbiologics.com` as copy source-of-truth | **Get Netlify live at the domain.** Until then the live `.com` is the OLD Squarespace site, so a Design re-sync pulls *stale* copy. |
| **Structure / deploy / conventions** | ❌ never — exists only in the repo | **Tell the Project manually** (entries below). |

**Working rule going forward:** the **repo is the source of truth.** Use Design only to author
net-new pages/visuals, then **cherry-pick** into the repo (as done with the mFAT flow-cytometry
figures). Do **not** rsync/deploy a raw export over the repo — it regresses everything below.

---

## 1. Structural / deploy / conventions — Design is unaware; will NEVER auto-sync

These MUST be encoded in the Claude.ai Project so exports match the repo's shape:

- **Root-structured, not `pages/`.** All HTML + `_*.css/_*.js` partials live at repo root.
  `assets/` is a sibling.
- **Relative paths everywhere** (`assets/…`, `_nav.css`, `cellular-therapy.html`). Do **not**
  use leading-slash `/assets` or extensionless internal links. (Reason: the repo must also work
  under the `bbclinadmin.github.io/boulder-biologics/` subpath staging. `404.html` is the one
  intentional root-absolute exception, kept for Netlify.)
- **Host = Netlify; canonical = apex** `https://boulderbiologics.com` (NOT `www`). Canonicals,
  `og:url`, `sitemap.xml`, and `robots.txt` all use apex.
- **Deploy-layer files that the export must never overwrite/delete:** `netlify.toml`
  (pretty URLs + www→apex 301 + all SEO 301s), `404.html`, `robots.txt`, `sitemap.xml`
  (hand-maintained), `screenshots/`, `PROJECT_GUIDELINES.md`, `SEO-NOTES.md`, `MOBILE-NAV.md`,
  `CNAME` (if present), and **this file**.
- **Page renames** (the export still ships the old names):
  - `msc.html` → **`mesenchymal-stem-cells-mscs.html`** (canonical `/mesenchymal-stem-cells-mscs`)
  - `facilities.html` → **`our-clinic.html`** (canonical `/our-clinic`)
- **`--r-sm: 6px`** token added to `_v2-service.css :root` (export omits it; `.disease-grid li`
  on the MSC page uses it).
- **Patient documents are hosted IN-REPO under `assets/docs/`**, not linked to the old
  Squarespace `/s/…` URLs:
  - Post-cellular-therapy → `assets/docs/post-cellular-therapy-instructions.pdf`
  - Post-PRP → `assets/docs/post-prp-instructions.pdf`
  - (Remaining `/s/…` links — intake/financial/responsibility forms — were **removed**, see §2.)
- **SEO head tags added repo-side** that older exports omit: `og:url` on all indexable pages,
  `apple-touch-icon` sitewide, `og:image` on `fda-guidelines`.
- **Sitewide mobile-overflow audit (2026-06-18).** Every page was loaded in a 375px viewport
  and checked for horizontal overflow; 14 pages had it. Root cause across the board: page-specific
  grids/components defined inline with **no mobile breakpoint** (the design exports ship desktop
  grids only). Fixed per page — collapse breakpoints added to: `index` (team-card header stacks so
  the fixed 180px photo stops squeezing the specialty chips; `.faq__head--ruled`), the 4 condition
  pages (hide the wide "Schedule" header button on mobile), `epat` (cadence strip + `.tech-specs`
  220px rows stack), `longevity` (4-up stat/journey strips), `plasma-eyedrops`/`prp-eyedrops`
  (compare grid), `prp-ha`/`prp-protein` (component + evidence-row grids), `contact` &
  `patients` (label/value rows stack — fixed-width label column + unbreakable email token were
  overflowing). **Result: 0 horizontal overflow on all 35 pages at 375px (verified).** New pages
  from Design will likely reintroduce this — any inline multi-column grid needs a mobile collapse.
- **Mobile nav drawer transparency** fixed in `_theme-dark.css`. The dark-theme rule
  `.site-header nav { background: transparent }` (meant for the desktop inline nav) also hit the
  `_nav.css` mobile dropdown, so the open hamburger drawer was see-through and page content bled
  through the links. Added a `@media max-width:1024px` rule giving `.site-header nav.nav--open` a
  solid `#0a1726` surface.
- **Homepage hero cell glow** re-anchored on mobile in `_theme-dark.css` (`@media max-width:960px`).
  The desktop `.hero__cell` uses `background-position: 14% 42%`; on the tall stacked mobile hero
  that 42%-down glow drifted below the headline (landing by the trust marks), so it's re-anchored
  to `50% 4%` / `150% auto` to sit behind the H1. Desktop unchanged.
- **Service-template mobile responsiveness** added to `_v2-service.css` (960px + 600px
  breakpoints). The export ships `_v2-service.css` with responsive rules for the header ONLY —
  the hero (`.svc-hero__grid`, defined inline per page) and every content grid (`.two-col`,
  `.candidacy-grid`, `.cond-strip`, `.steps-h`, `.v-spec .stat-strip`, `.related-grid`,
  `.refs ol`, `.final-cta .inner`, `.cta-form .row`, `.site-footer__cols`) never collapse, so on
  phones the hero "At a glance" card (fixed 130px label column) overflows and is cut off. The
  repo adds the collapse block; the inline hero/related grids are overridden via descendant
  selectors to win the cascade. **Any new service page must carry the same hero collapse** (or the
  Project's service template must bake the breakpoints into `_v2-service.css`).

## 2. Content / copy — will auto-sync once Netlify is LIVE; stale until then

Encode these in the Project too, so an export generated *before* go-live doesn't reintroduce them:

- **`patients.html` — three sections removed:**
  - "Tracking your progress" / **Outcome questionnaires** (WOMAC knee, WOMAC hip/pelvis/SI,
    QuickDASH shoulder) — gone, incl. its hero jump-link + metadata mentions.
  - **EPAT Therapy Instructions** packet card — gone (footer link to `epat.html` stays).
  - "Before your first visit" / **Patient forms** section (New Patient Intake, Financial
    Responsibility, Patient Responsibility) — gone, incl. its hero jump-link.
  - Remaining packets: **Post-Cellular Therapy** + **Post-PRP** only (both now in-repo PDFs).
- **Contact email standardized to `info@boulderbiologics.com`** everywhere (legal pages no
  longer use `Admin@BoulderBiologics.com`).
- **Phone form-field placeholder** = real number `720-550-6175` (was a fake `(303) 555-0140`).
- **Hydrodissection service name** unified to **"LD-PRP Hydrodissection"** sitewide.
- **4 flow-cytometry figures** added on `orthobiologics.html`
  (`ortho-fig1-bma/fig2-bmac/fig3-res/fig4-table.webp`).

## 3. Compliance rule that lives upstream (already flagged)

- **ADIPOSE / mFAT exception** must be pasted into the upstream Project's `CLAUDE.md`: adipose/mFAT
  copy is framed ONLY as autologous structural/cushioning tissue transfer with same-procedure
  mechanical processing — never tied to named diseases, "stem cell"/SVF/MSC language, or
  "regenerative/repair/anti-inflammatory" claims; do not pull the live `.com` adipose copy
  verbatim. (Repo `mfat.html` is already compliant.)

---

## Still open (not a divergence — outstanding work)

- **6 hero images** still missing (render empty until dropped into `assets/images/`):
  `mfat-hero`, `plasma-eyedrops-hero`, `prp-eyedrops-hero`, `prp-ha-hero`,
  `prp-hydrodissection-hero`, `prp-protein-hero`.
- **Netlify go-live**: connect repo, set apex domain, point DNS — this is also what makes the §2
  copy changes flow back to Design automatically.

---

## Change log (repo-only edits Design hasn't seen)

| Date | Commit | Change |
|---|---|---|
| 2026-06-15→16 | `5331be6` `6352cb7` `259babe` `a1c2aeb` | Netlify migration: root structure, relative paths, renames, `netlify.toml` (www→apex + 301s), `404.html`, apex canonical, SEO head fixes |
| 2026-06-16 | `2e92d3c` | mFAT copy brought inside 361 HCT/P boundary |
| 2026-06-18 | `454bbf1` | 4 flow-cytometry figures; `--r-sm` token |
| 2026-06-18 | `17fd6ee` | email → `info@…com`; real phone placeholder |
| 2026-06-18 | `02e4049` | patients: remove "Tracking your progress" |
| 2026-06-18 | `3ddfc9c` `cf9d08a` | patients: post-cellular PDF hosted in-repo (+ `.com` fix) |
| 2026-06-18 | `1010586` | patients: post-PRP PDF hosted in-repo |
| 2026-06-18 | `31e86aa` | patients: remove EPAT card |
| 2026-06-18 | `87d6cfd` | patients: remove "Before your first visit" forms section |
| 2026-06-18 | _this commit_ | `_v2-service.css`: add mobile breakpoints (960/600) — fixes hero card cut off on phones + collapses all service-page content grids |
