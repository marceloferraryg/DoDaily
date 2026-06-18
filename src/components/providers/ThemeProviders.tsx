'use client'

import { useEffect } from 'react'

import { useTheme } from '@/store/useTheme'

type Props = {
  children: React.ReactNode
}

const MODES = [
  'theme-light',
  'theme-dark',
]

const COLORS = [
  'theme-lavender',
  'theme-ocean',
  'theme-emerald',
  'theme-coral',
  'theme-sakura',
  'theme-midnight',
  'theme-forest',
  'theme-rose',
  'theme-gold',
  'theme-sky',
  'theme-cherry',
  'theme-coffee',
  'theme-storm',
  'theme-ruby',
]

export function ThemeProvider({
  children,
}: Props) {

  //------------------------------------------
  // STORE
  //------------------------------------------

  const mode = useTheme(
    (state) => state.mode
  )

  const theme = useTheme(
    (state) => state.theme
  )

  //------------------------------------------
  // APPLY THEME
  //------------------------------------------

  useEffect(() => {

    const body = document.body

    //------------------------------------------
    // REMOVE OLD CLASSES
    //------------------------------------------

    body.classList.remove(
      ...MODES,
      ...COLORS
    )

    //------------------------------------------
    // ADD NEW CLASSES
    //------------------------------------------

    body.classList.add(
      `theme-${mode}`,
      `theme-${theme}`
    )

  }, [
    mode,
    theme,
  ])

  //------------------------------------------
  // UPDATE BROWSER / PWA COLOR
  //------------------------------------------

useEffect(() => {

  const updateThemeColor = () => {

    const metaThemeColor =
      document.querySelector(
        'meta[name="theme-color"]'
      )


    if (!metaThemeColor) return


    const color =
      getComputedStyle(
        document.body
      )
      .getPropertyValue(
        '--color-primary'
      )
      .trim()


    if (color) {

      metaThemeColor.setAttribute(
        'content',
        color
      )

    }

  }


  // espera o CSS aplicar
  requestAnimationFrame(() => {
    updateThemeColor()
  })


}, [
  mode,
  theme
])

  //------------------------------------------
  // RENDER
  //------------------------------------------

  return children
}