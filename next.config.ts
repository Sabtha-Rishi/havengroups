import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  allowedDevOrigins: ['192.168.1.6'],
  async redirects() {
    return [
      {
        source: '/sponsors',
        destination: '/sponsorships',
        permanent: true,
      },
      {
        source: '/services/audio',
        destination: '/services/audio-launches',
        permanent: true,
      },
      {
        source: '/services/sponsorships',
        destination: '/sponsorships',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;
