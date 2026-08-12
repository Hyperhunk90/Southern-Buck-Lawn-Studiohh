import { CircleHelp } from 'lucide-react';
import { FAQ } from '@/lib/types';

// Renders a visible FAQ block plus FAQPage structured data.
// Use on any page that has a real, page-specific FAQ list.
export default function FaqSection({
  faqs,
  heading = 'Questions Folks Ask',
}: {
  faqs: FAQ[];
  heading?: string;
}) {
  if (!faqs || faqs.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="pt-2 font-anton text-2xl uppercase text-primary">{heading}</h2>
      <div className="mt-4 space-y-4">
        {faqs.map((f) => (
          <div key={f.question} className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm">
            <p className="flex items-start gap-2 font-anton text-lg uppercase leading-tight text-midnight-moss">
              <CircleHelp className="mt-0.5 h-5 w-5 flex-shrink-0 text-safety-orange" /> {f.question}
            </p>
            <p className="mt-2 font-barlow text-lg text-gray-700">{f.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
