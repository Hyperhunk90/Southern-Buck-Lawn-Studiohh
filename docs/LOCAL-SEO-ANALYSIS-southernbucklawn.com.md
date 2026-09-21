# Local SEO Analysis — southernbucklawn.com

_Generated with the `seo-local` skill (v2.3.1). Audit date: 2026-09-21. Source: full site codebase (schema, NAP, service/location pages, metadata) + live site._

## Local SEO Score: 84 / 100

| # | Dimension | Weight | Score | Notes |
|---|-----------|--------|-------|-------|
| 1 | GBP Signals | 25% | 21/25 | Correct primary category, map + reviews on page, real photos. GBP posts/Q&A live-status not verifiable from code. |
| 2 | Reviews & Reputation | 20% | 17/20 | 5.0★, now **10** Google reviews (hits Sterling Sky "magic 10"). `aggregateRating` intentionally omitted (review-integrity policy). |
| 3 | Local On-Page SEO | 20% | 19/20 | Dedicated service pages, city in title+H1, NAP visible, non-doorway location pages, `tel:` + map. |
| 4 | NAP Consistency & Citations | 15% | 12/15 | NAP consistent across page/schema. Tier-1 citations linked (Google, Yelp, BBB, Facebook). Bing/Apple not confirmed. |
| 5 | Local Schema | 10% | 9/10 | `LocalBusiness` + `Landscaper` subtype, address/geo/hours/priceRange, homepage-only. `geo` at 4 decimals (recommend 5+). |
| 6 | Local Link & Authority | 10% | 6/10 | BBB profile + social `sameAs`. No detectable Chamber / "best of" / press signals. |

## Business type & vertical
- **Type:** Service-Area Business with a physical base (hybrid-SAB). Real address (28790 Brett Dr, Walker, LA 70785) but service-delivered; site correctly avoids "come visit the shop."
- **Vertical:** Home Services (lawn care / landscaping). Signals: service area, "free estimate," insured, no-price-list-per-lot.

## NAP consistency audit
Consistent across all three sources checked — **no discrepancies**:
- **Name:** Southern Buck Lawn
- **Address:** 28790 Brett Dr, Walker, LA 70785
- **Phone:** (225) 369-4434 / +12253694434 (`tel:` click-to-call present)

Sources compared: visible page HTML (contact page + footer), `LocalBusiness` JSON-LD (`BusinessJsonLd.tsx`), and `SITE` config (`src/data/site.ts`).

## Reviews health
- 5.0★, **10** total Google reviews (updated from 9 this pass — now meets the 10-review credibility threshold).
- 4 independently verified customer reviews reproduced on-page; family review correctly excluded from customer display and from Review JSON-LD.
- Multi-platform presence linked: Google, Yelp, BBB, Facebook.
- **Deliberate policy:** no `aggregateRating`/first-party `review` schema (protects against self-serving markup + family-review issue). This forgoes review rich-result stars but is the correct integrity call for this business.

## Local schema status
`LocalBusiness` + `Landscaper` subtype (homepage-only), with `name`, `address` (PostalAddress), `geo`, `telephone`, `email`, `priceRange`, `openingHoursSpecification`, `areaServed` (Walker, Denham Springs, Watson), `founder`, `foundingDate`, `hasMap`, `sameAs`. `Service` JSON-LD on each service page; `FAQPage` on service/area pages. Clean and valid.

## Location page quality
Passes the RicketyRoo swap test — **not doorway pages**. Each area page (Walker, Denham Springs, Watson, Livingston Parish, Baton Rouge) has unique soil notes, pest notes, and local FAQs; Baton Rouge is honestly framed as selective/on-route, not a metro doorway.

## Top prioritized actions
1. **[Done this pass]** Correct Google review count to 10 (credibility threshold). — Critical
2. **[Off-site] Claim/optimize Bing Places** (powers ChatGPT, Copilot, Alexa) and **Apple Business Connect** — 3 of top-5 AI-visibility factors are citation-related. — High
3. **[Off-site] Review velocity:** keep new Google reviews landing inside the 18-day cadence (rankings cliff after ~3 weeks with none). — High
4. **[Code, optional] `geo` precision:** raise lat/lng to 5+ decimals once exact coordinates are confirmed (avoid fabricating precision). — Medium
5. **[Off-site] Local authority:** pursue Livingston Parish Chamber of Commerce membership + a "best of Livingston Parish lawn care" style listing (#1 AI-visibility citation factor). — Medium
6. **[Off-site] Data aggregators:** submit to Data Axle, Foursquare, Neustar for downstream citation distribution. — Medium
7. **[Monitor]** Keep GBP primary category = "Lawn care service"; add relevant secondary categories in GBP (e.g., Landscaper, Lawn sprinkler system contractor only if true). — Medium

## Limitations
This audit could not assess (needs GBP dashboard / paid tools): geo-grid map-pack rank by location, GBP Insights (calls/direction requests), full backlink profile / Domain Authority, real-time local-pack position, or live GBP post/Q&A status. Tools like BrightLocal (geo-grid), Ahrefs/Semrush (links), and Whitespark (citations) can fill these gaps.
