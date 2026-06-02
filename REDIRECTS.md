# Boulder Biologics — 301 Redirect Plan

Handoff doc for the deployment of the redesigned site. The new pages **replace** the live versions, but use cleaner URL slugs. Every old live URL needs a 301 redirect to its replacement so we preserve SEO equity (backlinks, page authority, search-result rankings).

## Redirect map

| Old (live) URL | New URL | Why | Notes |
|---|---|---|---|
| `/stem-cell-therapy` | `/long-covid` | Live page was the Long COVID / post-viral indication, now correctly slugged | Highest-traffic redirect — preserve carefully |
| `/stem-cell-therapy-3` | `/tbi-cte` | Live "stem-cell-therapy-3" was TBI/CTE | |
| `/stem-cell-therapy-4` | `/medical-applications-other` | Live "stem-cell-therapy-4" was pulmonary/cardiac/GI/neuro | |
| `/fda-guidlines` ⚠️ | `/fda-guidelines` | **Typo fix** — live URL is missing the "e" in "guidelines" | New URL adds the missing letter |
| `/mesenchymal-stem-cells-mscs` | *(unchanged — same URL)* | Slug already SEO-strong; content updated in place | No redirect needed, but content has changed — submit URL for re-crawl |

## Slugs we are keeping (no redirect needed)

These URLs are unchanged between live and redesigned site:

- `/` (homepage)
- `/prp`
- `/longevity`
- `/faq`
- `/contact`
- `/mesenchymal-stem-cells-mscs` (keep — strong SEO slug)

If any of the PRP family pages, EPAT, prolotherapy, or facilities pages are migrating to new slugs, add them to the redirect map.

## New URLs (sitemap-only — no redirect needed)

These pages didn't exist on the live site — they are new additions in the redesign. They need to be added to `sitemap.xml` on deploy and submitted for indexing in Google Search Console, but no 301 redirect applies.

| New URL | Page | Notes |
|---|---|---|
| `/learn` | Patient education hub | Collection page; links to the four explainers below |
| `/is-stem-cell-therapy-fda-approved` | Patient explainer | High-volume search target; Glowney byline |
| `/autologous-vs-donor-derived-stem-cells` | Patient explainer | Regulatory positioning; clinic-evaluation checklist |
| `/mesenchymal-stromal-vs-stem-cells` | Patient explainer | Terminology shift; ISCT/Caplan framing |
| `/jason-glowney-md` | Physician bio | E-E-A-T page; Physician JSON-LD |


## Implementation

### If on Squarespace

Settings → Advanced → URL Mappings. Syntax:

```
/stem-cell-therapy -> /long-covid 301
/stem-cell-therapy-3 -> /tbi-cte 301
/stem-cell-therapy-4 -> /medical-applications-other 301
/fda-guidlines -> /fda-guidelines 301
```

One rule per line. Test each in incognito after saving.

### If on Wix

Settings → SEO Tools → URL Redirect Manager. Add each as "Permanent (301)". UI is one-at-a-time.

### If on WordPress

Use the **Redirection** plugin (free) or **Yoast Premium**. Add each as source → target, type 301. Avoid editing `.htaccess` manually unless you're comfortable with it — easier to manage redirects in the plugin UI.

### If on a custom server with nginx

Add to the server block:

```nginx
location = /stem-cell-therapy        { return 301 /long-covid; }
location = /stem-cell-therapy-3      { return 301 /tbi-cte; }
location = /stem-cell-therapy-4      { return 301 /medical-applications-other; }
location = /fda-guidlines            { return 301 /fda-guidelines; }
```

### If on Apache (`.htaccess`)

```apache
RewriteEngine On
Redirect 301 /stem-cell-therapy /long-covid
Redirect 301 /stem-cell-therapy-3 /tbi-cte
Redirect 301 /stem-cell-therapy-4 /medical-applications-other
Redirect 301 /fda-guidlines /fda-guidelines
```

### If on Netlify / Vercel

Create or edit `_redirects` (Netlify) or `vercel.json`:

```
# Netlify _redirects
/stem-cell-therapy    /long-covid                     301
/stem-cell-therapy-3  /tbi-cte                        301
/stem-cell-therapy-4  /medical-applications-other     301
/fda-guidlines        /fda-guidelines                 301
```

## Post-deployment checklist

After the redirects go live:

1. **Test each redirect in incognito** — load the old URL, confirm it 301s to the new one (the browser address bar should change). Use `curl -I https://boulderbiologics.com/stem-cell-therapy` to verify the status code is `301` and the `Location:` header points to the new URL.
2. **Update sitemap.xml** to list ALL of the new URLs — both the redirected ones (`/long-covid`, `/tbi-cte`, `/medical-applications-other`, `/fda-guidelines`) AND the brand-new ones from the "New URLs" section above (`/learn`, the three explainers, `/jason-glowney-md`). Drop the old `/stem-cell-therapy*` URLs from the sitemap. Submit the updated sitemap to Google Search Console and Bing Webmaster Tools.
3. **Submit each new URL for indexing** in Search Console: URL Inspection → "Request Indexing". Prioritize the four redirected URLs and the homepage; do the new Learn pages and bio as a second batch.
4. **Audit external backlinks.** Use Search Console → Links report (or ahrefs/Semrush if available). Reach out to any high-authority sites linking to the old `/stem-cell-therapy*` URLs and ask them to update to the new URLs. The 301 will pass equity automatically, but direct links are stronger.
5. **Check Google My Business** — if the GMB profile points to `/stem-cell-therapy` as a service page, update to `/long-covid` or wherever the most relevant new URL is. (Probably either the homepage or `/cellular-therapy`.)
6. **Internal nav links** — make sure no internal links on the live site point to the old URLs. (Our new pages are already clean — verified.)
7. **Schema.org JSON-LD** — the structured-data blocks on the new pages reference the new URLs. No action needed unless the live host pre-processes structured data.
8. **301 monitoring** — set up a Search Console alert for "Coverage > Error" to catch any 404s from old URLs being missed in the redirect map.

## What to expect after deployment

- **First 2–4 weeks:** Google will re-crawl. Old URLs disappear from results; new URLs take their place. Rankings may dip briefly (1–3 positions) — this is normal during URL migration.
- **By 4–8 weeks:** equity should be fully passed; rankings recover or improve. The cleaner URLs are a small positive ranking signal on their own.
- **Long-term:** anyone with the old URLs bookmarked or shared (email signatures, old printed materials, partner sites) will land on the right page via the 301. The redirects should stay in place **permanently** — do not remove them later.

## Open questions for hosting/IT

Send these to whoever runs the deployment:

1. What platform is `boulderbiologics.com` hosted on? (Squarespace, Wix, WordPress, custom?)
2. Is there access to `.htaccess`, nginx config, or a redirect manager in the CMS?
3. Are there any other live URLs not in the table above that should be updated? (e.g., `/cellular-therapy` if it exists, any old blog posts referencing `/stem-cell-therapy/...` subpaths)
4. Where is the current sitemap.xml served from, and who has access to update it?
