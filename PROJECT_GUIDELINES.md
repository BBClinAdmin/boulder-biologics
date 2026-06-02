# Boulder Biologics — Project Notes

## Source of truth for content

**boulderbiologics.com is the source of truth.** Before writing or rewriting any patient-facing copy, pull the corresponding live page (via `web_fetch` or `web_search` on `boulderbiologics.com`). Do not invent voice from scratch and do not paraphrase off-the-cuff.

Key live pages:
- `boulderbiologics.com/` (homepage)
- `boulderbiologics.com/stem-cell-therapy` — cellular therapy + Long COVID framing
- `boulderbiologics.com/stem-cell-therapy-4` — extended regulatory/FDA framing
- `boulderbiologics.com/fda-guidlines` — full HCT/P regulatory text (note the typo in the live URL)
- (Add others as encountered)

## Two kinds of copy

1. **Regulatory / FDA-adjacent passages** → copy **verbatim** from the live site. These include:
   - "Stem cell" terminology disclaimers
   - Autologous vs allogeneic / donor-derived framing
   - FDA-approval status statements (Long COVID, intranasal delivery, etc.)
   - Investigational-nature and informed-consent language
   - HCT/P and 21 CFR 1271-adjacent statements

   When in doubt, treat as regulatory and copy verbatim.

2. **Patient-facing clinical copy** → softened from the live site for readability. The live site often runs dense ("paracrine signaling, immunomodulation, support of local repair environments"); we keep the meaning but make it patient-readable ("cell-to-cell signaling and modulation of inflammation — supporting your body's own repair").

## Voice

Plain, clinical, slightly understated. Confident but not boastful. Short declarative sentences. The model is the live site: "Image-guided delivery is employed to optimize anatomic accuracy, procedural safety, and reproducibility." — clinical but not florid.

**Avoid:**
- Writerly / meta-commentary headings. No "In the careful, hedged language the science supports," no "A precise, careful definition," no "Where autologous orthobiologics earn their place." Headings state what the section is about: "What cellular therapy actually is.", "Conditions we most commonly treat.", "Frequently asked, plainly answered."
- Colloquialisms and idiom: no "that won't quit," "no pressure," "is for you" as a section title. Stay declarative.
- Rhetorical triplets as headings ("Sterility, viability, traceability.") — pick one clear thing to say.
- Editorializing the patient's situation negatively ("Not everyone is a fit"). Frame positively or as collaborative ("A consultation is where we figure it out together").
- Inventing claims, statistics, or outcomes that aren't on the live site.
- AI-slop tropes: gradient backgrounds, emoji, decorative SVG illustrations of medical concepts unless explicitly part of the live brand.

**Lean toward:**
- Direct address — "your bone marrow," "your imaging," "your history."
- Parenthetical plain-English for jargon — "your own fat tissue" beside or in place of "adipose tissue."
- Acknowledging the patient's frame: "A consultation is how we figure that out."
- Concrete numbers from the live site (durations, follow-up windows, recovery timelines).

## Editing process

When the user asks for a content edit or sweep:

1. **Don't bulk-rewrite.** I did this earlier with FAQ rewrites and CTA microcopy and it produced off-voice work the user had to flag back to me.
2. **Pull live copy first** for the section in question.
3. **Show side-by-side in chat** before touching files: live-site language → current page → proposed edit. Mark regulatory passages explicitly.
4. **Wait for per-item approval.** User responds with `OK` / alternative / `keep current`. Apply only what's approved.
5. **Apply approved edits in one pass**, then summarize briefly.

## Component conventions established

- **Top navigation** (in every production page's `.site-header nav`) is, in order: Services · Conditions · Cellular Therapy · PRP · Longevity · Our Team · FDA Guidelines · FAQ. Footer "Clinic" column mirrors Our Team → FDA Guidelines → FAQ. New top-level pages should be added to every production page's nav at once.
- **Candidacy section** (`section` containing `.candidacy-grid`) uses two columns: `.cand-col.is-yes` (Likely a fit list) on the left, `.cand-col.is-cta` (navy CTA card with heading, body, Schedule + Call buttons) on the right. The standalone `.mid-cta` strip below the candidacy section has been removed across all pages — do not re-introduce it. CTA styles live in `pages/_v2-service.css` under `.cand-col.is-cta`.
- **Wireframe versions** (`pages/wireframes/V2 Condition Overview.html` etc.) mirror the same pattern — keep in sync with the production pages.
