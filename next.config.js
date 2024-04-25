/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '"ooujnsodrnzfcionhklt.supabase.co"',
      },
    ],
  },
};

module.exports = nextConfig;
