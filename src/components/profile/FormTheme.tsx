'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Check } from 'lucide-react'

import { themeColorsMap } from '@/maps/ThemeMap'

import {
  ThemeColor,
  ThemeMode,
  useTheme,
} from '@/store/useTheme'

type Props = {
  back: () => void
}

export default function FormTheme({ back } : Props) {

  const router = useRouter()

  //------------------------------------------
  // STORE
  //------------------------------------------

  const currentTheme = useTheme(
    (state) => state.theme
  )

  const currentMode = useTheme(
    (state) => state.mode
  )

  const setTheme = useTheme(
    (state) => state.setTheme
  )

  const setMode = useTheme(
    (state) => state.setMode
  )

  //------------------------------------------
  // LOCAL STATE
  //------------------------------------------

  const [selectedTheme, setSelectedTheme] =
    useState<ThemeColor>(
      currentTheme
    )

  const [selectedMode, setSelectedMode] =
    useState<ThemeMode>(
      currentMode
    )

  //------------------------------------------
  // THEMES
  //------------------------------------------

  const themes =
    Object.values(themeColorsMap)

  //------------------------------------------
  // LIVE PREVIEW
  //------------------------------------------

  useEffect(() => {

    setTheme(selectedTheme)
    setMode(selectedMode)

  }, [
    selectedTheme,
    selectedMode,
    setTheme,
    setMode,
  ])

  //------------------------------------------
  // SAVE
  //------------------------------------------

  function handleSave() {

    setTheme(selectedTheme)
    setMode(selectedMode)

    back()
  }

  //------------------------------------------
  // RENDER
  //------------------------------------------

  return (

    <div
      className="
            flex flex-col
            w-full
            px-5
           
            pb-32
      "
    >

      {/* TITLE */}

      <div
        className="
          mb-8
        "
      >

        <p
          className="
            text-sm

            text-(--color-text-secondary)
          "
        >
          Personalize as cores e o modo do app
        </p>

      </div>

      {/* MODE */}

      <div
        className="
          flex flex-col
          gap-4
          justify-center items-center
          w-full
        "
      >

        <span
          className="
            text-sm
            font-semibold

            text-(--color-text-primary)
          "
        >
          Modo
        </span>

        <div
          className="
            grid grid-cols-2
            gap-5
            w-full
            px-5
          "
        >

          {/* LIGHT */}

          <button
            onClick={() =>
              setSelectedMode(
                'light'
              )
            }
            className={`
              relative flex 
              h-24
              flex-col

              overflow-hidden

              rounded-3xl

              border

              transition-all

              ${
                selectedMode ===
                'light'
                  ? 'border-(--color-primary) ring-2 ring-(--color-primary)'
                  : 'border-(--color-border)'
              }
            `}
          >

            <div
              className="
                flex flex-1

                bg-[#f8fafc]
              "
            />

            <div
              className="
                flex h-10
                items-center
                justify-center

                bg-white
              "
            >

              <span
                className="
                  text-sm
                  font-medium
                  text-black
                "
              >
                Claro
              </span>

            </div>

            {selectedMode ===
              'light' && (

              <div
                className="
                  absolute right-3 top-3

                  flex h-6 w-6
                  items-center justify-center

                  rounded-full

                  bg-(--color-primary)

                  text-white
                "
              >

                <Check size={14} />

              </div>

            )}

          </button>

          {/* DARK */}

          <button
            onClick={() =>
              setSelectedMode(
                'dark'
              )
            }
            className={`
              relative flex h-24
              flex-col

              overflow-hidden

              rounded-3xl

              border

              transition-all

              ${
                selectedMode ===
                'dark'
                  ? 'border-(--color-primary) ring-2 ring-(--color-primary)'
                  : 'border-(--color-border)'
              }
            `}
          >

            <div
              className="
                flex flex-1

                bg-[#0f172a]
              "
            />

            <div
              className="
                flex h-10
                items-center
                justify-center

                bg-[#111827]
              "
            >

              <span
                className="
                  text-sm
                  font-medium
                  text-white
                "
              >
                Escuro
              </span>

            </div>

            {selectedMode ===
              'dark' && (

              <div
                className="
                  absolute right-3 top-3

                  flex h-6 w-6
                  items-center justify-center

                  rounded-full

                  bg-(--color-primary)

                  text-white
                "
              >

                <Check size={14} />

              </div>

            )}

          </button>

        </div>

      </div>

      {/* COLORS */}

      <div
        className="
          mt-10
          justify-center items-center
          flex flex-col
          gap-4
        "
      >

        <span
          className="
            text-sm
            font-semibold
            text-left
            text-(--color-text-primary)
          "
        >
          Cor principal
        </span>

        <div
          className="
            grid grid-cols-3
            gap-4
          "
        >

          {themes.map((theme) => (

            <button
              key={theme.id}

              onClick={() =>
                setSelectedTheme(
                  theme.id
                )
              }

              className={`
                relative flex
                w-20 h-20
                items-center
                justify-center

                rounded-3xl

                transition-all
                active:scale-95

                ${
                  selectedTheme ===
                  theme.id
                    ? 'scale-105 ring-4 ring-(--color-border)'
                    : ''
                }
              `}

              style={{
                background:
                  theme.color,
              }}
            >

              {selectedTheme ===
                theme.id && (

                <Check
                  size={32}
                  className="
                    text-white
                  "
                />

              )}

            </button>

          ))}

        </div>

      </div>

      {/* SAVE BUTTON */}

      <button
        onClick={handleSave}
        className="
          mt-12

          flex h-14
          w-full
          items-center justify-center

          rounded-3xl

          bg-linear-to-b 
          from-(--color-primary) 
          to-(--color-hover-btn)

          text-sm
          font-semibold
          text-white

          shadow-md

          transition-all
          active:scale-[0.98]
        "
      >
        Salvar aparência
      </button>

    </div>
  )
}