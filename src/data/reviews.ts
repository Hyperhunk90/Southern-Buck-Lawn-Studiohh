import { Review } from '@/lib/types';

// Real Google Business Profile reviews, transcribed verbatim.
// Marty Dantone is family (confirmed 2026-08-30) — do not present it on-page
// as a customer Google review. Do not invent replacements. The total below is
// the live Google Business Profile count verified 2026-09-02; only the four
// independently verified customer reviews below are reproduced on the site.
export const GOOGLE_RATING = { score: 5.0, count: 9 };

export const REVIEWS: Review[] = [
  {
    author: 'Kara Hammond',
    area: 'Google review',
    rating: 5,
    source: 'Google',
    text: 'Southern Buck Lawn did an excellent job! He took the time to explain everything clearly and made sure I understood and approved any changes before moving forward. I really appreciated the honesty and communication, no surprises, just great service and results. Highly recommend!',
  },
  {
    author: 'Angie Phillips',
    area: 'Google review',
    rating: 5,
    source: 'Google',
    text: 'We had horrible front flower beds. They look great now after Southern Buck Lawn cleared it all out, laid weed barrier and planted new shrubs and roses. I love the rocks around the border too. Definitely recommend.',
  },
  {
    author: 'Aubrey Dycus',
    area: 'Google review',
    rating: 5,
    source: 'Google',
    text: "I couldn't be happier with the yard maintenance services that Southern Buck Lawn provides! Michael is very professional, reasonably priced, and the service he and his team provide is next level! They leave my yard looking stunning each time. I highly recommend them!!",
  },
  {
    author: 'Ramsey Treadaway',
    area: 'Google review',
    rating: 5,
    source: 'Google',
    text: 'Michael did a great job on my flower beds and great prices!',
  },
];
