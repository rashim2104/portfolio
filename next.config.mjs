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
};

export default withMDX(nextConfig);
