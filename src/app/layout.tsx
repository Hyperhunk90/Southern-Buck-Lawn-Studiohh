import type { Metadata } from 'next';
import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import ChatWidget from '@/components/ChatWidget';
import GaTracker from '@/components/GaTracker';
import { SITE } from '@/data/site';
import { GOOGLE_RATING, REVIEWS } from '@/data/reviews';

// Landscape image used as the default social-share preview. 1920x1080 (16:9)
// renders cleanly as a large summary card on Facebook, X, and LinkedIn.
const OG_IMAGE = {
  url: '/images/hero-background-lawn-care-louisiana.webp',
  width: 1920,
  height: 1080,
  alt: 'Fresh mulch bed, stone border, and healthy green lawn by Southern Buck Lawn in Louisiana',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Southern Buck Lawn | Lawn Care & Landscaping in Walker, LA',
    template: '%s | Southern Buck Lawn',
  },
  description:
    'Southern Buck Lawn delivers weekly mowing, weed control, and landscape design across Walker, Denham Springs, Baton Rouge, and Livingston Parish. Local, licensed, and insured. Free quotes.',
  keywords:
    'lawn care Walker LA, lawn service Baton Rouge, landscaping Denham Springs, lawn mowing Livingston Parish',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Southern Buck Lawn | Lawn Care & Landscaping in Walker, LA',
    description:
      'Weekly mowing, weed control, and landscape design across Walker, Denham Springs, Baton Rouge, and Livingston Parish.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Southern Buck Lawn | Lawn Care & Landscaping in Walker, LA',
    description:
      'Weekly mowing, weed control, and landscape design across Walker, Denham Springs, Baton Rouge, and Livingston Parish.',
    images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
  },
  robots: { index: true, follow: true },
};

const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LandscapingBusiness',
  name: SITE.name,
  image: `${SITE.url}/images/southern-buck-lawn-logo.png`,
  '@id': `${SITE.url}/#business`,
  url: SITE.url,
  telephone: '+12253694434',
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
  sameAs: [SITE.social.google, SITE.social.facebook, SITE.social.yelp, SITE.social.bbb],
  areaServed: SITE.serviceAreas.map((a) => ({ '@type': 'City', name: a })),
  // Real Google Business Profile rating + reviews (src/data/reviews.ts) so
  // Google can render star-rating rich snippets in search results.
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: GOOGLE_RATING.score,
    reviewCount: GOOGLE_RATING.count,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --font-anton-src: 'Anton', 'Arial Narrow', 'Arial', sans-serif;
            --font-archivo-src: 'Archivo', 'Arial', sans-serif;
            --font-caveat-src: 'Caveat', 'Comic Sans MS', cursive;
          }
        `}} />
      </head>
      <body>
        <script
          key="ld-json-root"
          id="ld-json-root"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([businessJsonLd, websiteJsonLd]) }}
        />
        <SiteChrome>{children}</SiteChrome>
        <ChatWidget />
        <GaTracker />
      </body>
    </html>
  );
}
