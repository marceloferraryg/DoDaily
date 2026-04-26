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

  // 👇 necessário para acessar no celular (dev)
  allowedDevOrigins: ['192.168.0.127'],

  // 👇 resolve conflito Turbopack x Webpack na build (Vercel)
  turbopack: {},
}

export default withPWA(nextConfig)