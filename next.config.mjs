/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    optimizePackageImports: [
      'gsap',
      // Add other packages here if needed
    ],
  },
};

export default nextConfig;
