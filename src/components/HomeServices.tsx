import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { serviceIcons, extraServices } from '@/data/homepage';

const SERVICE_CARD_SIZES =
  '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2rem), 380px';

// Homepage card photos. Service pages keep their own hero image from SERVICES.
const HOME_CARD_IMAGES: Record<string, { image: string; imageAlt: string }> = {
  'lawn-mowing': {
    image: '/images/walker-la-weekly-lawn-mowing-stripes.webp',
    imageAlt: 'Weekly lawn mowing in Walker, LA with even light-and-dark stripes across a wide green yard.',
  },
  'weed-control': {
    image: '/images/satsuma-la-commercial-bed-weed-removal.webp',
    imageAlt: 'Pulled weeds piled on a tarp beside a cleaned-out commercial landscape bed in Satsuma, LA.',
  },
  'landscape-design': {
    image: '/images/clinton-la-commercial-flower-bed-mulch.webp',
    imageAlt: 'Commercial front bed in Clinton, LA with red and pink flowering shrubs, fresh mulch, and a clean lawn edge.',
  },
  'commercial-grounds': {
    image: '/images/satsuma-la-rv-resort-commercial-grounds.webp',
    imageAlt: 'Commercial grounds at an RV resort in Satsuma, LA with palm trees, planted beds, and a walkway by the lazy river.',
  },
};

type Card = {
  key: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: React.ReactNode;
  title: string;
  summary: string;
  cta: string;
};

function ServiceCard({ card, tilt }: { card: Card; tilt: string }) {
  return (
    <Link
      href={card.href}
      className={`group flex flex-col overflow-hidden rounded-xl border-2 border-cream-line bg-surface shadow-[0_8px_0_-2px_rgba(168,135,90,0.35)] transition-all hover:-translate-y-2 hover:shadow-[0_14px_0_-2px_rgba(168,135,90,0.45)] ${tilt}`}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes={SERVICE_CARD_SIZES}
          quality={60}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-3 left-4 inline-flex rounded-lg border-2 border-cream-line bg-cream/95 p-3 text-primary shadow">
          {card.icon}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-14 w-14 -scale-x-100 bg-contain bg-no-repeat opacity-80"
          style={{ backgroundImage: 'url(/images/decor/twig-corner.svg)' }}
        />
      </div>
      <div className="flex grow flex-col p-6">
        <h3 className="font-anton text-3xl leading-none text-midnight-moss">{card.title}</h3>
        <p className="mt-2 grow font-archivo text-base text-bark">{card.summary}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-archivo text-sm font-extrabold uppercase tracking-wide text-safety-orange-deep transition-all group-hover:gap-3">
          {card.cta} <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export default function HomeServices() {
  const cards: Card[] = [
    ...SERVICES.map((s) => ({
      key: s.slug,
      href: `/services/${s.slug}`,
      image: HOME_CARD_IMAGES[s.slug]?.image ?? s.image,
      imageAlt: HOME_CARD_IMAGES[s.slug]?.imageAlt ?? s.imageAlt,
      icon: serviceIcons[s.slug],
      title: s.title,
      summary: s.quickSummary,
      cta: 'Explore this service',
    })),
    ...extraServices.map((s) => ({
      key: s.href,
      href: s.href,
      image: s.image,
      imageAlt: s.imageAlt,
      icon: s.icon,
      title: s.title,
      summary: s.summary,
      cta: s.cta,
    })),
  ];

  const tilts = ['-rotate-1', 'rotate-1', 'rotate-0', 'rotate-1', '-rotate-1', 'rotate-0'];

  return (
    <section id="services" className="relative bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-rye text-lg text-safety-orange-deep">What I do</p>
          <h2 className="mt-2 font-anton text-5xl tracking-wide text-midnight-moss sm:text-6xl">
            Care for the Properties You Manage or Call Home
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-safety-orange" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <ServiceCard key={card.key} card={card} tilt={tilts[i % tilts.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}
