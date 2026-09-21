import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import FramedPhoto from '@/components/FramedPhoto';

export default function HomeHeroWhy() {
  return (
    <section className="kraft-band py-16 text-cream">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-rye text-lg text-sage">Why folks call me back</p>
            <h2 className="mt-2 font-anton text-5xl leading-[0.95] tracking-wide sm:text-6xl">
              Detailed Work for People Who Notice the Difference
            </h2>
            <p className="mt-4 max-w-2xl font-archivo text-lg leading-relaxed text-cream/85">
              Rushed service leaves missed edges, inconsistent results, and more work later. I focus on presentation, clear communication, and service that respects the value of your property — whether that is a front lawn you are proud of or a commercial entrance that has to look open for business.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Detailed service instead of a rushed route cut',
                'Reliable recurring maintenance on a set day',
                'Residential and commercial property experience',
                'Landscape lighting with an electrical background',
                'Property preservation support for real estate pros',
                'Local route density in Walker, Denham Springs, and Watson',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-archivo text-base font-semibold text-cream">
                  <Check className="mt-1 h-5 w-5 flex-none text-orange-hot" /> {item}
                </li>
              ))}
            </ul>
            <Link
              href="/quote"
              className="mt-9 inline-flex items-center gap-2 rounded-lg border-2 border-midnight-moss/20 bg-safety-orange px-7 py-4 font-btn text-lg uppercase tracking-wide text-midnight-moss shadow-[0_6px_0_0_rgba(20,25,15,0.4)] transition-transform hover:-translate-y-0.5"
            >
              Request a Free Estimate <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <FramedPhoto
              src="/images/walker-lawn-stripes-after.webp"
              alt="Freshly mowed lawn with clean mowing stripes after a Southern Buck Lawn visit."
              aspect="aspect-[4/5]"
              sizes="(max-width: 1023px) 80vw, 30vw"
              corner="leaf"
              cornerPos="tr"
              tape
              className="rotate-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
