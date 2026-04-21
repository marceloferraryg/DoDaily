import withPWAInit from 'next-pwa'
import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev, 
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default withPWA(nextConfig)