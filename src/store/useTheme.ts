import { create } from 'zustand'

import { persist } from 'zustand/middleware'

/* ------------------------------------------ */
/* MODES */
/* ------------------------------------------ */

export type ThemeMode =
  | 'light'
  | 'dark'

/* ------------------------------------------ */
/* COLORS */
/* ------------------------------------------ */

export type ThemeColor =
  | 'lavender'
  | 'ocean'
  | 'emerald'
  | 'coral'
  | 'sakura'
  | 'midnight'
  | 'forest'
  | 'rose'
  | 'gold'
  | 'sky'
  | 'cherry'
  | 'coffee'
  | 'storm'
  | 'ruby'

/* ------------------------------------------ */
/* STORE */
/* ------------------------------------------ */

type ThemeStore = {

  mode: ThemeMode

  theme: ThemeColor

  setMode: (
    mode: ThemeMode
  ) => void

  setTheme: (
    theme: ThemeColor
  ) => void
}

/* ------------------------------------------ */
/* USE THEME */
/* ------------------------------------------ */

export const useTheme =
  create<ThemeStore>()(

    persist(

      (set) => ({

        //------------------------------------------
        // INITIAL STATE
        //------------------------------------------

        mode: 'light',

        theme: 'lavender',

        //------------------------------------------
        // SET MODE
        //------------------------------------------

        setMode: (mode) =>

          set({
            mode,
          }),

        //------------------------------------------
        // SET THEME
        //------------------------------------------

        setTheme: (theme) =>

          set({
            theme,
          }),

      }),

      //------------------------------------------
      // PERSIST
      //------------------------------------------

      {
        name: 'dodaily-theme',
      }

    )

  )