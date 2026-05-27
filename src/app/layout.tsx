import type { Metadata } from 'next'

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
  description:
    'Organize sua rotina diária',
  manifest: '/manifest.json',
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

      <body
        className="
          min-h-full
          flex flex-col
        "
      >

        <ThemeProvider>

          {children}

        </ThemeProvider>

      </body>

    </html>

  )
}