'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { trackEvent } from '@/lib/ga';

function PageViewsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const query = searchParams?.toString();
    trackEvent('page_view', {
      page_path: query ? `${pathname}?${query}` : pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

function PageViews() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <PageViewsInner />
    </Suspense>
  );
}

// Logs taps on any tel: or sms: link, sitewide.
function TapTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const link = el?.closest('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:')) {
        trackEvent('phone_call', { link_url: href, page_path: window.location.pathname });
      } else if (href.startsWith('sms:')) {
        trackEvent('text_click', { link_url: href, page_path: window.location.pathname });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}

export default function GaTracker() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-HYJ6QH6Y1D"
      />
      <PageViews />
      <TapTracking />
    </>
  );
}
