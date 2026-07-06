'use client'

import { AuthProvider } from '@/components/providers/AuthProvider'
import { ThemeProvider } from '@/components/providers/ThemeProviders'

type Props = {
  children: React.ReactNode
}

export function AppProviders({
  children,
}: Props) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  )
}
