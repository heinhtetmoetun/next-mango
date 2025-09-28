/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',     // ✅ keep for PM2/Nginx deploy
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;

