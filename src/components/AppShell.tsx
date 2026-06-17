'use client'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function AppShell({ children }: Props) {
  return (
    <div
      className="
        w-full h-dvh
        bg-(--color-bg-body)
        flex items-center justify-center
        overflow-hidden
      "
    >
      <main
        className="
        relative
          w-full
         
          h-dvh 
          bg-(--color-bg-body)
          overflow-hidden
          shadow-2xl

          
          md:rounded-3xl
          md:h-screen
          md:max-w-150
          md:border
          md:border-(--color-input-bg)/50 /* Uma bordinha sutil se o fundo for igual */

          xl:max-w-180
          xl:h-screen
        "
      >
        {children}
      </main>
    </div>
  )
}