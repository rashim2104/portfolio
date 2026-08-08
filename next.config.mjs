/** @type {import('next').NextConfig} */
const nextConfig = {
  // `next build` and `next dev` share .next by default, so building while a dev
  // server is running overwrites the chunks it is serving and the site loses its
  // stylesheets until dev recompiles. `bun run build:check` sets this to build
  // into a throwaway directory instead, leaving a running dev server untouched.
  // Unset in CI and on Vercel, so production builds still use .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  pageExtensions: ["ts", "tsx"],
  experimental: {
    optimizeCss: true,
  },
  staticPageGenerationTimeout: 120,
  
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Security headers for better SEO ranking
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
  
  // Compress output for faster loading
  compress: true,
};

export default nextConfig;
