# SEO evaluation & handoff — for Claude Design

Evaluated 2026-06-02 against the June 1 export (23 pages). Target production
domain: **https://www.boulderbiologics.com** (canonicals already point there).

## Overall

Technically strong. Rich JSON-LD (Physician, MedicalBusiness, MedicalProcedure,
FAQPage, BreadcrumbList, MedicalScholarlyArticle), 100% image alt coverage,
single H1 on 22/23 pages, `lang="en"` + viewport everywhere, canonical/OG/Twitter
on nearly all pages. The items below are gaps, not a rebuild.

## Must be fixed in Claude Design (page content — exports overwrite manual edits)

1. **The 6 condition pages are not individually indexable.** `condition.html` is a
   single client-side template driven by `?c=knee`, `?c=shoulder`,
   `?c=hip-back-si`, `?c=tendon-ligament`, `?c=concussion-tbi`, `?c=long-covid`.
   All six share one URL, one title, no per-condition description/canonical, and
   inject content via JS. These are the highest-intent local searches
   ("knee stem cell therapy Boulder") and are effectively invisible to search.
   **Make them real static pages** with their own title/description/canonical/H1
   and JSON-LD, like `prp.html` / `epat.html` already are.

2. **`condition.html` is the one page missing the standard `<head>` SEO block** —
   no meta description, canonical, robots, OpenGraph, or JSON-LD, and it has
   **two H1s**. (Same root cause as #1 — it's a template, not a finished page.)

3. **Meta descriptions are all too long** (180–257 chars; Google shows ~155).
   Tighten each to ~150 chars, front-loading the primary phrase.

4. **A few `<title>`s exceed ~60 chars and will truncate in SERPs** — notably
   `index.html` (109), `facilities.html` (86), `epat.html` (84). Trim to ≤60.

5. **`og:image` is the logo on every page.** Per-page hero images would make
   social/link-preview shares much stronger. Also: only 15–16 pages have OG /
   Twitter tags — add the full set to the ~7 pages missing them (contact,
   facilities, msc, long-covid, tbi-cte, medical-applications-other, condition).

## Handled outside Design (deploy-only files — see project deploy notes)

- **`robots.txt`** and **`sitemap.xml`** were added directly to the deploy repo on
  2026-06-02 (they aren't part of Design exports). Sitemap lists the 22 canonical
  clean-slug URLs; `condition.html` is excluded. If Design starts emitting a
  sitemap, reconcile to avoid two sources of truth.

## Launch checklist (deployment, not Design)

- **`CNAME`**: add a `CNAME` file containing `www.boulderbiologics.com` to the
  GitHub Pages repo **only once DNS is pointed at GitHub** — adding it earlier
  breaks the `bbclinadmin.github.io` staging URL. (Note: production host is still
  open per REDIRECTS.md — Squarespace/Wix/WordPress are mentioned. If production
  is NOT GitHub Pages, CNAME/robots/sitemap there are handled by that platform
  instead.)
- **Clean URLs**: canonicals use `/prp`, `/our-clinic`, etc., but the files live
  at `/pages/prp.html`. GitHub Pages serves files at their literal path, so the
  clean URLs won't resolve without rewriting/restructuring. Resolve before launch.
- **apex → www redirect**: canonicals use `www`; ensure `boulderbiologics.com`
  301-redirects to `www.boulderbiologics.com`.
- **301s**: implement the redirect map in `REDIRECTS.md` to preserve SEO equity.
- Submit `sitemap.xml` in Google Search Console after launch.
