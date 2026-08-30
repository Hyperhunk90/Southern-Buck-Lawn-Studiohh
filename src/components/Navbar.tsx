'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { SITE, SERVICE_NAV, AREA_NAV } from '@/data/site';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setServicesOpen(false);
    setAreasOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b border-cream-line bg-cream transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={closeAll} className="group flex items-center gap-3">
          <Image
            src="/images/southern-buck-lawn-logo.png"
            alt="Southern Buck Lawn logo"
            width={56}
            height={49}
            className="h-14 w-auto transition-transform group-hover:scale-105"
            priority
          />
          <span className="font-anton text-2xl tracking-tight text-midnight-moss">
            SOUTHERN BUCK <span className="text-safety-orange">LAWN</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex xl:gap-2">
          <Link href="/" className="px-3 py-2 font-archivo text-base font-semibold text-primary transition-colors hover:text-safety-orange-deep">
            Home
          </Link>

          <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
            <button
              onClick={() => setServicesOpen((v) => !v)}
              onMouseEnter={() => setServicesOpen(true)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 px-3 py-2 font-archivo text-base font-semibold text-primary transition-colors hover:text-safety-orange-deep"
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && (
              <div className="absolute right-0 mt-1 w-64 rounded-xl border border-cream-line bg-white py-2 shadow-2xl">
                {SERVICE_NAV.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={closeAll}
                    className="block px-4 py-2 font-archivo text-base text-midnight-moss hover:bg-cream hover:text-safety-orange-deep"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative" onMouseLeave={() => setAreasOpen(false)}>
            <button
              onClick={() => setAreasOpen((v) => !v)}
              onMouseEnter={() => setAreasOpen(true)}
              aria-expanded={areasOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 px-3 py-2 font-archivo text-base font-semibold text-primary transition-colors hover:text-safety-orange-deep"
            >
              Service Areas
              <ChevronDown className={`h-4 w-4 transition-transform ${areasOpen ? 'rotate-180' : ''}`} />
            </button>
            {areasOpen && (
              <div className="absolute right-0 mt-1 w-60 rounded-xl border border-cream-line bg-white py-2 shadow-2xl">
                {AREA_NAV.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    onClick={closeAll}
                    className="block px-4 py-2 font-archivo text-base text-midnight-moss hover:bg-cream hover:text-safety-orange-deep"
                  >
                    {a.label}
                  </Link>
                ))}
                <Link
                  href="/service-areas"
                  onClick={closeAll}
                  className="mt-1 block border-t border-cream-line px-4 pt-2 font-archivo text-base font-bold text-safety-orange-deep hover:bg-cream"
                >
                  All Service Areas
                </Link>
              </div>
            )}
          </div>

          <Link href="/gallery" className="px-3 py-2 font-archivo text-base font-semibold text-primary transition-colors hover:text-safety-orange-deep">
            Gallery
          </Link>
          <Link href="/about" className="px-3 py-2 font-archivo text-base font-semibold text-primary transition-colors hover:text-safety-orange-deep">
            About
          </Link>
          <Link href="/blog" className="px-3 py-2 font-archivo text-base font-semibold text-primary transition-colors hover:text-safety-orange-deep">
            Blog
          </Link>
          <a
            href={SITE.phoneHref}
            className="ml-2 flex items-center gap-2 rounded-xl bg-safety-orange px-5 py-2.5 font-archivo text-base font-bold text-midnight-moss shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Phone className="h-4 w-4" /> {SITE.phone}
          </a>
        </div>

        {/* Mobile: tap-to-call + quick quote button + menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={SITE.phoneHref}
            aria-label={`Call Southern Buck Lawn at ${SITE.phone}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-cream-line text-safety-orange-deep active:scale-95"
          >
            <Phone className="h-5 w-5" />
          </a>
          <Link
            href="/quote"
            onClick={closeAll}
            className="rounded-lg bg-safety-orange px-4 py-2 font-archivo text-sm font-bold uppercase tracking-wide text-midnight-moss shadow-md active:scale-95"
          >
            Get Quote
          </Link>
          <button onClick={() => setOpen((v) => !v)} className="p-1 text-primary hover:text-safety-orange-deep" aria-label="Menu">
            {open ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-cream-line bg-cream pb-4 lg:hidden">
          <div className="space-y-1 px-3 pt-2">
            <Link href="/" onClick={closeAll} className="block rounded px-3 py-2 font-archivo text-lg font-bold text-midnight-moss hover:bg-white">
              Home
            </Link>
            <div className="border-t border-cream-line pt-2">
              <p className="px-3 py-1 font-anton text-sm uppercase tracking-wider text-safety-orange-deep">Services</p>
              {SERVICE_NAV.map((s) => (
                <Link key={s.href} href={s.href} onClick={closeAll} className="block px-5 py-2 font-archivo text-base text-midnight-moss hover:bg-white">
                  {s.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-cream-line pt-2">
              <Link href="/service-areas" onClick={closeAll} className="block px-3 py-1 font-anton text-sm uppercase tracking-wider text-safety-orange-deep hover:text-safety-orange">
                Service Areas
              </Link>
              {AREA_NAV.map((a) => (
                <Link key={a.href} href={a.href} onClick={closeAll} className="block px-5 py-2 font-archivo text-base text-midnight-moss hover:bg-white">
                  {a.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-cream-line pt-2">
              <Link href="/gallery" onClick={closeAll} className="block rounded px-3 py-2 font-archivo text-lg font-bold text-midnight-moss hover:bg-white">
                Project Gallery
              </Link>
            </div>
            <div className="border-t border-cream-line pt-2">
              <Link href="/about" onClick={closeAll} className="block rounded px-3 py-2 font-archivo text-lg font-bold text-midnight-moss hover:bg-white">
                About
              </Link>
            </div>
            <div className="border-t border-cream-line pt-2">
              <Link href="/blog" onClick={closeAll} className="block rounded px-3 py-2 font-archivo text-lg font-bold text-midnight-moss hover:bg-white">
                Blog
              </Link>
            </div>
            <div className="border-t border-cream-line pt-3">
              <a
                href={SITE.phoneHref}
                onClick={closeAll}
                className="mb-2 flex items-center justify-center gap-2 rounded-lg border border-cream-line bg-white py-3 text-center font-archivo text-lg font-bold text-midnight-moss"
              >
                <Phone className="h-5 w-5 text-safety-orange-deep" /> Call {SITE.phone}
              </a>
              <Link href="/quote" onClick={closeAll} className="block rounded-lg bg-safety-orange py-3 text-center font-archivo text-lg font-bold text-midnight-moss shadow-lg">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
