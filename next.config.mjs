import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  output: 'standalone',
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { isServer }) => {
    // Add any webpack customizations here
    return config;
  },
  // Disable static optimization for error pages
  staticPageGenerationTimeout: 120,
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

export default withMDX(nextConfig);
