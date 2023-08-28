/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    instrumentationHook: true,
    typedRoutes: true,
  },
};

module.exports = nextConfig;
