import type { Metadata } from 'next';
import { SITE } from '@/data/site';
import BusinessJsonLd from '@/components/BusinessJsonLd';
import HomePageBody from '@/components/HomePageBody';

export const metadata: Metadata = {
  title: {
    absolute: 'Lawn Care & Landscaping in Walker, LA | Southern Buck Lawn',
  },
  description:
    'Owner-operated lawn care, landscaping, landscape lighting, and property preservation in Walker, Denham Springs, and Watson. Free estimates. Call (225) 369-4434.',
  alternates: { canonical: '/' },
  openGraph: { url: SITE.url },
};

export default function Home() {
  return (
    <>
      <BusinessJsonLd />
      <HomePageBody />
    </>
  );
}
