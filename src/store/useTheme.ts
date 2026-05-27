import { create } from 'zustand'

import { persist } from 'zustand/middleware'

export type Theme =
  | 'light'
  | 'dark'
  | 'ocean'

type ThemeStore = {
  theme: Theme

  setTheme: (
    theme: Theme
  ) => void
}

export const useTheme =
  create<ThemeStore>()(

    persist(

      (set) => ({

        theme: 'light',

        setTheme: (theme) =>
          set({ theme }),

      }),

      {
        name: 'dodaily-theme',
      }

    )

  )