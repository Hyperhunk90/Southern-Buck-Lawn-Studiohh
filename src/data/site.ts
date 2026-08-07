// Central business info for Southern Buck Lawn.
export const SITE = {
  name: 'Southern Buck Lawn',
  owner: 'Michael Dantone',
  tagline: 'Southern Care. The Landscape Mayor.',
  phone: '(225) 369-4434',
  phoneHref: 'tel:+12253694434',
  email: 'SBL@Southernbucklawn.com',
  emailHref: 'mailto:SBL@Southernbucklawn.com',
  street: '28790 Brett Dr',
  city: 'Walker',
  region: 'LA',
  regionFull: 'Louisiana',
  postalCode: '70785',
  // Geo coordinates for 28790 Brett Dr, Walker, LA (used in schema + map).
  geo: { lat: 30.4849, lng: -90.8662 },
  url: 'https://southernbucklawn.com',
  // Real hours from the Google Business Profile.
  hours: [
    { days: 'Monday – Friday', time: '6:00 AM – 6:30 PM' },
    { days: 'Saturday', time: '6:00 AM – 6:00 PM' },
    { days: 'Sunday', time: '7:00 AM – 4:00 PM' },
  ],
  // Primary GBP category.
  primaryCategory: 'Lawn care service',
  serviceAreas: ['Walker', 'Denham Springs', 'Baton Rouge', 'Gonzales', 'Livingston Parish'],
  social: {
    google: 'https://share.google/KjUM9ViEKjTK29ETk',
    facebook: 'https://facebook.com/SouthernBuckLawn',
    yelp: 'https://www.yelp.com/biz/southern-buck-lawn-walker',
    nextdoor: '#',
    bbb: 'https://www.bbb.org/us/la/walker/profile/lawn-care/southern-buck-lawn-0835-90048199',
  },
};

export const SERVICE_NAV = [
  { label: 'Lawn Mowing & Edging', href: '/services/lawn-mowing' },
  { label: 'Weed Control & Fertilization', href: '/services/weed-control' },
  { label: 'Landscape Design & Mulch', href: '/services/landscape-design' },
  { label: 'Commercial Grounds', href: '/services/commercial-grounds' },
];

export const AREA_NAV = [
  { label: 'Walker, LA', href: '/service-areas/walker' },
  { label: 'Denham Springs, LA', href: '/service-areas/denham-springs' },
  { label: 'Baton Rouge, LA', href: '/service-areas/baton-rouge' },
  { label: 'Livingston Parish, LA', href: '/service-areas/livingston-parish' },
];
