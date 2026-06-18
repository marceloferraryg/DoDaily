'use client'

import { useEffect } from 'react'


export function ThemeColorSync() {

  useEffect(() => {

    function updateThemeColor() {

      const color =
        getComputedStyle(
          document.documentElement
        )
        .getPropertyValue(
          '--color-bg-body'
        )
        .trim()


      const meta =
        document.querySelector(
          'meta[name="theme-color"]'
        )


      if (meta && color) {

        meta.setAttribute(
          'content',
          color
        )

      }

    }


    updateThemeColor()


    const observer =
      new MutationObserver(
        updateThemeColor
      )


    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: [
          'class',
          'style'
        ],
      }
    )


    return () => {

      observer.disconnect()

    }


  }, [])


  return null
}