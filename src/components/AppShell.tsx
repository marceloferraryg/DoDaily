'use client'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function AppShell({ children }: Props) {
  return (
    <div
      className="
        min-h-screen
        bg-(--color-bg-body)
        flex items-center justify-center
      "
    >
      <main
        className="
        relative
          w-full
          max-w-107.5
          min-h-screen
          bg-(--color-bg-body)
          overflow-hidden
          shadow-2xl
        


          md:rounded-4xl
          md:max-w-150
          

          xl:max-w-200

        "
      >
        {children}
      </main>
    </div>
  )
}