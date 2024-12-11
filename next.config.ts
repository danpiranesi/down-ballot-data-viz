import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/:year-:id',
        destination: '/', // Route to the home page
      },
    ];
  },
};

export default nextConfig;

