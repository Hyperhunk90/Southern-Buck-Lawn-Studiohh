import { Project } from '@/lib/types';

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'mulch', label: 'Mulch & Flowerbeds' },
  { id: 'mowing', label: 'Lawn Mowing & Edging' },
  { id: 'landscape', label: 'Landscape Design' },
  { id: 'commercial', label: 'Commercial Grounds' },
  { id: 'weed-control', label: 'Weed Control & Cleanups' },
] as const;

export const PROJECTS: Project[] = [
  {
    id: 'black-mulch-before-after',
    title: 'Black Mulch & Flowerbed Reshaping',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/sbl-project-photo-10.webp',
    imageAlt: 'Before and after of black mulch installation and deep bed trenching in Denham Springs',
    isBeforeAfter: true,
    aspectRatio: 'wide',
    description: 'Complete front yard bed overhaul featuring deep trench edging, weed barrier prep, and premium dark black hardwood mulch.',
    details: [
      'Hand-cleared overgrown weeds and encroaching turf along driveway',
      'Cut a 3-inch spade edge for crisp boundary defense',
      'Applied 3 inches of carbon-black dyed hardwood mulch',
      'Protected foundation and ornamental shrubs'
    ],
    completedDate: '2026-05-12',
    serviceSlug: 'landscape-design'
  },
  {
    id: 'flower-bed-mulch-transformation',
    title: 'Full Flowerbed Mulch Transformation',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Walker, LA',
    image: '/images/sbl-project-photo-11.webp',
    imageAlt: 'Before and after flowerbed cleanup and fresh mulch transformation in Walker, Louisiana',
    isBeforeAfter: true,
    aspectRatio: 'tall',
    description: 'Restored a heavily choked residential bed to pristine condition with clean curves and deep insulating mulch layer.',
    details: [
      'Removed thick weed growth and dead root systems',
      'Re-established clean curvilinear bed lines',
      'Installed premium weed barrier fabric',
      'Finished with fresh dark mulch layer'
    ],
    completedDate: '2026-04-28',
    serviceSlug: 'landscape-design'
  },
  {
    id: 'lawn-mowing-edging-walker',
    title: 'Precision Lawn Mowing & Flagstone Edging',
    serviceType: 'mowing',
    serviceLabel: 'Lawn Mowing & Edging',
    location: 'Walker, LA',
    image: '/images/sbl-project-photo-02.webp',
    imageAlt: 'Freshly mowed green St. Augustine lawn with hard vertical blade edging along walkway',
    isBeforeAfter: false,
    aspectRatio: 'square',
    description: 'Weekly St. Augustine turf care cut at 3.75 inches with vertical blade hard edging along flagstone walkway and driveway.',
    details: [
      'High-deck mower cut optimized for Louisiana heat tolerance',
      'Steel-blade vertical edging along all concrete and flagstone',
      'Precision string trimming around beds and fence lines',
      'Complete clipping blow-off from all hard surfaces'
    ],
    completedDate: '2026-06-02',
    serviceSlug: 'lawn-mowing'
  },
  {
    id: 'commercial-entrance-mulch-roses',
    title: 'Commercial Entrance Mulch & Rose Beds',
    serviceType: 'commercial',
    serviceLabel: 'Commercial Grounds',
    location: 'Livingston, LA',
    image: '/images/sbl-project-photo-03.webp',
    imageAlt: 'Commercial front entrance with fresh black mulch, Knockout roses, and flagpoles maintained by Southern Buck Lawn',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'Complete entrance beautification for a commercial property featuring rich black mulch, Knockout roses, and trimmed turf.',
    details: [
      'Maintained vibrant Knockout rose beds and evergreen shrubs',
      'Laid fresh black mulch around flagpoles and monument signs',
      'Edge-to-edge turf striping along customer parking',
      'Routine bi-weekly bed weeding and trimming'
    ],
    completedDate: '2026-05-19',
    serviceSlug: 'commercial-grounds'
  },
  {
    id: 'backyard-lawn-mowing-stripes',
    title: 'Backyard Turf Mowing & Stripe Patterns',
    serviceType: 'mowing',
    serviceLabel: 'Lawn Mowing & Edging',
    location: 'Walker, LA',
    image: '/images/sbl-project-photo-04.webp',
    imageAlt: 'Backyard green turf lawn with crisp diagonal mowing stripes in Walker, LA',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'Diagonal lawn striping pattern on dense Bermuda turf with clean fence line trimming and weed removal.',
    details: [
      'Alternating diagonal striping pattern for visual appeal',
      'Sharpened blade cut to prevent turf tip fraying',
      'Careful trimming around play sets and privacy fences',
      'Lawn health inspection during routine visit'
    ],
    completedDate: '2026-06-10',
    serviceSlug: 'lawn-mowing'
  },
  {
    id: 'landscape-design-before-after',
    title: 'Custom Bed Design & Shrub Installation',
    serviceType: 'landscape',
    serviceLabel: 'Landscape Design',
    location: 'Denham Springs, LA',
    image: '/images/sbl-project-photo-05.webp',
    imageAlt: 'Before and after landscape design and shrub planting at a Denham Springs residence',
    isBeforeAfter: true,
    aspectRatio: 'wide',
    description: 'Transformative residential front yard landscape project with heat-tolerant shrubs, stone borders, and dark mulch.',
    details: [
      'Designed custom curved bed geometry to compliment home architecture',
      'Planted Loropetalum, Camellias, and dwarf Crape Myrtles',
      'Constructed natural stone border edging',
      'Mulched and installed drip irrigation lines'
    ],
    completedDate: '2026-04-15',
    serviceSlug: 'landscape-design'
  },
  {
    id: 'commercial-lawn-mowing-stripes',
    title: 'Commercial Facility Lawn Striping',
    serviceType: 'commercial',
    serviceLabel: 'Commercial Grounds',
    location: 'Livingston, LA',
    image: '/images/sbl-project-photo-06.webp',
    imageAlt: 'High-visibility commercial lawn striping on commercial property in Livingston Parish',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'Full grounds care for a multi-building facility featuring deep striping patterns and perimeter trimming.',
    details: [
      'Heavy-duty zero-turn mower striping across 2.5 acres',
      'Hard edging around sidewalks, loading docks, and curb lines',
      'Trimming around utility boxes and security fences',
      'Off-peak scheduling to prevent business disruption'
    ],
    completedDate: '2026-05-27',
    serviceSlug: 'commercial-grounds'
  },
  {
    id: 'mulch-flowerbed-install',
    title: 'Double-Shredded Dark Mulch Installation',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/sbl-project-photo-07.webp',
    imageAlt: 'Fresh dark mulch around ornamental shrubs and brick home in Denham Springs',
    isBeforeAfter: false,
    aspectRatio: 'square',
    description: 'Seasonal bed top-off with double-shredded dark organic mulch to retain moisture during heatwaves.',
    details: [
      'Suppressed spring weeds with pre-emergent treatment',
      'Spade-trenched edge along turf boundary',
      'Evenly distributed 3-inch mulch depth',
      'Insulated plant roots against high summer ground temperatures'
    ],
    completedDate: '2026-03-30',
    serviceSlug: 'landscape-design'
  },
  {
    id: 'pine-straw-black-mulch-bed',
    title: 'Pine Straw & Black Mulch Bed Combo',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Livingston, LA',
    image: '/images/sbl-project-photo-08.webp',
    imageAlt: 'Combination pine straw and dark black mulch flowerbed installation in Livingston, LA',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'Dual-texture landscaping combining long-leaf pine straw around acid-loving azaleas with rich black mulch in front display beds.',
    details: [
      'Hand-rolled pine straw tucking along bed edges',
      'Separated soil zones for Azaleas and gardenias',
      'High-contrast color scheme boosting curb appeal',
      'Clean hand-raked finish'
    ],
    completedDate: '2026-05-04',
    serviceSlug: 'landscape-design'
  },
  {
    id: 'residential-st-augustine-stripes',
    title: 'St. Augustine Turf Care & Backyard Stripes',
    serviceType: 'mowing',
    serviceLabel: 'Lawn Mowing & Edging',
    location: 'Denham Springs, LA',
    image: '/images/sbl-project-photo-09.webp',
    imageAlt: 'Thick green St. Augustine backyard lawn with clean cut and sharp lines',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'Weekly maintenance of a healthy St. Augustine residential lawn, kept thick at 4 inches to choke out native weeds.',
    details: [
      'Height setting adjusted for St. Augustine turf health',
      'Clean perimeter trimming along patio and pool deck',
      'Blowing off all hard surfaces and outdoor furniture',
      'Gate latched securely after every service visit'
    ],
    completedDate: '2026-06-15',
    serviceSlug: 'lawn-mowing'
  },
  {
    id: 'commercial-rkm-grounds',
    title: 'RKM Corporate Grounds Maintenance',
    serviceType: 'commercial',
    serviceLabel: 'Commercial Grounds',
    location: 'Baton Rouge, LA',
    image: '/images/sbl-project-photo-10.webp',
    imageAlt: 'Expansive commercial lawn maintenance and sharp lines at RKM corporate property in Baton Rouge',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'Multi-acre commercial grounds care including athletic field-level turf presentation and parking lot detail.',
    details: [
      'Precision mowing across high-visibility frontage',
      'Stringent safety standards around active employee walkways',
      'Weekly trash and storm debris clearing',
      'Unified property presentation'
    ],
    completedDate: '2026-05-30',
    serviceSlug: 'commercial-grounds'
  },
  {
    id: 'weed-control-denham-springs',
    title: '6-Step Weed Control & Feed Success',
    serviceType: 'weed-control',
    serviceLabel: 'Weed Control & Cleanups',
    location: 'Denham Springs, LA',
    image: '/images/sbl-project-photo-11.webp',
    imageAlt: 'Vibrant green weed-free lawn in Denham Springs following Southern Buck Lawn treatment plan',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'Targeted weed eradication and balanced granular fertilizer application resulting in a weed-free green lawn.',
    details: [
      'Applied pre-emergent to eliminate crabgrass and clover',
      'Spot-treated stubborn Virginia buttonweed',
      'Enriched soil with slow-release nitrogen formulation',
      'Provided post-treatment instructions for people and pets'
    ],
    completedDate: '2026-04-20',
    serviceSlug: 'weed-control'
  },
  {
    id: 'hedge-trimming-cleanup',
    title: 'Hedge Trimming & Seasonal Bed Cleanup',
    serviceType: 'weed-control',
    serviceLabel: 'Weed Control & Cleanups',
    location: 'Baton Rouge, LA',
    image: '/images/sbl-project-photo-02.webp',
    imageAlt: 'Crisp hand-trimmed hedges and weeded flowerbed cleanup in Baton Rouge',
    isBeforeAfter: false,
    aspectRatio: 'square',
    description: 'Complete overgrown hedge shaping, deadwood removal, and bed weeding for a residential home in Baton Rouge.',
    details: [
      'Precision shaping of Boxwoods and Ligustrum hedges',
      'Removed fallen leaf debris and weed roots',
      'Hand-cleared unwanted saplings',
      'Hauled away all green waste clippings'
    ],
    completedDate: '2026-05-15',
    serviceSlug: 'landscape-design'
  },
  {
    id: 'commercial-landscape-roses-shrubs',
    title: 'Perennial Shrub & Rose Garden Design',
    serviceType: 'landscape',
    serviceLabel: 'Landscape Design',
    location: 'Livingston, LA',
    image: '/images/sbl-project-photo-03.webp',
    imageAlt: 'Color-rich shrub and rose garden design along building walkway in Livingston, LA',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'Strategic plant layering with Knockout roses, Loropetalum, and evergreen groundcovers for year-round color.',
    details: [
      'Designed multi-tier plant height arrangement',
      'Soil amendment with organic compost and topsoil',
      'Installed deep black mulch moisture lock layer',
      'Integrated low-maintenance care schedule'
    ],
    completedDate: '2026-04-10',
    serviceSlug: 'landscape-design'
  },
  {
    id: 'side-yard-mulch-prep',
    title: 'Side Yard Bed Prep & Dark Mulch',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Denham Springs, LA',
    image: '/images/sbl-project-photo-04.webp',
    imageAlt: 'Side yard flowerbed mulch prep and clean trenching in Denham Springs',
    isBeforeAfter: false,
    aspectRatio: 'square',
    description: 'Cleaned up narrow side yard drainage bed, trenched edges away from AC compressors, and laid fresh mulch.',
    details: [
      'Cleared leaf litter and unwanted weeds',
      'Established clean drainage line around utilities',
      'Laid dense dark mulch to suppress soil erosion',
      'Neatened fence border lines'
    ],
    completedDate: '2026-05-08',
    serviceSlug: 'landscape-design'
  },
  {
    id: 'multi-acre-residential-lawn',
    title: 'Multi-Acre Residential Estate Lawn Care',
    serviceType: 'mowing',
    serviceLabel: 'Lawn Mowing & Edging',
    location: 'Livingston Parish, LA',
    image: '/images/sbl-project-photo-05.webp',
    imageAlt: 'Multi-acre residential property with clean lawn mowing stripes in Livingston Parish',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'Large acreage residential turf mowing, fence line weed eating, and ditch line trimming in rural Livingston Parish.',
    details: [
      'Commercial-grade zero turn mowing across 3.5 acres',
      'Ditch bank and pond perimeter line trimming',
      'Long driveway vertical edging',
      'Consistent weekly appointment day'
    ],
    completedDate: '2026-06-08',
    serviceSlug: 'lawn-mowing'
  },
  {
    id: 'flower-bed-edging-prep',
    title: 'Deep Trench Edging & Mulch Bed Prep',
    serviceType: 'mulch',
    serviceLabel: 'Mulch & Flowerbeds',
    location: 'Baton Rouge, LA',
    image: '/images/sbl-project-photo-06.webp',
    imageAlt: 'Spade trenching flowerbed edge prep prior to mulch distribution in Louisiana',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'Hand-spading deep vertical edges along turf borders to create a mechanical barrier against lawn grass invasion.',
    details: [
      'Hand-spaded 3-to-4 inch deep edge bevel',
      'Extracted rhizomes of invading Bermuda grass',
      'Smoothed bed contour for uniform mulch depth',
      'Prepped soil for spring planting'
    ],
    completedDate: '2026-03-22',
    serviceSlug: 'landscape-design'
  },
  {
    id: 'commercial-wildflower-landscape',
    title: 'Native Wildflower & Meadow Landscaping',
    serviceType: 'landscape',
    serviceLabel: 'Landscape Design',
    location: 'Baton Rouge, LA',
    image: '/images/sbl-project-photo-07.webp',
    imageAlt: 'Native Louisiana wildflowers planted along corporate office perimeter in Baton Rouge',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'Eco-friendly wildflower display beds designed to attract pollinators while reducing weekly mowing acreage.',
    details: [
      'Seeded native Louisiana perennial wildflowers',
      'Reduced water requirements and chemical treatments',
      'Created colorful border between turf and woodland edge',
      'Supplied seasonal bloom succession'
    ],
    completedDate: '2026-05-02',
    serviceSlug: 'landscape-design'
  },
  {
    id: 'commercial-night-entrance',
    title: 'Illuminated Commercial Plaza Entrance',
    serviceType: 'commercial',
    serviceLabel: 'Commercial Grounds',
    location: 'Livingston, LA',
    image: '/images/sbl-project-photo-08.webp',
    imageAlt: 'Commercial entrance landscaping at dusk with architectural lighting and dark mulch',
    isBeforeAfter: false,
    aspectRatio: 'square',
    description: 'Commercial entrance grounds maintenance paired with low-voltage landscape lighting highlighting palm trees and signage.',
    details: [
      'Night-time visual impact for commercial tenant plaza',
      'Pruned lower palm fronds and ornamental grasses',
      'Sharp midnight mulch backdrop highlighting warm uplights',
      'Clean curb appeal 24/7'
    ],
    completedDate: '2026-05-18',
    serviceSlug: 'commercial-grounds'
  },
  {
    id: 'commercial-flags-office',
    title: 'Government & Office Grounds Care',
    serviceType: 'commercial',
    serviceLabel: 'Commercial Grounds',
    location: 'Baton Rouge, LA',
    image: '/images/sbl-project-photo-09.webp',
    imageAlt: 'Flagpole plaza and manicured commercial lawn care in Baton Rouge',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'High-profile commercial grounds management featuring spotless flagpole plaza presentation and manicured lawn care.',
    details: [
      'Strict adherence to municipal aesthetic guidelines',
      'Daily site walk for litter and storm debris',
      'Crisp edge along all concrete walkways and monuments',
      'Zero-tolerance weed policy in display beds'
    ],
    completedDate: '2026-06-01',
    serviceSlug: 'commercial-grounds'
  },
  {
    id: 'estate-lawn-mowing-denham',
    title: 'Estate Lawn Mowing & Hard Edging',
    serviceType: 'mowing',
    serviceLabel: 'Lawn Mowing & Edging',
    location: 'Denham Springs, LA',
    image: '/images/sbl-project-photo-10.webp',
    imageAlt: 'Manicured front yard estate lawn with sharp driveway edging in Denham Springs',
    isBeforeAfter: false,
    aspectRatio: 'wide',
    description: 'Meticulous weekly lawn maintenance for a suburban Denham Springs estate featuring sharp curb lines.',
    details: [
      'Blade deck adjusted for lush green St. Augustine turf',
      'Vertical hard edging along curb, driveway, and sidewalk',
      'Clippings mulched finely into root zone',
      'Sidewalk and porch blown completely clear'
    ],
    completedDate: '2026-06-12',
    serviceSlug: 'lawn-mowing'
  },
  {
    id: 'wildflower-rkm-headquarters',
    title: 'Wildflower & Meadow Accent Beds',
    serviceType: 'landscape',
    serviceLabel: 'Landscape Design',
    location: 'Clinton, LA',
    image: '/images/sbl-project-photo-11.webp',
    imageAlt: 'Colorful wildflower meadow bed at RKM headquarters in Clinton, LA',
    isBeforeAfter: false,
    aspectRatio: 'tall',
    description: 'Custom wildflower landscape bed at corporate headquarters creating a vibrant natural focal point for visitors.',
    details: [
      'Prepared seedbed with organic soil conditioner',
      'Planted drought-tolerant Louisiana native blooms',
      'Bordered with dark mulch edge',
      'Attracts butterflies and native bees'
    ],
    completedDate: '2026-04-25',
    serviceSlug: 'landscape-design'
  }
];

export function getProjectsByService(serviceType?: string) {
  if (!serviceType || serviceType === 'all') return PROJECTS;
  return PROJECTS.filter((p) => p.serviceType === serviceType);
}

export function getProjectById(id: string) {
  return PROJECTS.find((p) => p.id === id);
}
