# Design System Master File — Southern Buck Lawn

> **LOGIC:** When building a specific page, first check `design-system/southern-buck-lawn/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file. Otherwise, follow the rules below.

> **PROVENANCE:** Direction is synthesized from the `ui-ux-pro-max` skill searches
> (styles, typography, landing, gsap/motion, ux, nextjs stack) run 2026-09-20.
> Items marked **[data]** map to a skill search result. Items marked **[brand]** are
> creative synthesis for this project (no exact database match) — swap freely.

---

**Project:** Southern Buck Lawn — lawn care & landscaping, Walker / Livingston Parish, LA
**Category:** Local home-service marketing & lead-gen (not a "Plant Care Tracker")
**Concept:** *A creative outdoor portal* — an earthy, tactile, immersive site with a sassy Southern twang.
**Design Dials:** Variance 7/10 (Balanced→Bold) | Motion 8/10 (Complex, gated by reduced-motion) | Density 4/10 (Standard, airy)
**Style base:** Organic Biophilic × Nature Distilled × Editorial Grid **[data]**

---

## 0. Brand Invariants — DO NOT CHANGE (carry over from current site)

This is a **visual reskin only**. The following are preserved exactly and must survive the redesign:

- **Logo and brand mark** — reuse as-is; the signature accent may tint decorative marks, never the logo artwork itself.
- **All real photography** — no stock, no Unsplash, no AI fill. Alt text must keep matching the file (see `CLAUDE.md` §Image alt text). Do not relabel photo-08/09/10 as three different cities.
- **Quote form (`/quote`) + `POST /api/lead`** (Resend) — fields, validation, and endpoint behavior unchanged. Restyle only.
- **All structured data** — `BusinessJsonLd` stays homepage-only; no first-party `review`/`aggregateRating`; email in JSON-LD; `areaServed` = Walker, Denham Springs, Watson.
- **All SEO** — `metaTitle`/`metaDescription`, `alternates.canonical` + `og:url`, title template `%s | Southern Buck Lawn`, `sitemap.ts`, `robots.ts` (`Disallow /api/`), and every 301 in `next.config.mjs`.
- **Honest claims** — solo operator (Michael), insured (not "licensed"), opened June 2024, hours 6:00 AM–6:30 PM daily, NAP: 28790 Brett Dr, Walker, LA 70785. Sole prop, never LLC.
- **Icons are SVG** (Lucide, already a dependency) — never emoji.

---

## 1. Color Palette — "Loam, Cypress & Blaze"

Earthy Southern foundation (cypress green + oak/clay warm neutrals on a cotton-cream base) with **one rare signature marking color**.

### 1a. Signature marking color **[brand]**

**BLAZE** — a clay-burnt hunter's orange. Chosen as the ownable "marking" hue because it (1) ties directly to the *buck / outdoors* brand story, (2) is rare in a lawn-care field saturated with greens/blues, and (3) reads sassy and warm while staying earthy. Use it as the **one** thing people remember: primary CTAs, active states, focus rings, link underlines, the tick on checklists, hand-drawn circle accents.

| Token | Hex | Use |
|-------|-----|-----|
| `--color-blaze` | `#E4572E` | Bright signature — decorative marks, underlines, hovers on light bg |
| `--color-blaze-deep` | `#C6431C` | **CTA fill** (use cream/white text; verify ≥4.5:1) |
| `--color-blaze-tint` | `#FBE7DC` | Blaze-washed highlight backgrounds, selection |

> **Owner options** (drop-in alternates if Blaze isn't the one): **Muscadine** `#6E2A44` (deep Southern-grape wine — sassier, cooler) or **Goldenrod** `#D99A2B` (warm, softer). Keep exactly one signature.

### 1b. Core tokens

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary (Cypress) | `#2C4A34` | `--color-primary` |
| On Primary | `#FBF6EC` | `--color-on-primary` |
| Secondary (Oak Bark) | `#5A4632` | `--color-secondary` |
| On Secondary | `#FBF6EC` | `--color-on-secondary` |
| Accent / CTA (Blaze Deep) | `#C6431C` | `--color-accent` |
| On Accent / CTA | `#FFF7EF` | `--color-on-accent` |
| Background (Cotton Cream) | `#F6F1E7` | `--color-background` |
| Foreground (Loam) | `#241C14` | `--color-foreground` |
| Card (Warm White) | `#FCF8EF` | `--color-card` |
| Card Foreground | `#241C14` | `--color-card-foreground` |
| Muted (Sand) | `#EBE3D1` | `--color-muted` |
| Muted Foreground | `#6B5D4B` | `--color-muted-foreground` |
| Border (Dry Grass) | `#D9CDB5` | `--color-border` |
| Destructive (Brick) | `#9E2B20` | `--color-destructive` |
| On Destructive | `#FFF7EF` | `--color-on-destructive` |
| Ring (Blaze Deep) | `#C6431C` | `--color-ring` |

### 1c. Earth palette for illustration / texture **[brand]**

`--clay:#B5651D` · `--pine-straw:#C89B6A` · `--fern:#3A5A40` · `--moss:#6B7B3C` · `--goldenrod:#D99A2B` · `--muscadine:#6E2A44`

### 1d. "Mulch" dark section (immersive band)

For overlaid, tinted background sections: `--mulch-bg:#241C14` (loam) with `--mulch-overlay` = grain/noise at **0.10 opacity** and a `--moss`/`--clay` duotone photo tint. Text on mulch uses `--color-on-primary` (cream). Verify 4.5:1.

---

## 2. Typography — warm editorial with a hand-drawn twang **[data]**

Tri-stack (from skill pairing *Calistoga + Inter*, plus retained *Caveat* for the sassy hand annotations already used on-site):

- **Display / Headings:** **Calistoga** — chunky, warm display serif; rooted, characterful, memorable.
- **Body / UI:** **Inter** — clean, legible, variable.
- **Script accent (sparingly):** **Caveat** — circled words, margin notes, "sassy" callouts. Never for paragraphs or critical labels.

```css
@import url('https://fonts.googleapis.com/css2?family=Calistoga&family=Inter:wght@300;400;500;600;700&family=Caveat:wght@500;600;700&display=swap');
```
```js
// tailwind
fontFamily: { display: ['Calistoga','serif'], sans: ['Inter','sans-serif'], script: ['Caveat','cursive'] }
```

**Type scale** — Hero 44–64px / leading-[1.05]; H2 30–40px; H3 22–26px; Body 17–18px / leading-1.6; Label 12–13px uppercase tracking-[0.14em]. Base 16px minimum, body line-height ≥1.5. **Editorial touches:** drop cap (`::first-letter`, ~3.5em, Calistoga, blaze) on lead paragraphs; pull-quotes for testimonials (1.5em, Cypress, blaze quotation mark).

> Migration note: current site uses Anton + Barlow Condensed/Archivo + Caveat. Calistoga replaces Anton as the display face; keep Caveat.

---

## 3. Layout & Spacing — asymmetric editorial grid

- **Grid:** 12-col with *intentional* off-center compositions (image bleeds one side, text hangs the other). Avoid dead-center everything **[data: Editorial Grid]**.
- **Container:** max-w 1200–1280px; generous gutters; never fixed-px page widths.
- **Organic geometry:** varied radii 16–24px; blob/curve SVG dividers between bands; sections alternate cream → sand → mulch to build rhythm.
- **Spacing scale (Density 4/10):** `--space-xs 4px` · `sm 8px` · `md 16px` · `lg 24px` · `xl 32px` · `2xl 48px` · `3xl 64px`.
- **Shadows (natural, soft):** `--shadow-sm 0 1px 2px rgba(36,28,20,.06)` · `md 0 6px 20px rgba(36,28,20,.10)` · `lg 0 16px 40px rgba(36,28,20,.14)`.
- **Responsive breakpoints:** 375 / 768 / 1024 / 1440. Mobile-first, no horizontal scroll, viewport meta intact, never disable zoom.

---

## 4. Immersive "Outdoor Portal" Asset System **[brand]**

Tactile nature elements that immerse without hurting usability. Decorative SVG/overlays are `aria-hidden`; interactive elements keep real hit-areas, labels, and contrast.

| Element | How | Guardrails |
|---|---|---|
| **Leaf-cutout buttons** | Button with a leaf-notch `clip-path` and a small Lucide `leaf`/`sprout` glyph | Tap target ≥44×44px; visible text label; focus ring (blaze) not clipped |
| **Grass-blade top border** | Repeating SVG grass mask on band tops | Purely decorative, `aria-hidden`; must not overlap text |
| **Stick / twig dividers** | Hand-drawn twig SVG as section rule | Decorative; keep DOM reading order intact |
| **Mulch-tinted sections** | Loam bg + 0.10 grain overlay + duotone photo tint | Text contrast ≥4.5:1 on the darkest area |
| **Torn-paper / kraft edges** | SVG mask on band transitions | Decorative only |
| **Caveat callouts** | Hand-circled word / margin note near CTAs | Sparse — 1 per view max |

Texture cost is real (skeuomorphic overlays are perf-heavy): use compressed SVG/AVIF, keep grain a single tiled asset, and never stack more than 1–2 decorative layers per viewport.

---

## 5. Motion System **[data]** — gated by `prefers-reduced-motion`

Rules: animate **1–2 key elements per view max**; decorative parallax on background/decorative layers **only**, never text or controls; always provide the readable final state under reduced motion.

- **Hero headline — char stagger:** `SplitText` → `gsap.from(chars,{opacity:0,y:20,rotateX:-40,duration:.6,stagger:.015,ease:'expo.out'})`; revert on unmount; plain-fade fallback for <8-word headlines only.
- **Section reveal:** `gsap.from(el,{opacity:0,y:12,duration:.35,ease:'power1.out',scrollTrigger:{start:'top 90%',toggleActions:'play none none reverse'}})`.
- **Organic parallax (leaf/grass/mulch layers):** `gsap.to('.parallax-layer',{yPercent:(i+1)*-8,ease:'none',scrollTrigger:{scrub:.5}})`; keep delta 5–15%; `overflow:hidden` wrapper; `will-change:transform` only while scrolling.
- **Leaf-button hover:** micro-lift + blaze underline grow, 150–250ms; no layout shift.
- **Optional page transition:** GSAP Flip on the shared hero image (500–800ms `expo.inOut`), single element pair only.

```js
gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => { /* animations here */ });
```

**Implementation note:** the site already ships `motion` (Motion 12) — use it for reveals/hover/stagger. Add GSAP **ScrollTrigger/SplitText/Flip** only if you want scrub-parallax and shared-element transitions (optional deps; mind the SplitText license).

---

## 6. Page Pattern **[data]** — "Hero + Testimonials + CTA" / Trust & Authority

Section order: **Hero (mission + credibility)** → Problem statement → Solution overview → Proof (verified reviews, GBP rating) → **CTA**. CTA placement: sticky-in-hero + post-testimonials. Testimonials carousel must have prev/next + pause, stop on focus/hover/reduced-motion, and announce slide position. Keep only independently verified reviews on-page (no family review as a customer testimonial) per `CLAUDE.md`.

---

## 7. Component Specs (tokens, not raw hex, in components)

```css
.btn-primary{background:var(--color-accent);color:var(--color-on-accent);padding:14px 26px;border-radius:14px;font-weight:600;transition:transform .2s ease,box-shadow .2s ease;cursor:pointer}
.btn-primary:hover{transform:translateY(-1px);box-shadow:var(--shadow-md)}
.btn-secondary{background:transparent;color:var(--color-primary);border:2px solid var(--color-primary);padding:12px 24px;border-radius:14px;font-weight:600;cursor:pointer}
.card{background:var(--color-card);border:1px solid var(--color-border);border-radius:18px;padding:24px;box-shadow:var(--shadow-md)}
.input{padding:12px 16px;border:1px solid var(--color-border);border-radius:12px;font-size:16px;background:var(--color-card)}
.input:focus{border-color:var(--color-ring);outline:none;box-shadow:0 0 0 3px color-mix(in srgb,var(--color-ring) 25%,transparent)}
```

---

## 8. Anti-Patterns (Do NOT use)

- ❌ Emoji as icons (use Lucide SVG) · ❌ raw hex in components (use tokens) · ❌ gray-on-gray / <4.5:1 text
- ❌ More than one signature accent competing with Blaze · ❌ parallax on body copy · ❌ animating width/height (use transform/opacity)
- ❌ removing focus rings · ❌ icon-only buttons without labels · ❌ layout-shifting hovers · ❌ instant (0ms) state changes
- ❌ stock/AI imagery · ❌ relabeling the same ranch photo as three cities · ❌ touching schema/meta/redirects/quote API

---

## 9. Pre-Delivery Checklist

- [ ] Brand invariants (§0) intact: logo, real photos + alts, quote form + `/api/lead`, JSON-LD, meta/canonical, sitemap/robots, 301s, honest claims
- [ ] Exactly one signature accent (Blaze) used consistently for actions/marks
- [ ] Text contrast ≥4.5:1 everywhere (incl. cream-on-blaze CTA and text on mulch bands)
- [ ] No emojis as icons; Lucide throughout; `cursor-pointer` on all clickables
- [ ] Hover/focus states smooth (150–300ms) and visible for keyboard nav
- [ ] `prefers-reduced-motion` respected; ≤2 animated elements per view; decorative layers `aria-hidden`
- [ ] Tap targets ≥44×44px (incl. leaf-cutout buttons); ≥8px spacing
- [ ] Responsive at 375 / 768 / 1024 / 1440; no horizontal scroll; zoom enabled
- [ ] Images via `next/image` (AVIF/WebP), `priority` only on the hero, CLS < 0.1
- [ ] Fonts: Calistoga (display) / Inter (body) / Caveat (accent, sparse)
