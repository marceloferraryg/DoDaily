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

        md:flex
        md:items-center
        md:justify-center
      "
    >
      <main
        className="
          w-full
          max-w-107.5
          min-h-screen
          bg-(--color-bg-body)
          overflow-hidden

          md:min-h-screen
          md:rounded-4xl
          md:shadow-2xl
          md:border
          md:border-black/5

          xl:max-w-200

        "
      >
        {children}
      </main>
    </div>
  )
}