/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",   // for PM2/Nginx deploy
  basePath: "/stock",     // required by teacher’s instructions
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
