import { withCloudflare } from '@cloudflare/next-on-pages';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    appDir: true, 
  },
  output: 'standalone', 
};

export default withCloudflare(nextConfig);
