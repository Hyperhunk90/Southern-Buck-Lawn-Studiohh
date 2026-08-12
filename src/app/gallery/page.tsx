import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { SITE } from '@/data/site';
import { PROJECTS } from '@/data/projects';
import Breadcrumbs from '@/components/Breadcrumbs';
import GalleryClient from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: 'Project Gallery | Lawn Mowing, Mulch & Landscaping Photos | Southern Buck Lawn',
  description:
    'Browse real local lawn care photos, mulch installations, before-and-after flowerbed transformations, and commercial grounds maintenance across Walker, Denham Springs, and Baton Rouge, Louisiana.',
  keywords: [
    'lawn care gallery Walker LA',
    'mulch installation photos Denham Springs',
    'landscaping before and after Baton Rouge',
    'commercial lawn care photos Livingston Parish',
    'Southern Buck Lawn work gallery',
  ],
  alternates: { canonical: '/gallery' },
  openGraph: {
    url: '/gallery',
    title: 'Project Gallery | Southern Buck Lawn Work in Walker & Baton Rouge',
    description:
      'Real photos from real yards in Walker, Denham Springs, and Baton Rouge. Lawn mowing, edging, mulch installation, and landscape design.',
    images: [{ url: '/images/landscape-design-before-after-denham-springs.webp' }],
  },
};

export default function GalleryPage() {
  const imageGallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Southern Buck Lawn Project Gallery',
    description:
      'Real local lawn care, mulch installation, landscape design, and grounds maintenance work across Walker, Denham Springs, and Baton Rouge.',
    url: `${SITE.url}/gallery`,
    publisher: {
      '@type': 'LocalBusiness',
      name: SITE.name,
      telephone: SITE.phone,
      url: SITE.url,
    },
    hasPart: PROJECTS.map((p) => ({
      '@type': 'ImageObject',
      name: p.title,
      description: p.description,
      contentUrl: `${SITE.url}${p.image}`,
      caption: p.imageAlt,
    })),
  };

  return (
    <main className="min-h-screen bg-cream">
      <script
        key="ld-json-gallery"
        id="ld-json-gallery"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />

      {/* Hero Header */}
      <section className="relative border-b-8 border-primary bg-midnight-moss pb-16 pt-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs trail={[{ name: 'Project Gallery', href: '/gallery' }]} />
          </div>

          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-safety-orange/20 px-3.5 py-1 font-archivo text-xs font-bold uppercase tracking-wider text-safety-orange border border-safety-orange/30">
                <Sparkles className="h-3.5 w-3.5" />
                Real Local Work &bull; No Stock Photos
              </span>
            </div>

            <h1 className="mb-4 font-anton text-4xl uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              PROJECT GALLERY & <span className="text-safety-orange">TRANSFORMATIONS</span>
            </h1>

            <p className="mb-8 font-barlow text-lg text-white/80 leading-relaxed sm:text-xl">
              Explore real lawn care, mulch installations, before-and-after flowerbed overhauls, and commercial grounds care across Walker, Denham Springs, and Baton Rouge. Filter by service type below to see what we can do for your yard.
            </p>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-6 font-barlow text-sm font-semibold text-white/90">
              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-safety-orange" />
                <span>Real Local Project Photos</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm">
                <Star className="h-4 w-4 text-safety-orange fill-safety-orange" />
                <span>5.0 Star Rated Crew</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm col-span-2 sm:col-span-1">
                <CheckCircle2 className="h-4 w-4 text-sage" />
                <span>Owner-Led Local Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <GalleryClient />

      {/* Bottom Conversion Banner */}
      <section className="border-t border-cream-line bg-midnight-moss py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md lg:flex-row lg:p-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="mb-3 font-anton text-3xl uppercase tracking-tight text-white sm:text-4xl">
                Ready for Your Own <span className="text-safety-orange">Yard Transformation</span>?
              </h2>
              <p className="font-barlow text-lg text-white/80 leading-relaxed">
                Whether you need weekly precision mowing, fresh mulch installation, or a complete flowerbed cleanup, Michael Dantone and the Southern Buck crew are ready to learn about your property. Request a free quote online.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
              <Link
                href="/quote"
                className="flex items-center justify-center gap-2 rounded-xl bg-safety-orange px-8 py-4 font-archivo text-base font-extrabold uppercase tracking-wide text-midnight-moss shadow-xl hover:scale-105 active:scale-95 transition-all text-center"
              >
                Get a Free Quote <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={SITE.phoneHref}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 font-archivo text-base font-bold text-white hover:bg-white/20 transition-all text-center"
              >
                <Phone className="h-5 w-5 text-safety-orange" /> {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
