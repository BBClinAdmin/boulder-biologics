# Screenshots — Boulder Biologics handoff

Reference captures of seven key pages at 1440px-equivalent width. These show the intended rendered state of the production HTML files in `../pages/`.

| File | Page | What to look for |
|---|---|---|
| `01-homepage.png` | `index.html` | Hero, services pillars, "Wait — is this stem cell therapy?" accordion, team cards |
| `02-cellular-therapy.png` | `cellular-therapy.html` | Anchor service page — hero with at-a-glance facts panel, regulatory disclaimer callout, candidacy CTA, FAQ |
| `03-learn-hub.png` | `learn.html` | Patient education hub — 4 article cards + "About these explainers" note |
| `04-learn-fda-approved.png` | `is-stem-cell-therapy-fda-approved.html` | A Learn explainer in full — navy "Direct answer" card, verbatim regulatory blocks (cream-yellow), TOC, FAQ, references |
| `05-glowney-bio.png` | `jason-glowney-md.html` | Physician bio — credentials chips, 4:5 striped headshot placeholder, training table, philosophy pull-quote, selected writing list |
| `06-long-covid.png` | `long-covid.html` | Highest-regulatory-risk service page — investigational hero strip, mechanism cards, full FDA disclosure section |
| `07-faq.png` | `faq.html` | Full FAQ with jump-band, 7 topic blocks, 57 Q&A items |

## Notes

- Screenshots reflect the state of the HTML at handoff. Any image placeholders (`.img-slot`, `.bio-photo` with striped pattern) need real photography on deploy.
- The cream-yellow `.reg-verbatim` blocks visible in screenshot 04 are deliberate — they mark passages copied **verbatim** from the live site's regulatory framing. Do not paraphrase these when editing.
- The dotted underline on Dr. Glowney's name in bylines (visible across Learn pages and on `learn.html`) links to the bio page at `jason-glowney-md.html`.
