// Zipper pages: a specific service crossed with a specific city.
// These target high-intent local searches like "lawn mowing denham springs".
// Each combo carries a unique intro so the page is not a thin duplicate.
// URL pattern: /[service-slug]-[city-slug]  e.g. /lawn-mowing-denham-springs

export interface ZipperCombo {
  slug: string; // full URL slug, e.g. 'lawn-mowing-denham-springs'
  serviceSlug: string;
  citySlug: string;
  serviceTitle: string;
  cityName: string; // short, no state
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  primaryKeyword: string;
}

// Short helpers used to keep the combos readable.
const CITY_SHORT: Record<string, string> = {
  walker: 'Walker',
  'denham-springs': 'Denham Springs',
  'baton-rouge': 'Baton Rouge',
  'livingston-parish': 'Livingston Parish',
};

export const ZIPPER_COMBOS: ZipperCombo[] = [
  // ---------- LAWN MOWING ----------
  {
    slug: 'lawn-mowing-walker',
    serviceSlug: 'lawn-mowing',
    citySlug: 'walker',
    serviceTitle: 'Lawn Mowing & Edging',
    cityName: 'Walker',
    primaryKeyword: 'lawn mowing Walker LA',
    h1: 'Lawn Mowing in Walker, LA',
    metaTitle: 'Lawn Mowing in Walker, LA | Weekly Cuts & Edging',
    metaDescription:
      'Weekly lawn mowing and edging in Walker, LA. Same crew, same day, set to your grass. Southern Buck Lawn is your hometown crew. Call (225) 369-4434 for a free quote.',
    intro: [
      'Looking for lawn mowing in Walker, LA that actually shows up? Southern Buck Lawn is based right here in town, so your yard is a few minutes from the shop, not an afterthought at the end of a route that started two parishes over. We mow, trim, edge, and blow every week on a set day you can count on.',
      'Walker yards lean heavy on Centipede and St. Augustine, and a lot of the newer subdivisions off Walker South Road are still on young sod. Cut those too short and they scorch by July. We set the deck to your grass and keep the blades sharp so every pass slices clean instead of tearing.',
    ],
  },
  {
    slug: 'lawn-mowing-denham-springs',
    serviceSlug: 'lawn-mowing',
    citySlug: 'denham-springs',
    serviceTitle: 'Lawn Mowing & Edging',
    cityName: 'Denham Springs',
    primaryKeyword: 'lawn mowing Denham Springs',
    h1: 'Lawn Mowing in Denham Springs, LA',
    metaTitle: 'Lawn Mowing in Denham Springs, LA | Weekly Service',
    metaDescription:
      'Reliable weekly lawn mowing and edging in Denham Springs, LA. Sharp lines, clean blow-off, same day every week. Southern Buck Lawn. Free quote at (225) 369-4434.',
    intro: [
      'Need dependable lawn mowing in Denham Springs? We run these streets every week, from the Antique District to the new builds off Juban Road. Your lawn gets a fresh cut pattern, trimmed fence lines and beds, a hard edge along the drive and walks, then every clipping blown off your concrete.',
      'The heavy clay around here holds water after a storm, which means the grass jumps right after a wet stretch. A set weekly schedule keeps it from getting away from you, and keeps your yard the sharp one on the block instead of the shaggy one.',
    ],
  },
  {
    slug: 'lawn-mowing-baton-rouge',
    serviceSlug: 'lawn-mowing',
    citySlug: 'baton-rouge',
    serviceTitle: 'Lawn Mowing & Edging',
    cityName: 'Baton Rouge',
    primaryKeyword: 'lawn mowing Baton Rouge',
    h1: 'Lawn Mowing in Baton Rouge, LA',
    metaTitle: 'Lawn Mowing in Baton Rouge, LA | Weekly Lawn Service',
    metaDescription:
      'Crisp weekly lawn mowing and edging in Baton Rouge, LA. Striped cuts, sharp edges, full clean-up. Southern Buck Lawn holds a high bar. Free quote at (225) 369-4434.',
    intro: [
      'Baton Rouge holds a high bar for curb appeal, and our lawn mowing meets it. From the Garden District to homes off Jefferson and Perkins, we deliver a clean striped cut, sharp edges, and a full blow-off every single visit, on the same day each week.',
      'A lot of Baton Rouge lawns run St. Augustine under big shade trees. We adjust the height for the shade so the grass holds instead of thinning, and we keep the edges crisp where lawn meets all that concrete and brick.',
    ],
  },
  {
    slug: 'lawn-mowing-livingston-parish',
    serviceSlug: 'lawn-mowing',
    citySlug: 'livingston-parish',
    serviceTitle: 'Lawn Mowing & Edging',
    cityName: 'Livingston Parish',
    primaryKeyword: 'lawn mowing Livingston Parish',
    h1: 'Lawn Mowing in Livingston Parish, LA',
    metaTitle: 'Lawn Mowing in Livingston Parish, LA | Large-Lot Service',
    metaDescription:
      'Lawn mowing for big lots across Livingston Parish, LA. Commercial zero-turns knock out acreage fast and clean. Southern Buck Lawn. Free quote at (225) 369-4434.',
    intro: [
      'Out in Livingston Parish the lots get big, and a push mower will eat your whole weekend. Our lawn mowing service brings commercial zero-turns to Watson, Albany, Satsuma, and the rest, so a big yard gets knocked out fast and still looks sharp when we pull away.',
      'Open rural ground grows fast and rough around the edges. We keep the borders tight, trim the fence lines, and edge clean so an acre reads as cared-for, not just cut.',
    ],
  },

  // ---------- WEED CONTROL ----------
  {
    slug: 'weed-control-walker',
    serviceSlug: 'weed-control',
    citySlug: 'walker',
    serviceTitle: 'Weed Control & Fertilization',
    cityName: 'Walker',
    primaryKeyword: 'weed control Walker LA',
    h1: 'Weed Control & Fertilization in Walker, LA',
    metaTitle: 'Weed Control & Fertilization in Walker, LA',
    metaDescription:
      'Feed-and-weed lawn programs in Walker, LA. Pre-emergent, fertilizer, and weed treatment timed for Louisiana grass. Southern Buck Lawn. Free quote at (225) 369-4434.',
    intro: [
      'Want weed control in Walker that holds up? A thin lawn invites weeds, so our program feeds your grass dense enough to crowd them out, then treats what slips through. We time a late-winter pre-emergent to stop crabgrass before it sprouts.',
      'Walker soil drains a touch better than the heavier ground nearby, but nutrients wash out fast in a hard rain. We feed with slow-release nitrogen so the color holds steady through the summer instead of spiking and crashing.',
    ],
  },
  {
    slug: 'weed-control-denham-springs',
    serviceSlug: 'weed-control',
    citySlug: 'denham-springs',
    serviceTitle: 'Weed Control & Fertilization',
    cityName: 'Denham Springs',
    primaryKeyword: 'weed control Denham Springs',
    h1: 'Weed Control & Fertilization in Denham Springs, LA',
    metaTitle: 'Weed Control & Fertilization in Denham Springs, LA',
    metaDescription:
      'Stop crabgrass, clover, and buttonweed in Denham Springs, LA. Season-long feed-and-weed built for heavy clay. Southern Buck Lawn. Free quote at (225) 369-4434.',
    intro: [
      'Fighting weeds in Denham Springs? The heavy clay here packs tight and stays damp, which is exactly what clover, chickweed, and Virginia buttonweed love. Our weed control and fertilization program treats each one with the right product at the right time, not a one-size spray.',
      'We pair a granular feed with targeted liquid treatment, and lime the soil to open up the clay so roots reach deeper. Thicker turf is the best weed barrier there is.',
    ],
  },
  {
    slug: 'weed-control-baton-rouge',
    serviceSlug: 'weed-control',
    citySlug: 'baton-rouge',
    serviceTitle: 'Weed Control & Fertilization',
    cityName: 'Baton Rouge',
    primaryKeyword: 'weed control Baton Rouge',
    h1: 'Weed Control & Fertilization in Baton Rouge, LA',
    metaTitle: 'Weed Control & Fertilization in Baton Rouge, LA',
    metaDescription:
      'Beat Virginia buttonweed and brown patch in Baton Rouge, LA. Timed fertilization and weed treatment for a deep green lawn. Southern Buck Lawn. (225) 369-4434.',
    intro: [
      'Weed control in Baton Rouge means knowing the local troublemakers. Virginia buttonweed shrugs off most store-bought sprays, and brown patch fungus moves in during the warm, wet fall. We treat both with the right product and the right timing.',
      'Baton Rouge soil leans acidic, so we lime on a schedule to unlock the nutrients already in the ground. That is how your lawn goes from tired and pale to a deep, even green.',
    ],
  },
  {
    slug: 'weed-control-livingston-parish',
    serviceSlug: 'weed-control',
    citySlug: 'livingston-parish',
    serviceTitle: 'Weed Control & Fertilization',
    cityName: 'Livingston Parish',
    primaryKeyword: 'weed control Livingston Parish',
    h1: 'Weed Control & Fertilization in Livingston Parish, LA',
    metaTitle: 'Weed Control & Fertilization in Livingston Parish, LA',
    metaDescription:
      'Weed control and fertilization for large lots in Livingston Parish, LA. Strong borders and weed barrier where the wild growth moves fast. (225) 369-4434.',
    intro: [
      'On the bigger lots in Livingston Parish, weeds and wild growth move fast off the open ground and tree lines. Our weed control and fertilization program stays ahead of it with strong border treatment and a feeding schedule that keeps your managed turf thick.',
      'The forested silt loam out here carries a lot of organic matter, so seeds find a home quick. We treat the edges hard where the wild growth pushes in, and feed the lawn so it can hold its own.',
    ],
  },

  // ---------- LANDSCAPE DESIGN ----------
  {
    slug: 'landscape-design-walker',
    serviceSlug: 'landscape-design',
    citySlug: 'walker',
    serviceTitle: 'Landscape Design & Mulch',
    cityName: 'Walker',
    primaryKeyword: 'landscaping Walker LA',
    h1: 'Landscape Design & Mulch in Walker, LA',
    metaTitle: 'Landscaping, Mulch & Flowerbeds in Walker, LA',
    metaDescription:
      'Flowerbeds, fresh mulch, crape myrtles, and stone borders in Walker, LA. Southern Buck Lawn builds curb appeal that takes the heat. Free quote at (225) 369-4434.',
    intro: [
      'Want your Walker home to stand out? Our landscape work starts with a clean bed line, deep mulch, and plants that thrive in Louisiana heat. We handle flowerbeds, crape myrtles, stone borders, and the kind of front-yard refresh that turns heads on Walker South Road.',
      'A lot of Walker homes are newer builds with bare or builder-grade beds. We turn those blank slates into something with shape and color that still looks good three summers from now.',
    ],
  },
  {
    slug: 'landscape-design-denham-springs',
    serviceSlug: 'landscape-design',
    citySlug: 'denham-springs',
    serviceTitle: 'Landscape Design & Mulch',
    cityName: 'Denham Springs',
    primaryKeyword: 'landscaping Denham Springs',
    h1: 'Landscape Design & Mulch in Denham Springs, LA',
    metaTitle: 'Landscaping, Mulch & Flowerbeds in Denham Springs, LA',
    metaDescription:
      'Mulch beds, flowerbeds, and stone borders in Denham Springs, LA. See real before-and-afters from Southern Buck Lawn. Free quote at (225) 369-4434.',
    intro: [
      'Our landscape and mulch work shows up all over Denham Springs, and the before-and-afters speak for themselves. We cut clean bed lines, lay deep mulch over weed barrier, set stone borders, and plant color that holds up to the humidity.',
      'The damp clay here is rough on root systems, so we plan drainage and plant placement around it. The beds we build drain right and stay sharp instead of turning to mush after a hard rain.',
    ],
  },
  {
    slug: 'landscape-design-baton-rouge',
    serviceSlug: 'landscape-design',
    citySlug: 'baton-rouge',
    serviceTitle: 'Landscape Design & Mulch',
    cityName: 'Baton Rouge',
    primaryKeyword: 'landscaping Baton Rouge',
    h1: 'Landscape Design & Mulch in Baton Rouge, LA',
    metaTitle: 'Landscaping, Mulch & Flowerbeds in Baton Rouge, LA',
    metaDescription:
      'Custom flowerbeds, mulch, and stone borders in Baton Rouge, LA. Curb appeal for homes that hold a high bar. Southern Buck Lawn. Free quote at (225) 369-4434.',
    intro: [
      'Landscaping in Baton Rouge has to clear a high bar, and we build to it. Clean curved bed lines, deep mulch, stone and block borders, crape myrtles, gardenias, and seasonal color planned around your sun and drainage.',
      'From Garden District character homes to the busier corridors, we match the plan to the property so it looks intentional, not generic. The borders give your mower a clean line and keep mulch off the grass.',
    ],
  },
  {
    slug: 'landscape-design-livingston-parish',
    serviceSlug: 'landscape-design',
    citySlug: 'livingston-parish',
    serviceTitle: 'Landscape Design & Mulch',
    cityName: 'Livingston Parish',
    primaryKeyword: 'landscaping Livingston Parish',
    h1: 'Landscape Design & Mulch in Livingston Parish, LA',
    metaTitle: 'Landscaping, Mulch & Flowerbeds in Livingston Parish, LA',
    metaDescription:
      'Flowerbeds, mulch, and stone borders for properties across Livingston Parish, LA. Heat-tough plants and solid weed barrier. Southern Buck Lawn. (225) 369-4434.',
    intro: [
      'On Livingston Parish properties, good landscaping has to fight back against fast wild growth. We build beds with solid weed barrier under deep mulch, set borders that hold their line, and plant heat-tough choices that handle the open sun.',
      'Bigger lots mean bigger beds and longer borders, and we scale the plan to fit. The result reads as a finished, cared-for property, even way out past the subdivisions.',
    ],
  },

  // ---------- COMMERCIAL GROUNDS ----------
  {
    slug: 'commercial-grounds-baton-rouge',
    serviceSlug: 'commercial-grounds',
    citySlug: 'baton-rouge',
    serviceTitle: 'Commercial Grounds Maintenance',
    cityName: 'Baton Rouge',
    primaryKeyword: 'commercial landscaping Baton Rouge',
    h1: 'Commercial Grounds Maintenance in Baton Rouge, LA',
    metaTitle: 'Commercial Lawn & Grounds Maintenance in Baton Rouge, LA',
    metaDescription:
      'Licensed, insured commercial grounds care in Baton Rouge, LA. HOAs, offices, retail, and churches kept sharp on a set schedule. Southern Buck Lawn. (225) 369-4434.',
    intro: [
      'Commercial grounds maintenance in Baton Rouge keeps your property looking open for business. We handle retail centers, offices, churches, and HOA common areas, trimmed and edged on a schedule that works around your hours, not ours.',
      'You get one point of contact, clean digital invoices, and full commercial liability and workers comp on file, with a certificate ready the same day your property manager asks.',
    ],
  },
  {
    slug: 'commercial-grounds-denham-springs',
    serviceSlug: 'commercial-grounds',
    citySlug: 'denham-springs',
    serviceTitle: 'Commercial Grounds Maintenance',
    cityName: 'Denham Springs',
    primaryKeyword: 'commercial lawn service Denham Springs',
    h1: 'Commercial Grounds Maintenance in Denham Springs, LA',
    metaTitle: 'Commercial Lawn & Grounds Maintenance in Denham Springs, LA',
    metaDescription:
      'Dependable commercial grounds care in Denham Springs, LA. Retail, office, and HOA properties kept clean on a set schedule. Southern Buck Lawn. (225) 369-4434.',
    intro: [
      'Commercial grounds maintenance in Denham Springs starts with reliability. Your storefront, office, or HOA entrance gets mowed, edged, and cleaned on a set schedule, so the first thing customers see says you have your act together.',
      'We work around your business hours and keep one clean point of contact. When a storm rolls through, we clear debris fast so you open on time.',
    ],
  },
  {
    slug: 'commercial-grounds-walker',
    serviceSlug: 'commercial-grounds',
    citySlug: 'walker',
    serviceTitle: 'Commercial Grounds Maintenance',
    cityName: 'Walker',
    primaryKeyword: 'commercial lawn service Walker LA',
    h1: 'Commercial Grounds Maintenance in Walker, LA',
    metaTitle: 'Commercial Lawn & Grounds Maintenance in Walker, LA',
    metaDescription:
      'Local commercial grounds care in Walker, LA. Retail, office, and HOA properties kept sharp by a hometown crew. Southern Buck Lawn. Free quote at (225) 369-4434.',
    intro: [
      'For commercial grounds maintenance in Walker, hometown matters. We are based right here, so your property gets steady, on-time service from a crew that lives in the same town your customers do. Retail, office, church, and HOA grounds, all on one schedule.',
      'One point of contact, clean digital billing, and full commercial coverage on file. We keep the front of your business looking the way it should, year round.',
    ],
  },
];

export function getZipper(slug: string) {
  return ZIPPER_COMBOS.find((z) => z.slug === slug);
}

// Builds page-specific FAQs for a zipper combo from its service and city.
// Each combo gets questions tied to the exact service and town, not boilerplate.
import { FAQ } from '@/lib/types';

const SERVICE_FAQ_BITS: Record<string, { cost: string; how: string }> = {
  'lawn-mowing': {
    cost: 'Weekly mowing runs about $45 to $85 a visit, set by lot size. We give you a firm number after a quick look, free.',
    how: 'Every visit you get a mow, string trimming, a hard edge along the drive and walks, then a full blow-off of every clipping.',
  },
  'weed-control': {
    cost: 'Most weed-and-feed rounds run $65 to $110 per application, and we recommend about six rounds a year. The estimate is free.',
    how: 'We pair slow-release granular fertilizer with targeted sprays and time a late-winter pre-emergent to stop crabgrass before it sprouts.',
  },
  'landscape-design': {
    cost: 'Bed and mulch projects start around $450 and scale with bed size and plant choices. We quote it after a walk-through, free.',
    how: 'We cut clean bed lines, lay deep mulch over weed barrier, set stone or block borders, and plant heat-tough choices for South Louisiana.',
  },
  'commercial-grounds': {
    cost: 'Commercial contracts are custom, and most start around $250 a month depending on the property. The estimate is always free.',
    how: 'We work around your business hours with one point of contact, a set schedule, clean digital invoices, and full insurance on file.',
  },
};

export function getZipperFaqs(combo: ZipperCombo): FAQ[] {
  const bits = SERVICE_FAQ_BITS[combo.serviceSlug];
  const city = combo.cityName;
  const svc = combo.serviceTitle.toLowerCase();
  return [
    {
      question: `How much does ${svc} cost in ${city}?`,
      answer: bits.cost,
    },
    {
      question: `What is included with ${svc} in ${city}?`,
      answer: bits.how,
    },
    {
      question: `Are you local to ${city}?`,
      answer: `Yes. Southern Buck Lawn is based in Walker and serves ${city} every week. You get the same crew on a set day, licensed and insured, with a callback inside 24 hours.`,
    },
  ];
}

export { CITY_SHORT };
