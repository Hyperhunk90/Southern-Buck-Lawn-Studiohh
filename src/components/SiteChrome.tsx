'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TextBubble from '@/components/TextBubble';

// Routes that render as standalone pages (no main-site nav/footer/text bubble).
// Used for advertising landing pages like /landscape-lighting.
const BARE_ROUTES = ['/landscape-lighting'];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const bare = BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));

  if (bare) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      {/* Spacer so the mobile sticky action bar never covers footer content. */}
      <div className="h-14 sm:hidden" aria-hidden />
      <TextBubble />
    </>
  );
}
