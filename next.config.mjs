/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  experimental: {
    optimizeCss: true,
  },
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
