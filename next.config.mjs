/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  output: 'standalone',     // ✅ keep for PM2/Nginx deploy
=======
  output: "standalone",   // ✅ generates .next/standalone/server.js
  basePath: "/stock",     // ✅ required for teacher’s instructions (Nginx alias + /stock routes)
>>>>>>> 5732ec9 (Update category/product with API_BASE env support)
  experimental: {
    instrumentationHook: true, // keep this if teacher wants it
  },
};

export default nextConfig;

