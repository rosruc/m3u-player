import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/surrit/:path*',
        destination: 'https://surrit.com/:path*'
      }
    ]
  }
};

export default nextConfig;
