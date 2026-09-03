/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Match the root layout's 5-minute revalidation without a year-long
  // stale-while-revalidate window at the hosting CDN.
  expireTime: 300,
  // Ensure all URLs are served without trailing slashes. Next.js will 308-redirect
  // any request that includes a trailing slash (e.g. /services/ → /services) so
  // Google only ever indexes one canonical version of each URL.
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Quality values the optimizer may serve; photos of turf/mulch compress
    // poorly at the default 75, so big atmospheric shots use 50-60. Every
    // quality value used by an <Image> MUST be listed here — in production
    // Next.js returns a 400 (broken image) for any quality not in this list.
    qualities: [50, 55, 60, 75],
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
      { source: '/locations', destination: '/service-areas', permanent: true },
      { source: '/locations/baton-rouge', destination: '/service-areas', permanent: true },
      { source: '/locations/:slug', destination: '/service-areas/:slug', permanent: true },

      // City×service doorway URLs → the real service silo.
      { source: '/lawn-mowing-walker', destination: '/services/lawn-mowing', permanent: true },
      { source: '/lawn-mowing-denham-springs', destination: '/services/lawn-mowing', permanent: true },
      { source: '/lawn-mowing-baton-rouge', destination: '/services/lawn-mowing', permanent: true },
      { source: '/lawn-mowing-livingston-parish', destination: '/services/lawn-mowing', permanent: true },
      { source: '/weed-control-walker', destination: '/services/weed-control', permanent: true },
      { source: '/weed-control-denham-springs', destination: '/services/weed-control', permanent: true },
      { source: '/weed-control-baton-rouge', destination: '/services/weed-control', permanent: true },
      { source: '/weed-control-livingston-parish', destination: '/services/weed-control', permanent: true },
      { source: '/landscape-design-walker', destination: '/services/landscape-design', permanent: true },
      { source: '/landscape-design-denham-springs', destination: '/services/landscape-design', permanent: true },
      { source: '/landscape-design-baton-rouge', destination: '/services/landscape-design', permanent: true },
      { source: '/landscape-design-livingston-parish', destination: '/services/landscape-design', permanent: true },
      { source: '/commercial-grounds-baton-rouge', destination: '/services/commercial-grounds', permanent: true },
      { source: '/commercial-grounds-denham-springs', destination: '/services/commercial-grounds', permanent: true },
      { source: '/commercial-grounds-walker', destination: '/services/commercial-grounds', permanent: true },
      { source: '/commercial-grounds-livingston-parish', destination: '/services/commercial-grounds', permanent: true },

      // Baton Rouge is not home turf. Collapse the city silo.
      { source: '/service-areas/baton-rouge', destination: '/service-areas', permanent: true },

      // Old service-area URL patterns still in crawlers' indexes.
      { source: '/walker-lawn-care', destination: '/service-areas/walker', permanent: true },
      { source: '/pages/walker-la', destination: '/service-areas/walker', permanent: true },
      { source: '/baton-rouge-landscaping', destination: '/service-areas', permanent: true },
      { source: '/lawn-care-baton-rouge-la', destination: '/service-areas', permanent: true },
      { source: '/baton-rouge-lawn-care', destination: '/service-areas', permanent: true },
      { source: '/denham-springs-landscaping', destination: '/service-areas/denham-springs', permanent: true },
      { source: '/hoa-lawn-care-livingston-parish', destination: '/service-areas/livingston-parish', permanent: true },

      // Old service URL patterns.
      { source: '/services/residential-lawn-care', destination: '/services/lawn-mowing', permanent: true },
      { source: '/services/lawn-care-maintenance', destination: '/services/lawn-mowing', permanent: true },
      { source: '/residential-lawn-care', destination: '/services/lawn-mowing', permanent: true },
      { source: '/lawn-care-maintenance', destination: '/services/lawn-mowing', permanent: true },
      { source: '/services/irrigation', destination: '/services', permanent: true },
      { source: '/services/property-preservation', destination: '/property-preservation-reo-services', permanent: true },
      { source: '/landscape-design-install', destination: '/services/landscape-design', permanent: true },
      { source: '/landscape-design-installation', destination: '/services/landscape-design', permanent: true },
      { source: '/landscape-design-walker-la', destination: '/services/landscape-design', permanent: true },
      { source: '/commercial-landscaping', destination: '/services/commercial-grounds', permanent: true },
      { source: '/commercial-grounds-maintenance-contract', destination: '/services/commercial-grounds', permanent: true },
      { source: '/realtor-lawn-services', destination: '/services/commercial-grounds', permanent: true },
      { source: '/property-preservation', destination: '/property-preservation-reo-services', permanent: true },
      { source: '/christmas-lights', destination: '/landscape-lighting', permanent: true },

      // Misc old pages with no direct equivalent.
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/walker', destination: '/service-areas/walker', permanent: true },
      { source: '/project-gallery', destination: '/gallery', permanent: true },
      { source: '/projects', destination: '/gallery', permanent: true },
      { source: '/walker-landscaping', destination: '/services/landscape-design', permanent: true },

      // Common vanity URLs visitors (and old links) might try.
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/get-a-quote', destination: '/quote', permanent: true },
      { source: '/get-quote', destination: '/quote', permanent: true },
      { source: '/free-quote', destination: '/quote', permanent: true },
      { source: '/lawn-care', destination: '/services', permanent: true },
      { source: '/landscaping', destination: '/services', permanent: true },
    ];
  },
  // Disable Turbopack (default in Next 16) because the deployment environment
  // provides an older glibc that is incompatible with the native SWC bindings.
  // Falling back to the classic Webpack bundler ensures the build works on the
  // Hostinger Node.js runtime.
  
};

export default nextConfig;
