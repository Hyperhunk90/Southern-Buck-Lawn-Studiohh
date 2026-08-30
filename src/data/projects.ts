import { Project } from '@/lib/types';

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'mulch', label: 'Mulch & Flowerbeds' },
  { id: 'mowing', label: 'Lawn Mowing & Edging' },
  { id: 'landscape', label: 'Landscape Design' },
  { id: 'commercial', label: 'Commercial Grounds' },
  { id: 'weed-control', label: 'Weed Control & Cleanups' },
] as const;

// Honest gallery only. Captions describe the file. No invented cities,
// before-and-afters, striping, RKM, or wildflower claims.
export const PROJECTS: Project[] = [
  {
    id: 'dusk-path-lights',
    title: 'Path Lights at Dusk',
    serviceType: 'landscape',
    serviceLabel: 'Landscape Lighting',
    location: 'Job site unlabeled',
    image: '/images/sbl-project-photo-02.webp',
    imageAlt: 'Brick house at dusk with path lights along the walkway, Southern Buck Lawn',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'The only lighting shot in this set: a brick house at dusk with path lights along the walk.',
    details: [
      'Path lights along the walkway',
      'Photographed at dusk',
      'City not labeled on this file',
    ],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'commercial-palm-pine-straw',
    title: 'Commercial Palm and Pine-Straw Beds',
    serviceType: 'commercial',
    serviceLabel: 'Commercial Grounds',
    location: 'Job site unlabeled',
    image: '/images/sbl-project-photo-04.webp',
    imageAlt: 'Commercial palm and pine-straw beds maintained by Southern Buck Lawn',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'One frame of a commercial palm and pine-straw job. Other frames of this same job are on the service pages, not extra cities.',
    details: [
      'Palm plantings',
      'Pine-straw beds',
      'Commercial property, city not labeled',
    ],
    serviceSlug: 'commercial-grounds',
  },
  {
    id: 'white-ranch-hedges',
    title: 'White Ranch Hedge Work',
    serviceType: 'landscape',
    serviceLabel: 'Landscape Design',
    location: 'Job site unlabeled',
    image: '/images/sbl-project-photo-10.webp',
    imageAlt: 'White ranch house with daytime hedge and bed work by Southern Buck Lawn',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'Daytime hedge and bed work at a white ranch. Same job as other ranch frames on the site. Not dusk lighting.',
    details: [
      'Daytime photograph',
      'Hedge and bed work',
      'City not labeled on this file',
    ],
    serviceSlug: 'landscape-design',
  },
  {
    id: 'work-trailer',
    title: 'Work Trailer',
    serviceType: 'commercial',
    serviceLabel: 'Commercial Grounds',
    location: 'Walker shop',
    image: '/images/sbl-project-photo-01.webp',
    imageAlt: 'Southern Buck Lawn work trailer',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'The work trailer. Small file, honest caption. Not a lawn hero.',
    details: [
      'Equipment shot',
      'Not a yard before-and-after',
    ],
    serviceSlug: 'commercial-grounds',
  },
];

export function getProjectsByService(serviceType?: string) {
  if (!serviceType || serviceType === 'all') return PROJECTS;
  return PROJECTS.filter((p) => p.serviceType === serviceType);
}

export function getProjectById(id: string) {
  return PROJECTS.find((p) => p.id === id);
}
