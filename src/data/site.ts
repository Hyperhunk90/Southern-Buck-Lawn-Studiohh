// Central business info for Southern Buck Lawn.
// Sole prop — never LLC. Home turf is Walker, Denham Springs, and Watson.
// Baton Rouge has a selective area page + AREA_NAV entry, but is NOT in City serviceAreas
// (same pattern as Livingston Parish). Core areaServed cities: Walker, Denham Springs, Watson only.
export const SITE = {
  name: 'Southern Buck Lawn',
  owner: 'Michael Dantone',
  tagline: 'Southern Care. The Landscape Mayor.',
  phone: '(225) 369-4434',
  phoneInternational: '+12253694434',
  phoneHref: 'tel:+12253694434',
  smsHref: 'sms:+12253694434',
  email: 'sbl@southernbucklawn.com',
  emailHref: 'mailto:sbl@southernbucklawn.com',
  street: '28790 Brett Dr',
  city: 'Walker',
  region: 'LA',
  regionFull: 'Louisiana',
  postalCode: '70785',
  geo: { lat: 30.4849, lng: -90.8662 },
  url: 'https://southernbucklawn.com',
  hours: [
    { days: 'Monday – Sunday', time: '6:00 AM – 6:30 PM' },
  ],
  primaryCategory: 'Lawn care service',
  serviceAreas: ['Walker', 'Denham Springs', 'Watson'],
  social: {
    google: 'https://share.google/KjUM9ViEKjTK29ETk',
    googleReview: 'https://g.page/r/Cf_J1ApLyF3gEBE/review',
    facebook: 'https://facebook.com/SouthernBuckLawn',
    yelp: 'https://www.yelp.com/biz/southern-buck-lawn-walker',
    nextdoor: '#',
    bbb: 'https://www.bbb.org/us/la/walker/profile/lawn-care/southern-buck-lawn-0835-90048199',
  },
};

/** Default Open Graph image — real Walker job photo (absolute HTTPS). */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE.url}/images/walker-lawn-stripes-after.webp`,
  width: 788,
  height: 1400,
  alt: 'Freshly mowed green lawn with diagonal stripes beside a white brick house in Walker, Louisiana.',
};

export const SERVICE_NAV = [
  { label: 'Lawn Mowing & Edging', href: '/services/lawn-mowing' },
  { label: 'Weed Control & Fertilization', href: '/services/weed-control' },
  { label: 'Landscape Design & Mulch', href: '/services/landscape-design' },
  { label: 'Property Preservation & REO', href: '/property-preservation-reo-services' },
  { label: 'Commercial Grounds', href: '/services/commercial-grounds' },
];

export const AREA_NAV = [
  { label: 'Walker, LA', href: '/service-areas/walker' },
  { label: 'Denham Springs, LA', href: '/service-areas/denham-springs' },
  { label: 'Watson, LA', href: '/service-areas/watson' },
  { label: 'Livingston Parish, LA', href: '/service-areas/livingston-parish' },
  { label: 'Baton Rouge, LA', href: '/service-areas/baton-rouge' },
];
