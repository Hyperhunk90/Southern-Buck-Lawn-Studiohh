import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Phone, MapPin, Clock } from 'lucide-react';
import { SITE, SERVICE_NAV, AREA_NAV } from '@/data/site';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';

export default function Footer() {
  return (
    <footer className="border-t-8 border-primary bg-midnight-moss pb-8 pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="mb-5 flex w-fit items-center gap-3">
              <Image src="/images/southern-buck-lawn-logo.png" alt="Southern Buck Lawn logo" width={64} height={56} className="h-16 w-auto" />
              <span className="font-anton text-2xl tracking-wide">SOUTHERN BUCK <span className="text-safety-orange">LAWN</span></span>
            </Link>
            <p className="mb-6 max-w-md font-barlow text-lg leading-relaxed text-white/70">
              Lawn care from Walker. Run by Michael Dantone. Weekly route is Walker, Denham Springs, and Watson. Same day, work I put my name on.
            </p>
            <div className="space-y-2 font-barlow">
              <a href={SITE.phoneHref} className="flex items-center gap-2 text-white/80 hover:text-safety-orange">
                <Phone className="h-4 w-4 text-safety-orange" /> {SITE.phone}
              </a>
              <ObfuscatedEmail className="flex items-center gap-2 text-white/80 hover:text-safety-orange" />
              <p className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4 text-safety-orange" /> {SITE.street}, {SITE.city}, {SITE.region} {SITE.postalCode}
              </p>
              <p className="flex items-center gap-2 text-white/80">
                <Clock className="h-4 w-4 text-safety-orange" /> {SITE.hours.map(({ days, time }) => `${days} ${time}`).join(', ')}
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-5 font-anton text-xl uppercase tracking-wider text-safety-orange">Services</h2>
            <ul className="space-y-3">
              {SERVICE_NAV.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="flex items-center gap-1 font-barlow text-white/70 hover:text-safety-orange">
                    <ChevronRight className="h-4 w-4 text-sage" />
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/landscape-lighting" className="flex items-center gap-1 font-barlow text-white/70 hover:text-safety-orange">
                  <ChevronRight className="h-4 w-4 text-sage" />
                  Landscape Lighting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-5 font-anton text-xl uppercase tracking-wider text-safety-orange">
              <Link href="/service-areas" className="hover:text-orange-hot">Service Areas</Link>
            </h2>
            <ul className="space-y-3">
              {AREA_NAV.map((a) => (
                <li key={a.href}>
                  <Link href={a.href} className="flex items-center gap-1 font-barlow text-white/70 hover:text-safety-orange">
                    <ChevronRight className="h-4 w-4 text-safety-orange" />
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="font-barlow text-sm tracking-wider text-white/50">
            &copy; {new Date().getFullYear()} Southern Buck Lawn. All rights reserved. Walker, Louisiana.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 font-barlow text-sm tracking-wider text-white/60">
            <Link href="/about" className="hover:text-safety-orange">About</Link>
            <Link href="/privacy" className="hover:text-safety-orange">Privacy</Link>
            <Link href="/gallery" className="hover:text-safety-orange">Project Gallery</Link>
            <Link href="/blog" className="hover:text-safety-orange">Blog</Link>
            <Link href="/quote" className="hover:text-safety-orange">Free Quote</Link>
            <Link href="/contact" className="hover:text-safety-orange">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
