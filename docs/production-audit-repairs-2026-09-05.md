# Production audit repairs — September 5, 2026

Baseline: freshly fetched `origin/main` at `27ff915da6b0deb123011bffe4e4997b7fa5eeb3`. These are bounded repairs to observed failures, preserving the merged copy rewrite and lead flows.

- Add quality 70 to Next.js image optimizer allowlist. Production returned HTTP 400 for the lighting hero and all six blog author portraits, including responsive requests at 640px and 96px. Allowing the existing value also supports image URLs already present in cached HTML.
- Identify the lighting slider as a digital concept throughout its labels, image alternative text, accessible control description, and visible caption. It adjusts one photograph with filters and a glow overlay; it is not a documented installation before/after.
- Make the related-guide regression test inspect the assembled service/location data, including the imported landscape-design module. The baseline test incorrectly counted only three service objects present literally in services.ts.
- Replace fixed pesticide re-entry timing with instructions to follow each product label, including drying and any longer restrictions. Qualify lime with soil-test recommendations. Remove unsupported diagnostic percentages and inevitable-reseeding claims, and distinguish centipede mowing height from St. Augustine.
- Add an image-quality regression check that compares explicit JSX quality values with the optimizer allowlist.

## Sources for the narrow factual corrections

Accessed September 5, 2026. No product-specific application, dosage, or credential claims were added.

- [EPA: Ten Tips to Protect Children from Pesticides and Lead Poisoning](https://www.epa.gov/safepestcontrol/ten-tips-protect-children-pesticides-and-lead-poisoning): follow drying and label restrictions for re-entry.
- [LSU AgCenter: Louisiana Home Lawn Series — Soil pH](https://www.lsuagcenter.com/profiles/aiverson/articles/page1563202026987): determine amendments from soil testing and the grass's needs.
- [LSU AgCenter: Taking Care of Centipedegrass Lawns](https://www.lsuagcenter.com/profiles/mhferguson/articles/page1585150724952): routine centipede mowing at 1–2 inches; lime is not a routine treatment for naturally acidic soil suitable for centipede.
- [LSU AgCenter: Southern Chinch Bug](https://www.lsuagcenter.com/topics/lawn_garden/commercial_horticulture/turfgrass/turfgrass-insects/southern-chinch-bug): hot, dry conditions, diagnosis, appropriate fertility and product-label directions.
- [LSU AgCenter: Send in the Troops — Armyworms Are Here](https://www.lsuagcenter.com/articles/page1627648708063): healthy actively growing turf can recover even after extensive leaf feeding. Search extract retrieved; direct article fetch transiently failed.

These changes are presentation and accuracy repairs. They do not establish a cause of the traffic decline or predict ranking gains. Real production email receipt, field Core Web Vitals, current Google account metrics, credentials, and deployment identity are separate verification tasks.
