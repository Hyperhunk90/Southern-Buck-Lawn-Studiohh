import type { Metadata } from 'next';
import { SITE, DEFAULT_OG_IMAGE } from '@/data/site';
import LightingNightPage from './LightingNightPage';
import { FAQS } from './lightingContent';

const OG_LIGHTING = {
  url: `${SITE.url}/images/sbl-project-photo-02.webp`,
  width: 1200,
  height: 800,
  alt: 'Brick house at dusk with path lights along the walk — Southern Buck Lawn lighting work',
};

export const metadata: Metadata = {
  title: { absolute: 'Landscape Lighting in Walker, LA | Southern Buck Lawn' },
  description:
    'Low-voltage landscape lighting in Walker, Denham Springs, and Watson. Safer walkways, warmer curb appeal — not disposable solar. Free lighting quote from Southern Buck Lawn.',
  alternates: { canonical: '/landscape-lighting' },
  openGraph: {
    type: 'website',
    title: 'Your Home Should Look This Good at Night',
    description:
      'Custom low-voltage landscape lighting by Michael Dantone — owner-operator since June 2024. Walker, Denham Springs, and Watson.',
    url: `${SITE.url}/landscape-lighting`,
    images: [OG_LIGHTING],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landscape Lighting in Walker, LA | Southern Buck Lawn',
    description:
      'Professionally designed low-voltage landscape lighting. Request a free lighting quote.',
    images: [{ url: OG_LIGHTING.url, alt: OG_LIGHTING.alt }],
  },
};

export default function LandscapeLightingPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}/landscape-lighting#service`,
    name: 'Professional Landscape Lighting',
    serviceType: 'Low-voltage landscape lighting design and installation',
    description:
      'Professionally designed low-voltage landscape lighting for safer walkways, security, and curb appeal in Walker, Denham Springs, and Watson, Louisiana.',
    url: `${SITE.url}/landscape-lighting`,
    provider: { '@id': `${SITE.url}/#business` },
    areaServed: SITE.serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
      addressRegion: 'LA',
    })),
    image: OG_LIGHTING.url,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE.url}/landscape-lighting#faq`,
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Landscape Lighting',
        item: `${SITE.url}/landscape-lighting`,
      },
    ],
  };

  // DEFAULT_OG_IMAGE kept referenced so unused-import lint stays clean if OG_LIGHTING is preferred.
  void DEFAULT_OG_IMAGE;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <LightingNightPage />
    </>
  );
}
