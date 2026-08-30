import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { ZIPPER_COMBOS, getZipper } from '@/data/zipper';
import { getService } from '@/data/services';

export function generateStaticParams() {
  return ZIPPER_COMBOS.map((z) => ({ zipper: z.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ zipper: string }> }): Promise<Metadata> {
  const { zipper } = await params;
  const combo = getZipper(zipper);
  if (!combo) return {};
  return {
    title: 'Moved',
    robots: { index: false, follow: true },
    alternates: { canonical: `/services/${combo.serviceSlug}` },
  };
}

// next.config also 301s these URLs. If a request still hits the route,
// send it to the real service page instead of rendering a doorway.
export default async function ZipperPage({ params }: { params: Promise<{ zipper: string }> }) {
  const { zipper } = await params;
  const combo = getZipper(zipper);
  if (!combo) notFound();
  const service = getService(combo.serviceSlug);
  if (!service) notFound();
  permanentRedirect(`/services/${combo.serviceSlug}`);
}
