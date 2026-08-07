/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  allowedDevOrigins: [
    'ais-dev-fz77gh4modldyu6xmsbmjj-224007547644.us-west1.run.app',
    'ais-pre-fz77gh4modldyu6xmsbmjj-224007547644.us-west1.run.app'
  ],
  reactStrictMode: true,
  // Ensure all URLs are served without trailing slashes. Next.js will 308-redirect
  // any request that includes a trailing slash (e.g. /services/ → /services) so
  // Google only ever indexes one canonical version of each URL.
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Quality values the optimizer may serve; photos of turf/mulch compress
    // poorly at the default 75, so big atmospheric shots use 50-60. Every
    // quality value used by an <Image> MUST be listed here — in production
    // Next.js returns a 400 (broken image) for any quality not in this list.
    qualities: [50, 55, 60, 75, 80, 85, 90, 100],
  },
  async headers() {
    return [
      {
        // Tell crawlers (including Googlebot) to index every non-API page.
        // This header reinforces the robots.txt and helps if Hostinger's WAF
        // injects conflicting headers.
        source: '/((?!api/).*)',
        headers: [{ key: 'X-Robots-Tag', value: 'index, follow' }],
      },
    ];
  },
  async redirects() {
    return [
      // Trailing-slash canonicalization — belt-and-suspenders alongside
      // trailingSlash:false above. Catches any edge-case the Next.js server
      // might miss and ensures a hard 301 appears in Googlebot's crawl log.
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
      // Force non-www so Google sees one site, not two.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.southernbucklawn.com' }],
        destination: 'https://southernbucklawn.com/:path*',
        permanent: true,
      },
      // Sitemap variants bots probe for — point them all at the real one.
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/sitemap.xml.gz', destination: '/sitemap.xml', permanent: true },

      // Old /locations/ URL structure → current /service-areas/ structure.
      // Bare /locations (no slug) is still indexed by Google as "Service Areas" —
      // redirect it too, not just the per-city sub-paths.
      { source: '/locations', destination: '/service-areas', permanent: true },
      { source: '/locations/:slug', destination: '/service-areas/:slug', permanent: true },

      // Old service-area URL patterns still in crawlers' indexes.
      { source: '/walker-lawn-care', destination: '/service-areas/walker', permanent: true },
      { source: '/pages/walker-la', destination: '/service-areas/walker', permanent: true },
      { source: '/baton-rouge-landscaping', destination: '/service-areas/baton-rouge', permanent: true },
      { source: '/lawn-care-baton-rouge-la', destination: '/service-areas/baton-rouge', permanent: true },
      { source: '/denham-springs-landscaping', destination: '/service-areas/denham-springs', permanent: true },
      { source: '/hoa-lawn-care-livingston-parish', destination: '/service-areas/livingston-parish', permanent: true },

      // Old service URL patterns.
      { source: '/services/residential-lawn-care', destination: '/services/lawn-mowing', permanent: true },
      { source: '/residential-lawn-care', destination: '/services/lawn-mowing', permanent: true },
      { source: '/lawn-care-maintenance', destination: '/services/lawn-mowing', permanent: true },
      { source: '/services/irrigation', destination: '/services', permanent: true },
      { source: '/landscape-design-install', destination: '/services/landscape-design', permanent: true },
      { source: '/landscape-design-installation', destination: '/services/landscape-design', permanent: true },
      { source: '/landscape-design-walker-la', destination: '/landscape-design-walker', permanent: true },
      { source: '/commercial-landscaping', destination: '/services/commercial-grounds', permanent: true },
      { source: '/commercial-grounds-maintenance-contract', destination: '/services/commercial-grounds', permanent: true },
      { source: '/realtor-lawn-services', destination: '/services/commercial-grounds', permanent: true },
      { source: '/property-preservation', destination: '/services', permanent: true },
      { source: '/christmas-lights', destination: '/landscape-lighting', permanent: true },

      // Misc old pages with no direct equivalent.
      { source: '/project-gallery', destination: '/services', permanent: true },
      { source: '/projects', destination: '/services', permanent: true },
      { source: '/walker-landscaping', destination: '/landscape-design-walker', permanent: true },
      { source: '/about', destination: '/#about', permanent: true },

      // Common vanity URLs visitors (and old links) might try.
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/get-a-quote', destination: '/quote', permanent: true },
      { source: '/get-quote', destination: '/quote', permanent: true },
      { source: '/free-quote', destination: '/quote', permanent: true },
      { source: '/lawn-care', destination: '/services', permanent: true },
      { source: '/landscaping', destination: '/services', permanent: true },
    ];
  },
};

export default nextConfig;
