import { Project } from '@/lib/types';

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'mulch', label: 'Mulch & Flowerbeds' },
  { id: 'mowing', label: 'Lawn Mowing & Edging' },
  { id: 'landscape', label: 'Landscape Design' },
  { id: 'commercial', label: 'Commercial Grounds' },
  { id: 'weed-control', label: 'Weed Control & Cleanups' },
] as const;

// Real keepers from Michael (Sep 2026). Captions/ALTs from Chuck.
// Denham #2 and #3 are the same job, different walls — not two properties.
// BR #5 and #6 are the same property. BR is job location, not home turf.
export const PROJECTS: Project[] = [
  {
    id: 'denham-bed-before',
    title: 'Denham Springs Bed — Before',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/denham-springs-bed-before.webp',
    imageAlt:
      'Curved Denham Springs flower bed with pine straw, boxwoods, and gray stone pavers along a brick house.',
    isBeforeAfter: true,
    aspectRatio: 'tall',
    description:
      'Flower bed in Denham Springs before the mulch swap — pine straw, stone border, boxwoods in place.',
    details: ['Pine straw bed', 'Stone paver border', 'Boxwoods in place'],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'denham-mulch-edging-after',
    title: 'Denham Springs Bed — After',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/denham-springs-mulch-edging-after.webp',
    imageAlt:
      'Fresh red mulch bed with boxwoods and gray stone edging wrapping a brick house corner in Denham Springs.',
    isBeforeAfter: true,
    aspectRatio: 'tall',
    description:
      'Same style of Denham Springs bed after — fresh red mulch, trimmed boxwoods, stone edging, mowed lawn.',
    details: ['Fresh red mulch', 'Trimmed boxwoods', 'Stone edging', 'Same Denham job as the side-yard shot'],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'denham-side-bed-mulch-after',
    title: 'Denham Springs Side Bed',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/denham-springs-side-bed-mulch-after.webp',
    imageAlt:
      'Narrow red-mulch bed with a row of boxwoods along a brick wall and green lawn in Denham Springs.',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description:
      'Side-yard bed, Denham Springs. Red mulch, boxwoods, stone edge. Same job as the corner after shot — different wall.',
    details: ['Same Denham property as the mulch after', 'Side wall, not a second house'],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'walker-lawn-stripes',
    title: 'Walker Lawn Stripes',
    serviceType: 'mowing',
    serviceLabel: 'Lawn Mowing & Edging',
    location: 'Walker, LA',
    image: '/images/walker-lawn-stripes-after.webp',
    imageAlt:
      'Freshly mowed green lawn with diagonal stripes beside a white brick house in Walker, Louisiana.',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'Fresh stripes on a Walker lawn.',
    details: ['Diagonal mow pattern', 'Walker residential'],
    serviceSlug: 'lawn-mowing',
  },
  {
    id: 'baton-rouge-hedge-during',
    title: 'Baton Rouge Hedge & Bed Cleanup',
    serviceType: 'weed-control',
    serviceLabel: 'Weed Control & Cleanups',
    location: 'Baton Rouge, LA (job)',
    image: '/images/baton-rouge-hedge-bed-during.webp',
    imageAlt:
      'Freshly trimmed green hedge around a front bed with soil and clippings at a Baton Rouge brick house.',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description:
      'Hedge trim and bed cleanup underway in Baton Rouge. Process shot — not a finished after.',
    details: ['Hedge trim in progress', 'Same property as the crape myrtle cleanup'],
    serviceSlug: 'weed-control',
  },
  {
    id: 'baton-rouge-crape-cleanup',
    title: 'Crape Myrtle Prune & Haul',
    serviceType: 'weed-control',
    serviceLabel: 'Weed Control & Cleanups',
    location: 'Baton Rouge, LA (job)',
    image: '/images/baton-rouge-crape-myrtle-cleanup.webp',
    imageAlt:
      'Pile of freshly cut crape myrtle branches on a driveway during a Baton Rouge trim and cleanup.',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'Crape myrtle prune and haul in Baton Rouge. Same property as the hedge cleanup.',
    details: ['Brush pile from prune', 'Same BR property as the hedge bed shot'],
    serviceSlug: 'weed-control',
  },
  {
    id: 'sherwood-oaks-commercial',
    title: 'Sherwood Oaks Commercial Trim',
    serviceType: 'commercial',
    serviceLabel: 'Commercial Grounds',
    location: 'Sherwood Oaks',
    image: '/images/sherwood-oaks-commercial-trim.webp',
    imageAlt:
      'Bad Boy Magnum zero-turn and string trimming around shrubs at a Sherwood Oaks property under a blue sky.',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description:
      'On the job at Sherwood Oaks — Bad Boy Magnum and a string trim. Solo operator, not a crew shot.',
    details: ['Bad Boy Magnum', 'Solo operator on commercial grounds'],
    serviceSlug: 'commercial-grounds',
  },
  {
    id: 'southern-hills-bed-prep',
    title: 'Southern Hills Bed Prep',
    serviceType: 'landscape',
    serviceLabel: 'Landscape Design',
    location: 'Southern Hills, Baton Rouge (job)',
    image: '/images/southern-hills-bed-prep.webp',
    imageAlt:
      'Landscape fabric laid in a residential bed around a tree during mulch prep in Baton Rouge.',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description:
      'Bed prep at Southern Hills — fabric down before mulch. Process shot — not a finished after.',
    details: ['Landscape fabric', 'Before mulch'],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'dusk-path-lights',
    title: 'Dusk Path Lighting',
    serviceType: 'landscape',
    serviceLabel: 'Landscape Design',
    location: 'Job photo',
    image: '/images/sbl-project-photo-02.webp',
    imageAlt: 'Brick house at dusk with path lights along the walk, Southern Buck Lawn lighting work',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description:
      'Dusk shot of a brick house with path lights along the walk. Kept for lighting work — night Kennedi shots are not in this set.',
    details: ['Path lights at dusk'],
    serviceSlug: 'landscape-design',
  },
];

export function getProjectsByService(serviceType?: string) {
  if (!serviceType || serviceType === 'all') return PROJECTS;
  return PROJECTS.filter((p) => p.serviceType === serviceType);
}

export function getProjectById(id: string) {
  return PROJECTS.find((p) => p.id === id);
}
