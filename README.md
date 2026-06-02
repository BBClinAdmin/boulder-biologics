# Boulder Biologics — Design System

A research-rooted brand system for **Boulder Biologics**, a Boulder, Colorado clinic delivering advanced autologous orthobiologic and regenerative-medicine therapies for orthopedic, longevity, and neurological applications.

This system is the kit-of-parts a designer (or AI design agent) uses to produce on-brand patient education, slides, marketing pages, presentations, intake forms, and clinical literature without re-deriving voice, palette, or visual rules each time.

---

## What Boulder Biologics is

> **Regenerate** — *Latin, regeneratus, "created again," from re- + generare, "to create."*

Boulder Biologics is a physician-led clinic specializing in **autologous orthobiologics** — therapies that use a patient's own biologic material (bone marrow aspirate, blood-derived platelets, growth factors) to support endogenous repair of musculoskeletal tissue. They are *not* a "stem cell clinic" of the colloquial / oversold variety; they sit firmly on the **research-and-regulation-aligned** side of the regenerative-medicine market, and that posture shapes everything about the brand voice.

### Two entities, one brand family

The Boulder Biologics brand spans a clinical practice and a sister research organization. Designs should be visually consistent across both, but the **content posture differs**: clinical copy speaks to patients and follows the FDA-guidance lexicon; research copy speaks to investigators, partners, and the scientific community and can use the technical register of a trials program.

| Entity                                                             | URL                                  | Role                                                                                                            | Audience                                                  |
| ------------------------------------------------------------------ | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Boulder Biologics Medical Clinic**                               | `boulderbiologics.com`               | The clinical practice. Patient-facing autologous orthobiologic, longevity, and medical-applications care.       | Patients, referring physicians.                           |
| **Boulder Biologics Research Center** (formerly Apeiron Research Center) | `boulderbiologics.org` *(forthcoming)* | Non-profit sister organization. Clinical-trials research of cellular therapies; advances the evidence base behind the clinic's work. | Investigators, trial participants, partners, donors, press. |

> ⚠️ **Rebrand in progress.** The research center is currently Apeiron Research Center and will rebrand to **Boulder Biologics Research Center** with the `.org` domain. Until cutover, any artifact that references the research arm should use the new name and flag the transition with a short footnote ("formerly Apeiron Research Center") if context warrants. Once you have the new `.org` logo lockup, drop it into `assets/` and we'll add a second logo card to the Brand group.

### Services / surfaces represented in this system

- **Orthopedics** — Autologous Orthobiologic Therapy, Platelet-Rich Plasma (PRP), PRP + Protein-Rich Plasma, PRP + Hyaluronic Acid for knee OA, Low-Density PRP & Hydrodissection, Prolotherapy, EPAT (Extracorporeal Pulse Activation Technology).
- **Longevity** — emerging-field longevity medicine covering epigenetics, metagenomics, cardiometabolic biomarkers, hormone replacement, neurodegeneration, mitochondrial dysfunction, sleep, and diet.
- **Medical Applications** — Mesenchymal Stem Cells (MSCs), Long COVID, Traumatic Brain Injury & CTE, and other systemic conditions.
- **Patient surfaces** — patient portal, WOMAC Knee / Hip / SI intake forms, QDASH shoulder form.

### Sources consulted while building this system

> ⚠️ The brief shipped with a single asset (a logo). Everything else here was synthesized from the public marketing site and the brand voice description provided by the user. If you have access to the Squarespace CMS, internal patient-facing PDFs, or Figma, **drop them into the project and ping the designer** so the system can be re-grounded against real artifacts.

- `uploads/BBClin Logo Text Stacked.png` — the only attached asset. Copied to `assets/logo-stacked.png`.
- Public website: <https://www.boulderbiologics.com/> — used for content, service list, voice samples.
- Clinic tour page: <https://www.boulderbiologics.com/our-clinic> — clinic environment, photo style cues.
- Brand brief (provided): "Informed, professional, and confidence inspiring, but also approachable and caring."

### Team

- **Jason Glowney, MD** — founder and sole physician of the clinic; also founder of the **Boulder Biologics Research Center** (the non-profit research affiliate, formerly Apeiron Research Center).
- **Ryan Shiling, NP** — Nurse Practitioner, joining soon. Until he starts, all patient-facing copy should attribute clinical work to Dr. Glowney only.
- Located on the Boulder Community Health Foothills Campus, Boulder, Colorado.

### Surfaces by entity

When building anything new, pick the entity first — it sets voice and content priors.

**Boulder Biologics Medical Clinic** (`.com`)
- Marketing pages for each service line (Orthopedics, Longevity, Medical Applications)
- Patient portal, WOMAC / QDASH intake forms
- Patient education one-pagers and consent flows
- Referral collateral for outside physicians

**Boulder Biologics Research Center** (`.org`, formerly Apeiron Research Center)
- Trials overview / current-studies page
- Per-trial detail pages (eligibility, protocol summary, IRB/sponsor info)
- Participant screening and consent flows
- Investigator-facing pages, publications, and partner / donor pages
- Press kits and scientific posters

> The two surfaces share the same color, type, spacing, and component systems. The research center can lean slightly more on the **mono + serif** accents (lab data, citations, methods) and slightly less on the patient-warmth lever — see the Voice section below.

---

## How to read this folder

```
.
├── README.md                  ← you are here
├── SKILL.md                   ← Agent-Skill front-matter, also human-readable
├── colors_and_type.css        ← all design tokens (CSS variables + semantic classes)
├── assets/                    ← logos, marks, brand textures, sample imagery
├── preview/                   ← Design-System-tab card HTMLs (palette, type, components…)
├── ui_kits/
│   └── website/               ← marketing-site React/JSX recreation
└── slides/                    ← (not included — no slide template was provided)
```

---

## Content fundamentals

**Voice in one line:** *Informed, scientifically literate, and confidence-inspiring — but never sterile. Warm enough for a patient in pain, rigorous enough for a referring physician.*

### Tone dials

| Dial            | Setting                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| Authority       | High — citations, anatomy, mechanism are present but never gatekept.    |
| Warmth          | Medium-high — the clinic treats people in pain; copy acknowledges that. |
| Marketing-y     | Low — no "transform your life," no exclamation points.                  |
| Hype            | Zero — explicitly anti-hype around "stem cells."                        |
| Casual / slang  | None.                                                                   |
| Emoji           | None. Ever. (See Iconography.)                                          |

### Person & address

- **"We"** for the clinic, **"you"** for the patient, **"Dr. Glowney"** when attributing clinical action. (Add **"Ryan Shiling, NP"** once he's onboarded; until then, avoid plural attributions like "our physicians.") Never "I."
- Patients are *patients*, not "clients," not "members," not "guests."
- Procedures are described from a clinical-decision-making point of view, then translated to patient impact. Example: "Image-guided delivery is employed to optimize anatomic accuracy, procedural safety, and reproducibility."

### Casing

- **Headlines**: Sentence case for editorial copy; **ALL CAPS** is reserved for two specific patterns: (1) the BOULDER BIOLOGICS wordmark, (2) high-emphasis service banners (e.g. `WE OFFER ADVANCED ORTHOBIOLOGICS`).
- **Buttons & UI labels**: Title Case or Sentence case ("Schedule a Consultation", "Patient portal").
- **Eyebrows / kickers**: UPPERCASE with letter-spacing (`tracking-widest`) — used to label sections like `OUR SERVICES`, `THE SCIENCE`, `FOR PATIENTS`.
- **Body**: Sentence case. Acronyms (PRP, BMA, MSC, EPAT, CTE) are spelled out on first reference, then abbreviated.

### Lexicon & guard-rails

These are non-negotiable. The clinic operates within FDA guidance and the copy reflects that:

- ✅ **Use:** "autologous biologic therapy," "patient-derived," "mesenchymal stromal cell–containing," "endogenous repair," "image-guided," "evidence-informed," "FDA-guidance-aligned," "support tissue repair."
- ❌ **Avoid:** "stem cell cure," "regrowth guaranteed," "miracle," "anti-aging" (without context), "reverse aging," "cell replacement therapy" (unless precisely meant).
- 🌀 **Soften with hedges where outcomes are claimed:** "may provide meaningful benefit," "supports endogenous repair processes," "we caution that these results are the exception."

### Sentence shape

- Long, syntactically complete sentences are fine — preferred, even — when explaining mechanism. The clinic's voice tolerates a 40-word sentence the way a journal article does.
- Pair every dense paragraph with a short summary line in plain language. Density is fine; opacity is not.

### Example copy

- Hero: **"We offer advanced orthobiologics, including adult mesenchymal stem cell therapy, platelet-rich plasma (PRP), nerve hydrodissection, prolotherapy, and other services."**
- Eyebrow → Headline: `THE SCIENCE BEHIND OUR SERVICES` → *Clinical MSC enumeration by flow cytometry*
- Caveat caption: *"This is an example of a patient's results from PRP therapy at Boulder Biologics. We caution that these results are the exception and would not be expected in more advanced/diffuse arthritis patients…"*
- CTA: **"Schedule a consultation"** / *"To inquire about consultations, please call our office at 1-720-550-6175."*

---

## Visual foundations

### Logo

The wordmark is a **stacked, all-caps geometric sans** ("BOULDER / BIOLOGICS") in deep navy, paired with a **half-brain / molecular-network glyph** drawn as connected nodes that fade from bright teal at the top to deep brand blue at the bottom. The negative-space half of the circle is closed with a single thin arc. The mark reads simultaneously as **neuroanatomy** (brain hemisphere) and as a **molecular / cell network** — both are true to the clinic.

### Color

- **Brand palette is teal → blue → navy**, sampled directly from the logo gradient. Teal `#04979d` is the **accent / energy** color; deep blue `#15457a` is the **trust / depth / primary** color; navy `#07172a` is the **text** color.
- **Neutrals are warm**, not cool. The page background is a soft bone (`#fbfaf7`), not pure white — pure-white surgical sterility is intentionally avoided. This is the brand's "approachable and caring" lever.
- **Status colors are muted and clinical** — no neon greens or candy reds. Success is forest-green; warning is amber-ochre; danger is brick.
- Tokens live in `colors_and_type.css` (`--bb-teal-500`, `--bb-blue-500`, `--bb-navy-500`, etc.) and semantic aliases (`--color-bg`, `--color-fg`, `--color-accent`).

### Type

- **Display: Barlow** (Bold/ExtraBold) — geometric, condensed-feeling at heavy weights, mirrors the logotype's strength.
- **Body: Source Sans 3** — quiet, readable, neutral in a way that lets the science breathe.
- **Editorial accent: Source Serif 4** — for pull quotes, etymology, patient-story moments. Used sparingly.
- **Mono: IBM Plex Mono** — lab figures, dosages, identifiers (e.g. `PRP-A2 · 5×10⁹/mL`).
- Display headings use **tight letter-spacing** (`-0.015 → -0.03em`); eyebrows use **wide letter-spacing** (`0.16em`). Body uses no tracking.

> ⚠️ **Font substitution note.** No font files were provided with the brief. Both Barlow and Source Sans 3 are loaded from Google Fonts as proximate matches to the wordmark and body type. If the clinic has a licensed brand font (Squarespace site appears to use a wordmark drawn in a Montserrat-family geometric sans), please attach the original `.woff2` files and we'll swap them into `fonts/` and update `colors_and_type.css`.

### Spacing & layout

- 4-pixel base grid: `--space-1` (4) … `--space-10` (128).
- Generous vertical rhythm — sections breathe at 64–128px on desktop. Density at content level (within a card or list) tightens to 16–24px.
- Long-form pages use a single editorial column (max ~680px) for body copy; service-overview pages use a 12-column grid with content at columns 2–11.
- Cards are framed by **air**, not by heavy borders.

### Backgrounds

- **Default surface:** warm bone (`--bb-bone-50`).
- **Section break:** soft stone (`--bb-bone-100`) or a single **brand gradient** band (teal → blue, top-to-bottom) for hero / closer moments. The gradient is used **at most twice per page** — never as a card background, never under body copy.
- **Full-bleed clinical imagery:** real photography of the clinic, ultrasound scans, before/after MRI plates. Photography is **warm-cool balanced, lightly desaturated, sharp** — never moody, never high-contrast / "luxury wellness."
- No repeating patterns. No hand-drawn illustration. No textures.

### Borders, radii, shadows

- **Radii:** 8px for inputs/buttons (`--radius-md`), 14–20px for cards (`--radius-lg / xl`), pill (999) only for tags and the floating CTA. Avoid 4px or sharp corners on big surfaces — feels too utilitarian.
- **Borders:** 1px, in `--color-border` (a warm 8% navy). Used as a *quiet boundary*, never as a colored highlight. **No colored left-border accent cards.**
- **Shadows:** soft, navy-tinted (never neutral black). Five steps from `--shadow-xs` to `--shadow-xl`. Cards lift at `--shadow-md`; modals and key CTAs at `--shadow-lg`. Inner shadows (`--shadow-inset`) used on inputs and pill controls for a tactile edge.

### Motion

- **Easing:** `cubic-bezier(0.2, 0.7, 0.2, 1)` for almost everything — confident, no bounce. Emphasized variant for hero entrances only.
- **Durations:** 140 / 220 / 420ms. Default to 220.
- **Anims used:** fade-and-rise on scroll-in, opacity hovers, gentle width-grow on focus rings. No parallax. No bounces. No springs. **No celebratory micro-interactions** — this is a medical clinic.

### States

- **Hover:** swap to the next color step (`--bb-teal-500` → `--bb-teal-600`), 220ms. Links pick up the teal underline-on-hover. Cards lift one shadow step.
- **Press / active:** subtle 1px translate-Y, no scale. Color steps down one more.
- **Focus:** 3px teal halo at 35% alpha (`--shadow-focus`). Always visible; never `outline: none` without replacement.
- **Disabled:** 40% opacity, no cursor change.

### Transparency / blur

- Used **only** for sticky navigation: `backdrop-filter: saturate(140%) blur(12px)` over a `rgba(251, 250, 247, 0.75)` bone background.
- Not used on cards, not used on overlays. The brand reads "clean and confident," not "frosted UI."

### Imagery direction

- Photography palette: warm-neutral whites, natural daylight, navy/teal medical equipment as natural color punctuation.
- People: real patients (with consent) and real clinicians, mid-interaction. Not stock-medical handshake imagery. Not athletes-mid-jump fitness imagery.
- Scientific imagery (microscopy, MRI, ultrasound): present **as-is**, with a tasteful caption. Do not colorize or stylize. Caption with hedged language (see "Lexicon").

---

## Iconography

Boulder Biologics has **no proprietary icon set** that's visible on the public site. To keep the system honest:

- **Primary icon library: Lucide** — loaded from CDN. Stroke-based, 1.5–2px weight, rounded line caps. The stroke style matches the modernist-medical voice better than filled or duotone alternatives. We chose Lucide because its rhythm is calm and its anatomical / measurement / shield icons cover medical use cases without leaning "wellness-app cute."
- **Stroke weight:** **1.75px** at 24px size. **Color:** `var(--color-fg)` for inline icons, `var(--color-accent)` for the rare brand-emphasis case.
- **No emoji.** No unicode-character icons. No flag emoji even in language switchers.
- **Anatomy / procedure imagery:** when an icon won't carry the meaning (e.g. "subchondral autologous biologic therapy"), reach for a **labeled diagram** or a **clinical photograph**, not a stylized SVG. Custom-drawn anatomical glyphs may be commissioned later; until then, leave a labeled placeholder rather than improvise.
- **Brand glyph (the half-brain / molecular network from the logo)** is used by itself only in very small contexts: favicon, app icon, social-avatar. It is not redrawn or recolored. Live in `assets/logo-mark.svg` / `assets/logo-stacked.png`.

> ⚠️ **Icon substitution note.** Lucide is a *substitution*, not an official Boulder Biologics decision. If you've licensed Phosphor, Streamline-medical, or have illustrated a clinic-owned set, drop the SVGs in `assets/icons/` and tell the agent — the system will swap.

---

## Index — files in this folder

| File / folder              | What's in it                                                          |
| -------------------------- | --------------------------------------------------------------------- |
| `README.md`                | This file. Brand context, voice, foundations.                         |
| `SKILL.md`                 | Agent-Skill manifest. Cross-compatible with Claude Code skills.       |
| `colors_and_type.css`      | All design tokens + semantic typography classes.                      |
| `assets/logo-stacked.png`  | Master stacked logotype (supplied by client).                         |
| `assets/`                  | (Logos and any future brand imagery.)                                 |
| `preview/`                 | Card HTMLs that populate the Design System tab.                       |
| `ui_kits/website/`         | Marketing-site recreation: components + `index.html` click-through.   |

---

## How to use this system

- Building a static asset (slide, one-pager, social card)? Pull tokens from `colors_and_type.css`, copy a logo from `assets/`, write with the voice rules above.
- Building a screen or web flow? Start in `ui_kits/website/` — the components there are pixel-tuned recreations of the live site and can be re-composed.
- Producing patient-education copy? Read the **Content fundamentals** section in full before drafting. The lexicon guard-rails (no "stem cell cure," etc.) are *not* optional — they reflect FDA-guidance posture.

Open the Design System tab for a visual tour of the tokens and components.
