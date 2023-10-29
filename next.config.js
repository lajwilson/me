/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
    typedRoutes: true,
  },
};

module.exports = nextConfig;
