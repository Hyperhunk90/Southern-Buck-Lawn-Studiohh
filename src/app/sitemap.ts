import type { MetadataRoute } from 'next';
import { SERVICES } from '@/data/services';
import { LOCATIONS } from '@/data/locations';
import { ZIPPER_COMBOS } from '@/data/zipper';
import { POSTS } from '@/data/blog';
import { SITE } from '@/data/site';

// Bump this when page content meaningfully changes. Using a stable date
// (instead of `new Date()` on every build) keeps lastmod honest so crawlers
// don't see every URL as "modified" on each deploy.
const LAST_CONTENT_UPDATE = new Date('2026-06-17');

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const staticPages = ['', '/services', '/service-areas', '/blog', '/landscape-lighting', '/quote', '/contact'].map((p) => ({
    url: `${base}${p}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
  }));
  const servicePages = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));
  const locationPages = LOCATIONS.map((l) => ({
    url: `${base}/service-areas/${l.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));
  const zipperPages = ZIPPER_COMBOS.map((z) => ({
    url: `${base}/${z.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));
  const blogPages = POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  return [...staticPages, ...servicePages, ...locationPages, ...zipperPages, ...blogPages];
}
