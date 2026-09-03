import type { MetadataRoute } from 'next';
import { SERVICES } from '@/data/services';
import { LOCATIONS } from '@/data/locations';
import { POSTS } from '@/data/blog';
import { SITE } from '@/data/site';

// Bump when page content meaningfully changes. Do not use `new Date()` per build.
const LAST_CONTENT_UPDATE = new Date('2026-09-03');

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const staticPages = [
    '',
    '/services',
    '/service-areas',
    '/about',
    '/privacy',
    '/blog',
    '/landscape-lighting',
    '/property-preservation-reo-services',
    '/gallery',
    '/quote',
    '/contact',
  ].map((p) => ({
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
  const blogPages = POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  // Zipper / city×service URLs are 301'd to /services/{slug} and are not listed.
  return [...staticPages, ...servicePages, ...locationPages, ...blogPages];
}
