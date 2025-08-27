// next.config.ts
import type { NextConfig } from 'next';
import 'dotenv/config';

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: false },

  // Next 15+ expects an object, not boolean.
  experimental: {
    serverActions: {},
  },

  // moved from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['@node-rs/argon2'],

  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
  },

  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
