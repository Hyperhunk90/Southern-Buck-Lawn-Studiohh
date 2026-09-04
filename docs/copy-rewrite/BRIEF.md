# Southern Buck Lawn — combined copy rewrite brief (2026-09-04)

## Goal
Rewrite homepage + main service pages to sound down-to-earth: Walker solo operator, not a corporate lawn template. Combine:
- `landscape-design-page.ts` → **tone + service-page depth + SEO/schema pattern** (primary voice)
- `homepage-pdf-extract.txt` / PDF → **homepage section structure + audience split + CTAs**, rewritten into the same voice

## Hard honesty rules
- Sole prop, never LLC. NAP: Southern Buck Lawn, 28790 Brett Dr, Walker, LA 70785, 225-369-4434, sbl@southernbucklawn.com
- Home turf only: Walker 70785, Denham Springs 70726, Watson 70786 (+ Livingston Parish when honest). Do not sell Baton Rouge 70816/70817 as home turf.
- Solo Michael since 2013. No “crew,” “our team,” “premium standard,” invented response times, fake reviews, or unearned licenses.
- Free estimates OK if already used sitewide. 5.0 Google only if still true on the live review count.
- Real job photos only. Honest ALT/titles. No stock/AI. Do not duplicate the same image across pages.
- No meta keywords tags. One visible H1. Merge Service schema into existing business entity — no duplicate LocalBusiness.
- Leave `/landscape-lighting` night-cinema rebuild alone (just shipped tip 741d7b6) except tiny NAP/link consistency if needed.

## Voice
Write like Michael talking to a neighbor: short sentences, concrete yard problems, “I” where it fits, South Louisiana weather/clay/humidity when relevant. Kill filler and keyword stuffing.

## Pages in scope (priority order)
1. `/` homepage — use PDF IA, rewrite all copy in TS tone
2. `/services` hub (if present)
3. `/services/landscape-design` — implement `landscape-design-page.ts` nearly as written (scrub any leftover “we” that implies a crew)
4. Other live main service pages (lawn mowing/edging, weed/fert, commercial grounds, property preservation/REO, etc.) — same voice + SEO/schema/ALT pattern as the landscape-design object
5. Shared chrome: nav/footer CTAs, common trust lines — down-to-earth, solo-honest

## Homepage direction (mixed)
- Hero: prefer something closer to PDF option 1 energy but humanized, e.g. property deserves careful work / not a rushed route cut — **without** “our team.”
- Primary CTA pattern: Request a free estimate / Get a free quote (keep forms wired to existing `/api/lead`).
- Services cards: lawn care, landscaping/beds/mulch, landscape lighting (link to existing night page), maintenance, property preservation — honest solo scope.
- Differentiator: details, consistency, local route density, lighting electrical background — not “premium vs cheap.”
- Audiences: homeowners, commercial, REO/preservation — still first-person/local.
- Process: request → talk → estimate → do the work (Michael, not a crew).
- Service area: Walker / Denham Springs / Watson only as home turf.
- FAQ: rewrite PDF FAQs into solo voice; confirm areas before promising.

## SEO / schema / images
- Per page: title, description, canonical, OG; one H1; internal links.
- Service schema like the TS file (`provider` → existing `#business`).
- Every visible image: specific ALT describing the real job + location when known.
- Remove obsolete meta keywords if any remain.

## Ship process
1. PR with copy/metadata/schema/ALT changes (layout may stay; improve only if it helps readability).
2. Ping Chuck for QC before merge.
3. After merge: confirm live pages.

Sources on box:
- `/workspace/sbl-copy-rewrite/landscape-design-page.ts`
- `/workspace/sbl-copy-rewrite/homepage-pdf-extract.txt`
- `/workspace/sbl-copy-rewrite/homepage-source.pdf`
