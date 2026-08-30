// LEGACY city×service URLs. Kept only so generateStaticParams still
// resolves old indexed links. Do not add combos. next.config and
// [zipper]/page permanentRedirect send every slug to /services/{serviceSlug}.

export interface ZipperCombo {
  slug: string;
  serviceSlug: string;
}

export const ZIPPER_COMBOS: ZipperCombo[] = [
  { slug: 'lawn-mowing-walker', serviceSlug: 'lawn-mowing' },
  { slug: 'lawn-mowing-denham-springs', serviceSlug: 'lawn-mowing' },
  { slug: 'lawn-mowing-baton-rouge', serviceSlug: 'lawn-mowing' },
  { slug: 'lawn-mowing-livingston-parish', serviceSlug: 'lawn-mowing' },
  { slug: 'weed-control-walker', serviceSlug: 'weed-control' },
  { slug: 'weed-control-denham-springs', serviceSlug: 'weed-control' },
  { slug: 'weed-control-baton-rouge', serviceSlug: 'weed-control' },
  { slug: 'weed-control-livingston-parish', serviceSlug: 'weed-control' },
  { slug: 'landscape-design-walker', serviceSlug: 'landscape-design' },
  { slug: 'landscape-design-denham-springs', serviceSlug: 'landscape-design' },
  { slug: 'landscape-design-baton-rouge', serviceSlug: 'landscape-design' },
  { slug: 'landscape-design-livingston-parish', serviceSlug: 'landscape-design' },
  { slug: 'commercial-grounds-baton-rouge', serviceSlug: 'commercial-grounds' },
  { slug: 'commercial-grounds-denham-springs', serviceSlug: 'commercial-grounds' },
  { slug: 'commercial-grounds-walker', serviceSlug: 'commercial-grounds' },
  { slug: 'commercial-grounds-livingston-parish', serviceSlug: 'commercial-grounds' },
];

export function getZipper(slug: string) {
  return ZIPPER_COMBOS.find((z) => z.slug === slug);
}
