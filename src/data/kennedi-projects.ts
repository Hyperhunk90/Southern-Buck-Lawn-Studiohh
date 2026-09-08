import { Project } from '@/lib/types';

/** Kennedi front-bed job — Denham Springs / Seigle Village, Fri Sep 4 2026. */
export const KENNEDI_PROJECTS: Project[] = [
  // Kennedi front-bed job — Denham Springs / Seigle Village, Fri Sep 4 2026.
  // Front-bed cleanup, black mulch, steel edging, brick out, crape work. Honest location: Denham Springs (not Walker).
  {
    id: 'kennedi-denham-front-before',
    title: 'Kennedi Front Bed — Before',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/kennedi-denham-front-before.webp',
    imageAlt:
      'Overgrown front flower bed with weeds and a crape myrtle along a brick house in Denham Springs, LA before cleanup.',
    isBeforeAfter: true,
    aspectRatio: 'tall',
    description:
      'Front elevation bed in Denham Springs (Seigle Village) before cleanup — overgrown weeds, no defined edge.',
    details: ['True before for the finished front bed', 'Crape myrtle in place', 'Brick house front'],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'kennedi-denham-front-after',
    title: 'Kennedi Front Bed — After',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/kennedi-denham-front-after.webp',
    imageAlt:
      'Finished Denham Springs front bed with fresh black mulch, steel edging, and ornamental grasses along a brick house.',
    isBeforeAfter: true,
    aspectRatio: 'tall',
    description:
      'Same Denham Springs front bed after — black mulch, steel edging, crape cleaned up, grasses in.',
    details: ['Black mulch and steel edging', 'True after for the front before', 'Seigle Village, Denham Springs'],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'kennedi-denham-front-after-angle',
    title: 'Kennedi Front Bed — After Angle',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/kennedi-denham-front-after-angle.webp',
    imageAlt:
      'Angled view of the finished black-mulch front bed with steel edging and a crape myrtle at a Denham Springs brick house.',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description:
      'Additional after angle of the finished Denham Springs front bed — black mulch, steel edge, brick facade.',
    details: ['Same Kennedi front bed after', 'Alternate angle'],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'kennedi-denham-corner-before',
    title: 'Kennedi Corner Bed — Before',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/kennedi-denham-corner-before.webp',
    imageAlt:
      'Overgrown corner bed with a pink-flowering crape myrtle and weedy plastic edging at a Denham Springs brick house.',
    isBeforeAfter: true,
    aspectRatio: 'tall',
    description:
      'Corner/side bed before — pink crape myrtle, weeds, tired plastic edging. Same Kennedi Denham Springs job.',
    details: ['True before for the mulched corner', 'Pink crape myrtle'],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'kennedi-denham-corner-after',
    title: 'Kennedi Corner Bed — After',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/kennedi-denham-corner-after.webp',
    imageAlt:
      'Mulched corner bed with steel edging, ornamental grasses, and a cleaned-up crape myrtle in Denham Springs, LA.',
    isBeforeAfter: true,
    aspectRatio: 'tall',
    description:
      'Same corner after — black mulch, steel edging, grasses, crape work done. Denham Springs / Seigle Village.',
    details: ['Black mulch and steel edging', 'True after for the corner before'],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'kennedi-denham-walk-before',
    title: 'Kennedi Walkway Bed — Before',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/kennedi-denham-walk-before.webp',
    imageAlt:
      'Weedy walkway flower bed with leaf litter and a pink crape myrtle beside a brick house in Denham Springs, LA.',
    isBeforeAfter: true,
    aspectRatio: 'tall',
    description:
      'Walk/drive bed before cleanup — weeds, leaf litter, undefined edge. Same Kennedi Denham Springs property.',
    details: ['True before for the walkway after', 'Walk bed along brick house'],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'kennedi-denham-walk-after',
    title: 'Kennedi Walkway Bed — After',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/kennedi-denham-walk-after.webp',
    imageAlt:
      'Fresh black-mulch walkway bed with steel edging and new plantings along a Denham Springs brick house.',
    isBeforeAfter: true,
    aspectRatio: 'tall',
    description:
      'Walkway bed after — black mulch, steel edging, clean plantings. Same Kennedi front-bed job in Denham Springs.',
    details: ['Black mulch and steel edging', 'True after for the walkway before'],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'kennedi-denham-bed-prep',
    title: 'Kennedi Bed Prep',
    serviceType: 'landscape',
    serviceLabel: 'Landscape Design',
    location: 'Denham Springs, LA',
    image: '/images/kennedi-denham-bed-prep.webp',
    imageAlt:
      'Bare soil bed prep with a multi-trunk crape myrtle along a brick house in Denham Springs before black mulch.',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description:
      'Process shot — bed cleared to bare soil after brick-out and cleanup, before black mulch. Denham Springs.',
    details: ['Bed prep / process', 'Same Kennedi Denham Springs job', 'Crape work underway'],
    serviceSlug: 'landscape-design',
  },
];
