import type { ReactNode } from 'react';
import { Leaf, Scissors, Building2, Sprout, Lightbulb, HardHat } from 'lucide-react';

export const serviceIcons: Record<string, ReactNode> = {
  'lawn-mowing': <Scissors className="h-7 w-7" />,
  'weed-control': <Sprout className="h-7 w-7" />,
  'landscape-design': <Leaf className="h-7 w-7" />,
  'commercial-grounds': <Building2 className="h-7 w-7" />,
};

export const extraServices = [
  {
    href: '/landscape-lighting',
    title: 'Landscape Lighting',
    summary: 'Low-voltage lighting that extends the look of your beds and walks into the evening — planned and installed by Michael.',
    icon: <Lightbulb className="h-7 w-7" />,
    image: '/images/sbl-project-photo-02.webp',
    imageAlt: 'Brick house at dusk with path lights along the walk, Southern Buck Lawn lighting work.',
    cta: 'Request a lighting consultation',
  },
  {
    href: '/property-preservation-reo-services',
    title: 'Property Preservation & REO',
    summary: 'Trash-outs, yard recovery, board-ups, and photo documentation for banks, brokers, and asset managers on the Walker route.',
    icon: <HardHat className="h-7 w-7" />,
    image: '/images/residential-brush-cleanup.webp',
    imageAlt: 'Pile of cut branches on a driveway after residential hedge and tree cleanup.',
    cta: 'Submit a preservation request',
  },
];

export const gallery = [
  { src: '/images/residential-lawn-stripes-magnum.webp', alt: 'Freshly striped green residential lawn with an orange Bad Boy Magnum zero-turn parked by the driveway.', w: 1600, h: 901 },
  { src: '/images/azalea-bed-after-black-mulch.webp', alt: 'Fresh black-mulch bed with red azaleas and clean black edging along a light stucco house.', w: 1400, h: 3031 },
  { src: '/images/commercial-property-grounds.webp', alt: 'Maintained commercial building lawn and beds with Southern Buck Lawn trailer and zero-turn in view.', w: 1600, h: 740 },
  { src: '/images/walker-lawn-stripes-after.webp', alt: 'Freshly mowed green lawn with diagonal stripes beside a white brick house in Walker, Louisiana.', w: 788, h: 1400 },
];

export const processSteps = [
  { title: '1. Request a free estimate', body: 'Tell me about the property, what you need, and where it sits. Use the quote form or call.' },
  { title: '2. Talk through the details', body: 'I review your request and call you back to clarify scope, timing, and what the yard actually needs.' },
  { title: '3. Get a clear next step', body: 'You get a free estimate and a straightforward plan — no pressure, no mystery add-ons.' },
  { title: '4. I do the work', body: 'Michael shows up, does the job, and leaves the place looking cared for. Solo operator, not a handoff.' },
];

export const faqs = [
  {
    q: 'What types of properties do you service?',
    a: 'Homes, small commercial sites, churches, HOA common areas on the route, and REO / property preservation work for banks, brokers, and asset managers. If you are not sure it fits, ask — I will tell you straight.',
  },
  {
    q: 'Do you offer recurring lawn maintenance?',
    a: 'Yes. Weekly in peak season for most Walker-area lawns, with every-other-week options when growth slows. Submit the form with your preferred frequency.',
  },
  {
    q: 'Do you install landscape lighting?',
    a: 'Yes. Low-voltage landscape lighting for homes and commercial properties on the route. I can talk through visibility, curb appeal, and evening presentation on the lighting page.',
  },
  {
    q: 'Do you handle property preservation requests?',
    a: 'Yes. Trash-outs, yard recovery, winter-secure / board-ups, and photo documentation for qualified real estate and asset professionals. Include address, scope, and timing in the request.',
  },
  {
    q: 'How do I request a free estimate?',
    a: 'Use the quote form or call (225) 369-4434. Michael calls back within 24 hours about the next step.',
  },
  {
    q: 'What areas do you serve?',
    a: 'Home turf is Walker, Denham Springs, and Watson. Livingston Parish lots on that corridor are fair game. Baton Rouge is not a home market. Submit your address and I will confirm availability.',
  },
];

export const buckPoints = [
  'Owner-operated since June 2024',
  'Same day every week on the route',
  'Free, no-pressure estimates',
  'Insured — general liability',
];
