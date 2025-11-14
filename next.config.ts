import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  experimental: { serverActions: { bodySizeLimit: '2mb' } },
  output: 'standalone',
  compress: true,
};

export default nextConfig;
