import { Project } from '@/lib/types';

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'mulch', label: 'Mulch & Flowerbeds' },
  { id: 'mowing', label: 'Lawn Mowing & Edging' },
  { id: 'landscape', label: 'Landscape Design' },
  { id: 'commercial', label: 'Commercial Grounds' },
  { id: 'weed-control', label: 'Weed Control & Cleanups' },
] as const;

// Honest captions that match the files. Do not invent cities, B&As, or
// Walker-sign / stripe claims onto these photos.
// photo-01: unused tiny trailer — do not promote.
// photo-03: 404 only.
// photo-11: owner in branded shirt with a shovel — about page, not a lawn hero.
export const PROJECTS: Project[] = [
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
    description: 'Dusk shot of a brick house with path lights along the walk.',
    details: [
      'Path lights along the walk at dusk',
      'Brick house facade',
    ],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'commercial-palms-04',
    title: 'Commercial Palms & Pine Straw',
    serviceType: 'commercial',
    serviceLabel: 'Commercial Grounds',
    location: 'Job photo',
    image: '/images/sbl-project-photo-04.webp',
    imageAlt: 'Commercial palm trees and pine-straw beds, Southern Buck Lawn job',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'Commercial palm and pine-straw bed work. Not a before-and-after and not a Walker sign shot.',
    details: [
      'Palm trees on a commercial lot',
      'Pine-straw bed finish',
    ],
    serviceSlug: 'commercial-grounds',
  },
  {
    id: 'commercial-palms-05',
    title: 'Commercial Pine-Straw Beds',
    serviceType: 'commercial',
    serviceLabel: 'Commercial Grounds',
    location: 'Job photo',
    image: '/images/sbl-project-photo-05.webp',
    imageAlt: 'Commercial pine-straw and palm bed work by Southern Buck Lawn',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'Same commercial palm / pine-straw job, different angle.',
    details: [
      'Pine-straw beds',
      'Commercial frontage',
    ],
    serviceSlug: 'commercial-grounds',
  },
  {
    id: 'commercial-palms-06',
    title: 'Commercial Grounds Detail',
    serviceType: 'commercial',
    serviceLabel: 'Commercial Grounds',
    location: 'Job photo',
    image: '/images/sbl-project-photo-06.webp',
    imageAlt: 'Commercial palm and pine-straw grounds, Southern Buck Lawn',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'Commercial palm / pine-straw job detail. Not stripes and not a Walker welcome sign.',
    details: [
      'Palm and pine-straw planting',
    ],
    serviceSlug: 'commercial-grounds',
  },
  {
    id: 'commercial-palms-07',
    title: 'Commercial Pine Straw',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Job photo',
    image: '/images/sbl-project-photo-07.webp',
    imageAlt: 'Pine-straw commercial beds with palms, Southern Buck Lawn work',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'Pine-straw commercial beds. Not a residential before-and-after.',
    details: [
      'Pine-straw mulch on a commercial lot',
    ],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'white-ranch-hedge-08',
    title: 'White Ranch Hedge Work',
    serviceType: 'mowing',
    serviceLabel: 'Lawn Mowing & Edging',
    location: 'Job photo',
    image: '/images/sbl-project-photo-08.webp',
    imageAlt: 'White ranch house with daytime hedge trimming by Southern Buck Lawn',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'Daytime hedge and lawn work on a white ranch. Not a dusk lighting shot.',
    details: [
      'Daytime hedge trim',
      'Clean lawn edge',
    ],
    serviceSlug: 'lawn-mowing',
  },
  {
    id: 'white-ranch-hedge-09',
    title: 'Ranch Hedge Line',
    serviceType: 'mowing',
    serviceLabel: 'Lawn Mowing & Edging',
    location: 'Job photo',
    image: '/images/sbl-project-photo-09.webp',
    imageAlt: 'Daytime white ranch hedge line trimmed by Southern Buck Lawn',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'Same white-ranch hedge job, daytime.',
    details: [
      'Hedge line in daylight',
    ],
    serviceSlug: 'lawn-mowing',
  },
  {
    id: 'white-ranch-hedge-10',
    title: 'Ranch Lawn & Hedges',
    serviceType: 'mowing',
    serviceLabel: 'Lawn Mowing & Edging',
    location: 'Job photo',
    image: '/images/sbl-project-photo-10.webp',
    imageAlt: 'White ranch lawn and hedges in daylight, Southern Buck Lawn',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'White ranch hedge job in daylight. Not dusk lighting.',
    details: [
      'Daytime lawn and hedge finish',
    ],
    serviceSlug: 'lawn-mowing',
  },
];

export function getProjectsByService(serviceType?: string) {
  if (!serviceType || serviceType === 'all') return PROJECTS;
  return PROJECTS.filter((p) => p.serviceType === serviceType);
}

export function getProjectById(id: string) {
  return PROJECTS.find((p) => p.id === id);
}
