import { SITE } from '@/data/site';

// Homepage-only. Do not mount this on 404s or inner pages.
export default function BusinessJsonLd() {
  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    image: `${SITE.url}/images/southern-buck-lawn-logo.png`,
    '@id': `${SITE.url}/#business`,
    url: SITE.url,
    telephone: SITE.phoneInternational,
    email: SITE.email,
    founder: SITE.owner,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.street,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    hasMap: SITE.social.google,
    sameAs: [SITE.social.google, SITE.social.facebook, SITE.social.yelp, SITE.social.bbb].filter(Boolean),
    areaServed: SITE.serviceAreas.map((area) => ({
      '@type': 'City',
      name: `${area}, Louisiana`,
    })),
    knowsAbout: [
      'Lawn mowing and edging',
      'Weed control and fertilization',
      'Landscape design and mulch installation',
      'Commercial grounds maintenance',
      'HOA grounds maintenance',
      'Landscape lighting',
      'Property preservation and REO services',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '06:00',
        closes: '18:30',
      },
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    publisher: { '@id': `${SITE.url}/#business` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  );
}
