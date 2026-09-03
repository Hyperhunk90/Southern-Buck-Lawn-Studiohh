# CLAUDE.md — Southern Buck Lawn Website

This file is the primary reference for AI assistants working on this codebase. Read it fully before making any changes.

---

## Project Overview

**Southern Buck Lawn** is a production marketing and lead-generation website for a lawn care business based in Walker, Louisiana. The site drives local SEO traffic across Livingston Parish and converts visitors into quote/contact leads via email.

- **Live URL:** https://southernbucklawn.com
- **Owner:** Michael Dantone (`sbl@southernbucklawn.com`)
- **Phone:** (225) 369-4434
- **NAP:** Southern Buck Lawn, 28790 Brett Dr, Walker, LA 70785. Sole prop, never LLC.
- **Home turf:** Walker 70785, Denham Springs 70726, Watson 70786. Baton Rouge and Gonzales are not home turf.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.5 (App Router, React 19) |
| Language | TypeScript 5.8 (strict mode) |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`) |
| Icons | Lucide React |
| Animation | Motion 12 |
| Email | Resend (transactional email API) |
| Analytics | Google Analytics 4 (G-HYJ6QH6Y1D) |
| Fonts | Anton (headings), Barlow Condensed (body) via Google Fonts |
| Images | Next.js Image with AVIF/WebP optimization |
| Deployment | Hostinger Node.js hosting (auto-deploy on push to `main`) |

---

## Honest claims (do not regress)

- Solo operator: Michael. No “tight crew / same dedicated crew / somebody I trained / More about the crew.”
- Insured (general liability) is true. No “Fully Licensed.” No “Licensed & insured.” No landscape horticulture license yet (dormant-season plan).
- Owner confirmed on 2026-09-03: business opened June 2024; hours are 6:00 AM–6:30 PM every day. Do not restore the inaccurate 2013 start date or earlier weekend hours.
- 13 years industrial electrical is true. Use on lighting / winter securing only. Never as a landscape horticulture license.
- 28790 Brett Dr is the home/shop address. “Based there” is enough. Do not invite walk-ins to “come see the shop.”
- City pages: do not label photo-08/09/10 (same white ranch) as Walker, Denham Springs, and Watson. One honest ranch use (homepage) or trailer (photo-01) / owner (photo-11). Watson may have no photo. Honest alts only.
- No invented prices or neighborhoods. Skip `/pricing`.
- Review markup: Marty Dantone is family. Do not put first-party reviews in LocalBusiness Review JSON-LD or present family as a customer Google review. `GOOGLE_RATING.count` is the live GBP total (verified 9 on 2026-09-02); `REVIEWS` contains only independently verified reviews reproduced on-page. Do not invent a replacement review.
- LocalBusiness JSON-LD lives in `src/components/BusinessJsonLd.tsx` and is homepage-only. Do not mount it in `layout.tsx` (404s inherit the layout). 404s must not canonical as `/` and must not emit full business schema.
- City×service zipper URLs 301 to `/services/{slug}`. Do not add new zipper combos. Do not 301 hub pages (`/services/*`, `/service-areas/walker`, `/service-areas/denham-springs`, `/service-areas/watson`). 301 `/service-areas/baton-rouge` → `/service-areas`.
- Christmas lights is not a live service. Existing `/christmas-lights` → `/landscape-lighting` 301 is OK.
- No stock photos. No Unsplash. No AI fill. Photo alts must match the file.
- Do not break POST `/api/lead` (Resend).

---

## Content Architecture

**Content is data, not hardcoded JSX.** All copy, metadata, and structured content live in `src/data/`.

**Current services:** `lawn-mowing`, `weed-control`, `landscape-design`, `commercial-grounds`

**Current locations:** `walker`, `denham-springs`, `watson`, `livingston-parish` (parish large-lot page, not a fake city)

### `src/data/zipper.ts`
Legacy city×service URLs. They 301 to `/services/{serviceSlug}` in `next.config.mjs`. Do **not** add new zipper combos.

### `src/data/reviews.ts`
Real GBP reviews only (non-family) may be reproduced on-page. Keep the live GBP total in `GOOGLE_RATING.count` separate from the smaller, verified `REVIEWS` display list.

---

## SEO Conventions

1. **One `<h1>` per page** — from the data object's `h1` field.
2. **`metaTitle` and `metaDescription`** — every page exports `generateMetadata()` from `src/data/`.
3. **Canonical URLs** — set in `generateMetadata()` via `alternates.canonical`. og:url must match. Root layout must **not** set a sitewide canonical.
4. **LocalBusiness JSON-LD** — `BusinessJsonLd` on the homepage only. Do not add first-party `review` or `aggregateRating` markup. Email in JSON-LD. Watson in areaServed; BR/Gonzales out.
5. **Sitemaps** — auto-generated in `src/app/sitemap.ts`. Include `/about`, `/privacy`, Watson. Drop doorway/zipper URLs.
6. **Redirects** — permanent redirects for old URLs in `next.config.mjs` (do not remove them).
7. **Image alt text** — match the file. photo-02 dusk brick house + path lights; photo-04/05/06/07 commercial palm/pine-straw; photo-08/09/10 white ranch hedge daytime (one honest use, not three city labels); photo-11 owner branded shirt + shovel; photo-03 404; photo-01 work trailer.
8. **Title template** is `'%s | Southern Buck Lawn'`. Page titles must not also include “Southern Buck Lawn” or the brand duplicates.
9. **robots.ts** keeps `Disallow /api/`.

---

## API

### `POST /api/lead`

**File:** `src/app/api/lead/route.ts`

Handles quote and contact form submissions via Resend. Do not break this route.

**Required env vars:** `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`

---

## Key Constraints

- **No database.** Content is in TypeScript data files. Forms submit to email only.
- **Never LLC.** Sole prop.
- **Home turf only:** Walker, Denham Springs, Watson.
- **`dynamicParams = false`** on the `[zipper]` route — leftover slugs 301 to `/services/{slug}`; unknown slugs 404.
- **No authentication** on `/api/lead`.

---

## Deployment

- **Platform:** Hostinger (Node.js app)
- **Trigger:** Push to `main` → auto-redeploy
- **Build command:** `npm run build`
- **Start command:** `npm start`
- **Node version:** 20+
