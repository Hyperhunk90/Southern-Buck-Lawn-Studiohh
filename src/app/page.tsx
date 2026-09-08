import type { Metadata } from 'next';
import { SITE, DEFAULT_OG_IMAGE } from '@/data/site';
import BusinessJsonLd from '@/components/BusinessJsonLd';
import HomePageBody from '@/components/HomePageBody';

export const metadata: Metadata = {
  title: {
    absolute: 'Lawn Care & Landscaping in Walker, LA | Southern Buck Lawn',
  },
  description:
    'Owner-operated lawn care, landscaping, landscape lighting, and property preservation in Walker, Denham Springs, and Watson. Free estimates. Call (225) 369-4434.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE.url,
    title: 'Lawn Care & Landscaping in Walker, LA | Southern Buck Lawn',
    description:
      'Owner-operated lawn care and landscaping in Walker, Denham Springs, and Watson. Free estimates.',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lawn Care & Landscaping in Walker, LA | Southern Buck Lawn',
    images: [{ url: DEFAULT_OG_IMAGE.url, alt: DEFAULT_OG_IMAGE.alt }],
  },
};

export default function Home() {
  return (
    <>
      <BusinessJsonLd />
      <HomePageBody />
    </>
  );
}
