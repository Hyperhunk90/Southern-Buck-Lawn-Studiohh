# CLAUDE.md — Southern Buck Lawn Website

This file is the primary reference for AI assistants working on this codebase. Read it fully before making any changes.

---

## Project Overview

**Southern Buck Lawn** is a production marketing and lead-generation website for a lawn care business based in Walker, Louisiana. The site drives local SEO traffic across Livingston Parish and converts visitors into quote/contact leads via email.

- **Live URL:** https://southernbucklawn.com
- **Owner:** Michael Dantone (`SBL@Southernbucklawn.com`)
- **Phone:** (225) 369-4434

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

## Repository Structure

```
src/
├── app/                        # Next.js App Router pages & API
│   ├── layout.tsx              # Root layout: fonts, GA4, JSON-LD schema
│   ├── page.tsx                # Home page
│   ├── globals.css             # Tailwind v4 theme, CSS variables
│   ├── api/lead/route.ts       # POST handler: form → Resend email
│   ├── sitemap.ts              # Auto-generated XML sitemap
│   ├── robots.ts               # Auto-generated robots.txt
│   ├── services/               # /services hub + /services/[slug] detail pages
│   ├── service-areas/[slug]/   # Location pages (Walker, Denham Springs, etc.)
│   ├── blog/[slug]/            # Blog post pages
│   ├── quote/                  # Free quote form page
│   ├── contact/                # Contact form page
│   ├── landscape-lighting/     # Specialized standalone service page
│   └── [zipper]/               # Zipper pages: /service-slug-city-slug combos
│
├── components/                 # Shared UI components (all pure presentational)
│   ├── Navbar.tsx              # Header nav with mobile drawer
│   ├── Footer.tsx              # Footer with links, hours, social
│   ├── QuoteForm.tsx           # Client component: free quote form
│   ├── ContactForm.tsx         # Client component: general contact form
│   ├── ReviewBadgeBar.tsx      # Review ratings display bar
│   ├── FaqSection.tsx          # Accordion FAQ component
│   ├── Breadcrumbs.tsx         # Breadcrumb nav
│   ├── ServiceAreaMap.tsx      # Google Maps embed
│   ├── SiteChrome.tsx          # Layout wrapper (Navbar + Footer)
│   ├── TextBubble.tsx          # Styled text card
│   └── GaTracker.tsx           # GA4 `<Script>` injector (client component)
│
├── data/                       # ALL site content lives here — edit this to update copy
│   ├── site.ts                 # Business info, phone, hours, social links, nav menus
│   ├── services.ts             # 4 services with details, FAQs, pricing
│   ├── locations.ts            # 4 service areas with local context
│   ├── blog.ts                 # Blog posts with SEO metadata and sections
│   ├── reviews.ts              # Customer reviews (add real reviews here)
│   └── zipper.ts               # SEO zipper combos (service × city URL permutations)
│
├── lib/
│   ├── types.ts                # Shared TypeScript interfaces
│   └── ga.ts                   # GA4 `trackEvent()` helper
│
public/images/                  # Static images — hero, before/after, logo, service photos
```

---

## Content Architecture

**Content is data, not hardcoded JSX.** All copy, metadata, and structured content live in `src/data/`. Pages consume this data — they do not contain inline content strings.

### `src/data/site.ts`
Single `SITE` constant with business name, phone, email, address, geo coordinates, hours, social links, and `serviceAreas`. Also exports `SERVICE_NAV` and `AREA_NAV` arrays used by the Navbar. **Always update `SITE` when business info changes.**

### `src/data/services.ts`
Array of `Service` objects. Each service has: `slug`, `title`, `metaTitle`, `metaDescription`, `h1`, `quickSummary`, `detailedContent[]`, `localBenefits[]`, `pricingRange`, `faqs[]`, `image`, `imageAlt`.

**Current services:** `lawn-mowing`, `weed-control`, `landscape-design`, `commercial-grounds`

### `src/data/locations.ts`
Array of `Location` objects. Each has: `slug`, `name`, `metaTitle`, `metaDescription`, `h1`, `intro`, `soilNote`, `pestNote`, `neighborhoods[]`, `image`, `imageAlt`, `reviews[]`, `faqs[]`.

**Current locations:** `walker`, `denham-springs`, `baton-rouge`, `livingston-parish`

### `src/data/blog.ts`
Array of `BlogPost` objects. Each has: `slug`, `title`, `metaTitle`, `metaDescription`, `h1`, `excerpt`, `date` (ISO), `dateLabel`, `readMinutes`, `keywords[]`, `heroImage`, `heroAlt`, `sections[]`, `relatedLinks[]`.

### `src/data/zipper.ts`
`ZIPPER_COMBOS` array — one entry per service × city combination. Each `ZipperCombo` has a unique `slug` matching the URL pattern `/service-slug-city-slug` (e.g. `/lawn-mowing-denham-springs`). These are statically generated at build time (`generateStaticParams`). The `[zipper]` catch-all route renders only known slugs; unknown slugs 404.

**To add a new zipper page:** append a new `ZipperCombo` entry to `ZIPPER_COMBOS` in `zipper.ts`. The route handles it automatically.

### `src/data/reviews.ts`
`Review[]` array. Currently empty — add real customer reviews here. The `Review` interface: `author`, `area`, `text`, `rating` (1-5), `source?`.

---

## TypeScript Interfaces (`src/lib/types.ts`)

```
FAQ           { question, answer }
Service       { slug, title, navLabel, subtitle, keywords, metaTitle, metaDescription,
                h1, quickSummary, detailedContent[], localBenefits[], pricingRange,
                faqs[], image, imageAlt }
Review        { author, area, text, rating, source? }
Location      { slug, name, navLabel, keywords, metaTitle, metaDescription, h1, intro,
                soilNote, pestNote, neighborhoods[], image, imageAlt, reviews[], faqs[] }
BlogSection   { heading?, body[] }
BlogPost      { slug, title, metaTitle, metaDescription, h1, excerpt, date, dateLabel,
                readMinutes, keywords[], heroImage, heroAlt, sections[], relatedLinks[] }
```

---

## Styling Conventions

**Tailwind CSS v4** — config lives entirely in `src/app/globals.css` via `@theme` block. There is no `tailwind.config.js`.

### Custom Color Tokens
| Token | Value | Use |
|---|---|---|
| `deep-forest` | `#1B3A2F` | Primary brand green (dark) |
| `safety-orange` | `#FF6B00` | CTA accent, highlights |
| `safety-orange-deep` | `#CC5500` | Hover state for orange |
| `midnight-moss` | `#0D1F1A` | Darkest background |
| `mist-green` | `#EEF4F0` | Light green surface |
| `surface` | `#F5F5F5` | Page background |
| `primary` | alias for `deep-forest` | |

### Custom Font Classes
- `font-anton` — Anton (headings, always `uppercase`)
- `font-barlow` — Barlow Condensed (body text)

### Layout Pattern
Pages use a consistent structure:
1. `<header>` — dark hero section (`bg-midnight-moss text-white`)
2. `<section>` — main content (`bg-surface`)
3. `<section>` — quote CTA (`bg-mist-green`)

---

## API

### `POST /api/lead`

**File:** `src/app/api/lead/route.ts`

Handles both quote and contact form submissions. Sends HTML email via Resend.

**Required body fields:** `name`, `phone`
**Optional body fields:** `type`, `email`, `address`, `service`, `lotSize`, `frequency`, `message`

**Required env vars:** `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`

Returns `{ ok: true }` on success, `{ error: string }` on failure. Has no authentication or rate limiting.

---

## Environment Variables

Copy `.env.example` to `.env.local` to run locally:

```
RESEND_API_KEY=re_...           # From resend.com dashboard
LEAD_TO_EMAIL=SBL@Southernbucklawn.com
LEAD_FROM_EMAIL=noreply@southernbucklawn.com
NEXT_PUBLIC_SITE_URL=https://southernbucklawn.com
```

---

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:3000
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint check
```

**Node.js 20+ required.** No `.nvmrc` — use nvm or Node 20 LTS.

---

## SEO Conventions

This site is heavily SEO-optimized. Maintain these conventions strictly:

1. **One `<h1>` per page** — always taken from the data object's `h1` field.
2. **`metaTitle` and `metaDescription`** — every page exports its own `generateMetadata()` using data from `src/data/`.
3. **Canonical URLs** — set in `generateMetadata()` via `alternates.canonical`.
4. **LocalBusiness JSON-LD schema** — lives in `src/app/layout.tsx`. Update it if business info changes.
5. **Sitemaps** — auto-generated from data arrays in `src/app/sitemap.ts`. Adding a new data entry automatically adds it to the sitemap.
6. **Redirects** — permanent redirects for old URLs in `next.config.mjs` (do not remove them).
7. **www redirect** — `www.southernbucklawn.com` → `southernbucklawn.com` via redirect in `next.config.mjs`.
8. **Image alt text** — always use descriptive alt text from the `imageAlt` field in data objects.
9. **Internal linking** — Zipper pages link to parent service and city pages. Blog posts carry `relatedLinks` for funneling.

---

## Image Conventions

- All images are in `public/images/` as WebP or PNG files.
- Always use `<Image>` from `next/image`, never `<img>`.
- For hero images: `priority` prop + explicit `width`/`height`.
- Quality: use `quality={60}` for landscape photos, `quality={75}` for product/logo images.
- The optimizer serves AVIF or WebP automatically based on browser support.

---

## Adding New Content

### New service page
1. Add a `Service` object to `src/data/services.ts`.
2. Add it to `SERVICE_NAV` in `src/data/site.ts`.
3. Add zipper combos for it in `src/data/zipper.ts` (one per city).
4. Add an image to `public/images/`.

### New service area
1. Add a `Location` object to `src/data/locations.ts`.
2. Add it to `AREA_NAV` in `src/data/site.ts`.
3. Add zipper combos for it in `src/data/zipper.ts` (one per service).
4. Add an image to `public/images/`.

### New blog post
1. Add a `BlogPost` object to `src/data/blog.ts`.
2. Add a hero image to `public/images/`.
3. Include `relatedLinks` pointing to relevant service or location pages.

### New zipper page
1. Add a `ZipperCombo` to `ZIPPER_COMBOS` in `src/data/zipper.ts`.
2. No new files required — the `[zipper]` route handles it via `generateStaticParams`.

---

## Key Constraints

- **No database.** All content is in TypeScript data files. Forms submit to email only.
- **No test framework.** There are no unit or integration tests.
- **No CI/CD pipeline.** Deployment is manual push to `main` → Hostinger auto-deploys.
- **Static generation preferred.** Pages should use `generateStaticParams` + static rendering wherever possible. Avoid `dynamic = 'force-dynamic'` unless strictly necessary.
- **`dynamicParams = false`** on the `[zipper]` route — only known slugs render; unknown slugs 404.
- **No authentication.** The `/api/lead` endpoint is public with no rate limiting.
- **Browserslist target:** Chrome/Edge/Firefox 109+, Safari 15.4+, iOS 15.4+.

---

## Deployment

- **Platform:** Hostinger (Node.js app)
- **Trigger:** Push to `main` branch → auto-redeploy
- **Build command:** `npm run build`
- **Start command:** `npm start`
- **Node version:** 20+
- **Environment vars** must be set in Hostinger's dashboard (not committed to the repo).
