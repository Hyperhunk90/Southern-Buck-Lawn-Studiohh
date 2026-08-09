/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    'ais-dev-fz77gh4modldyu6xmsbmjj-224007547644.us-west1.run.app',
    'ais-pre-fz77gh4modldyu6xmsbmjj-224007547644.us-west1.run.app'
  ],
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [50, 55, 60, 75, 80, 85, 90, 100],
  },
  async headers() {
    return [
      {
        source: '/((?!api/).*)',
        headers: [{ key: 'X-Robots-Tag', value: 'index, follow' }],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/:path+/', destination: '/:path+', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'www.southernbucklawn.com' }], destination: 'https://southernbucklawn.com/:path*', permanent: true },
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/sitemap.xml.gz', destination: '/sitemap.xml', permanent: true },
      { source: '/locations', destination: '/service-areas', permanent: true },
      { source: '/locations/:slug', destination: '/service-areas/:slug', permanent: true },
      { source: '/walker-lawn-care', destination: '/service-areas/walker', permanent: true },
      { source: '/pages/walker-la', destination: '/service-areas/walker', permanent: true },
      { source: '/baton-rouge-landscaping', destination: '/service-areas/baton-rouge', permanent: true },
      { source: '/lawn-care-baton-rouge-la', destination: '/service-areas/baton-rouge', permanent: true },
      { source: '/denham-springs-landscaping', destination: '/service-areas/denham-springs', permanent: true },
      { source: '/hoa-lawn-care-livingston-parish', destination: '/service-areas/livingston-parish', permanent: true },
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
      { source: '/project-gallery', destination: '/services', permanent: true },
      { source: '/projects', destination: '/services', permanent: true },
      { source: '/walker-landscaping', destination: '/landscape-design-walker', permanent: true },
      { source: '/about', destination: '/#about', permanent: true },
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
