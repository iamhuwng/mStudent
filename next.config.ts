// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Moved from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['firebase-admin'],

  // Remove deprecated/invalid experimental flags.
  // If you don’t actually use Server Actions, omit this entirely.
  // experimental: {
  //   serverActions: {}, // only add if you REALLY need it as an object
  // },
}

export default nextConfig
