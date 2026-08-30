import { SITE } from '@/data/site';
import { GOOGLE_RATING, REVIEWS } from '@/data/reviews';

// Homepage-only. Do not mount this on 404s or inner pages.
export default function BusinessJsonLd() {
  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'LandscapingBusiness'],
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: GOOGLE_RATING.score,
      reviewCount: REVIEWS.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: REVIEWS.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      reviewBody: r.text,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:00',
        closes: '18:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '06:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '07:00',
        closes: '16:00',
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
