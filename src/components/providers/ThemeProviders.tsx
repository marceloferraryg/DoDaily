'use client'

import { useEffect } from 'react'

import { useTheme } from '@/store/useTheme'

type Props = {
  children: React.ReactNode
}

export function ThemeProvider({
  children,
}: Props) {

  const theme = useTheme(
    (state) => state.theme
  )

  useEffect(() => {

    document.body.classList.remove(
      'theme-light',
      'theme-dark',
      'theme-ocean'
    )

    document.body.classList.add(
      `theme-${theme}`
    )

  }, [theme])

  return children
}