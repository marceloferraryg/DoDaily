'use client'

import { useState } from 'react'

import {
  ArrowLeft,
  ArrowRight,
  Palette,
  User,
  Download,
} from 'lucide-react'

import { AppShell } from '@/components/AppShell'

import { MenuTabBar } from '@/components/utils/MenuTabBar'

import FormPerfil from '@/components/settings/FormPerfil'
import FormTheme from '@/components/settings/FormTheme'
import FormInstallation from '@/components/settings/FormInstallation'

import { useUser } from '@/store/useUser'

type ActiveForm =
  | 'menu'
  | 'profile'
  | 'theme'
  | 'installation'

export default function Profile() {

  //------------------------------------------
  // STORE
  //------------------------------------------

  const user = useUser(
    (state) => state.user
  )

  //------------------------------------------
  // LOCAL STATE
  //------------------------------------------

  const [activeForm, setActiveForm] =
    useState<ActiveForm>('menu')

  //------------------------------------------
  // GUARD
  //------------------------------------------

  if (!user) {
    return null
  }

  //------------------------------------------
  // MENU ITEMS
  //------------------------------------------

  const menuItems = [
    {
      id: 'profile' as ActiveForm,
      title: 'Perfil',
      icon: User,
    },

    {
      id: 'theme' as ActiveForm,
      title: 'Aparência',
      icon: Palette,
    },

    {
      id: 'installation' as ActiveForm,
      title: 'Instalação',
      icon: Download,
    },
  ]

  //------------------------------------------
  // BACK
  //------------------------------------------

  function handleBack() {
    setActiveForm('menu')
  }

  //------------------------------------------
  // TITLE
  //------------------------------------------

  function getTitle() {

    switch (activeForm) {

      case 'profile':
        return 'Perfil'

      case 'theme':
        return 'Aparência'
      
      case 'installation':
        return 'Instalação'

      default:
        return ''
    }
  }

  //------------------------------------------
  // RENDER
  //------------------------------------------

  return (

    <AppShell>

      <div
        className="
          relative flex
          h-dvh
          w-full
          flex-col

          overflow-hidden

          bg-(--color-bg-body)
        "
      >

        {/* HEADER */}

        <div
          className="
            relative flex
            h-60
            w-full
            flex-col
            items-center
            justify-center

            bg-linear-to-b
            from-(--color-primary)
            to-(--color-hover-btn)

            px-5
          "
        >

          {/* AVATAR */}

          <div
            className="
              flex h-28 w-28
              items-center justify-center

              rounded-full

              border-6
              border-(--color-border)

              bg-(--color-bg-body)

              shadow-[0_0_30px_rgba(255,255,255,0.15)]
            "
          >

            <span
              className="
                text-4xl
                font-bold

                text-(--color-primary)
              "
            >
              {user.name
                ?.charAt(0)
                .toUpperCase()}
            </span>

          </div>

          {/* NAME */}

          <h1
            className="
              mt-3

              text-2xl
              font-bold

              text-white
            "
          >
            {user.name}
          </h1>

          {/* EMAIL */}

          {user.email && (

            <span
              className="
                text-sm mb-3

                text-(--color-text-secondary-white)
              "
            >
              {user.email}
            </span>

          )}

        </div>

        {/* CONTENT */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            top-54

            flex flex-col

            overflow-y-auto

            rounded-t-3xl

            bg-(--color-bg-body)

            px-5
            pt-6
            pb-28
          "
        >

          {/* INTERNAL HEADER */}

          {activeForm !== 'menu' && (

            <div
              className="
                mb-6

                flex items-center
                gap-4

                border-b border-(--color-border)

                pb-4
              "
            >

              <button
                onClick={handleBack}
                className="
                  flex h-11 w-11
                  items-center justify-center

                  rounded-full

                  bg-(--color-bg-card)

                  shadow-sm

                  transition-all
                  duration-200

                  active:scale-[0.96]
                "
              >

                <ArrowLeft
                  className="
                    text-(--color-text-primary)
                  "
                />

              </button>

              <h1
                className="
                  text-xl
                  font-bold

                  text-(--color-text-primary)
                "
              >
                {getTitle()}
              </h1>

            </div>

          )}

          {/* MENU */}

          {activeForm === 'menu' && (

            <div
              className="
                mt-4

                flex flex-col
                gap-4
              "
            >

              {menuItems.map((item) => {

                const Icon = item.icon

                return (

                  <button
                    key={item.id}

                    onClick={() =>
                      setActiveForm(item.id)
                    }

                    className="
                      flex h-16
                      w-full
                      items-center
                      justify-between

                      rounded-3xl

                      bg-(--color-bg-card)

                      px-5

                      shadow-sm

                      transition-all
                      duration-200

                      active:scale-[0.98]
                    "
                  >

                    {/* LEFT */}

                    <div
                      className="
                        flex items-center
                        gap-4
                      "
                    >

                      <div
                        className="
                          flex h-10 w-10
                          items-center justify-center

                          rounded-2xl

                          bg-(--color-primary)/10
                        "
                      >

                        <Icon
                          size={22}
                          className="
                            text-(--color-primary)
                          "
                        />

                      </div>

                      <span
                        className="
                          text-base
                          font-semibold

                          text-(--color-text-primary)
                        "
                      >
                        {item.title}
                      </span>

                    </div>

                    {/* RIGHT */}

                    <ArrowRight
                      size={20}
                      className="
                        text-(--color-text-muted)
                      "
                    />

                  </button>

                )
              })}

            </div>

          )}

          {/* PROFILE FORM */}

          {activeForm === 'profile' && (

            <FormPerfil
              user={user}
              back={handleBack}
            />

          )}

          {/* THEME FORM */}

          {activeForm === 'theme' && (

            <FormTheme
              back={handleBack}
            />

          )}

          {activeForm === 'installation' && (

            <FormInstallation 
              back={handleBack}
            />

          )}

        </div>

      </div>

      <MenuTabBar />

    </AppShell>
  )
}