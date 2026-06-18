import type { Metadata, Viewport } from 'next'

import { Inter } from 'next/font/google'

import './globals.css'

import { ThemeProvider } from '@/components/providers/ThemeProviders'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'DoDaily',
  description: 'Organize sua rotina diária',

  manifest: '/manifest.json',

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DoDaily',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (

    <html
        lang="pt-BR"
        className={`
          ${inter.variable}
          h-full
          antialiased
        `}
      >

      <head>
        <meta
          name="theme-color"
          content="#f2f2f9"
        />
      </head>

      <body
        className="
          min-h-full
          flex flex-col
          h-dvh
          overflow-hidden
          
        "
      >

        <ThemeProvider>

          {children}

        </ThemeProvider>

      </body>

    </html>

  )
}