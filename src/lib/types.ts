export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  navLabel: string;
  subtitle: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  quickSummary: string;
  detailedContent: string[];
  localBenefits: string[];
  pricingRange: string;
  faqs: FAQ[];
  image: string;
  imageAlt: string;
}

export interface Review {
  author: string;
  area: string;
  text: string;
  rating: number;
  source?: string;
}

export interface Location {
  slug: string;
  name: string;
  navLabel: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  soilNote: string;
  pestNote: string;
  neighborhoods: string[];
  image?: string;
  imageAlt?: string;
  reviews: Review[];
  faqs: FAQ[];
}

export interface BlogSection {
  heading?: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  excerpt: string;
  date: string; // ISO, e.g. '2026-06-01'
  dateLabel: string; // human, e.g. 'June 1, 2026'
  readMinutes: number;
  keywords: string[];
  heroImage: string;
  heroAlt: string;
  sections: BlogSection[];
  // Internal links to service or area pages this post should funnel to.
  relatedLinks: { label: string; href: string }[];
}

export type ProjectServiceType = 'mowing' | 'mulch' | 'landscape' | 'commercial' | 'weed-control';

export interface Project {
  id: string;
  title: string;
  serviceType: ProjectServiceType;
  serviceLabel: string;
  location: string;
  image: string;
  imageAlt: string;
  isBeforeAfter?: boolean;
  aspectRatio?: 'tall' | 'wide' | 'square';
  description: string;
  details?: string[];
  completedDate?: string;
  serviceSlug?: string;
}
