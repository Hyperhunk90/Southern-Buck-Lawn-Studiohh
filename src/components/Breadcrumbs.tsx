import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE } from '@/data/site';

export interface Crumb {
  name: string;
  href: string;
}

// Renders a visible breadcrumb trail plus BreadcrumbList structured data.
// Pass the trail without Home; Home is added automatically as the first crumb.
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const full: Crumb[] = [{ name: 'Home', href: '/' }, ...trail];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: full.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-1 font-barlow text-sm text-white/70">
        {full.map((c, i) => {
          const last = i === full.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1">
              {last ? (
                <span className="font-semibold text-safety-orange">{c.name}</span>
              ) : (
                <>
                  <Link href={c.href} className="transition-colors hover:text-safety-orange">
                    {c.name}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
