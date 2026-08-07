import { MapPin } from 'lucide-react';

export default function ServiceAreaMap({ label = 'Our Service Area' }: { label?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-primary/10 px-5 py-3">
        <MapPin className="h-5 w-5 text-safety-orange" />
        <span className="font-anton text-lg uppercase tracking-wider text-primary">{label}</span>
      </div>
      <div className="relative h-80 w-full">
        {/* Map centered on the business address in Walker.
            To use your exact Google Business Profile pin, replace the src below with
            the iframe URL from your GBP listing: Share > Embed a map > copy src. */}
        <iframe
          title="Southern Buck Lawn service area map"
          src="https://maps.google.com/maps?q=28790%20Brett%20Dr%2C%20Walker%2C%20LA%2070785&t=&z=12&ie=UTF8&iwloc=&output=embed"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
