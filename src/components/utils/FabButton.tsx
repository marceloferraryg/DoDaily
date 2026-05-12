'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function FabButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/tasks/new')}
      aria-label="Nova tarefa"
      className="
        group
        absolute
        bottom-24
        right-16
        z-50

        w-16
        h-16
        rounded-full

        bg-(--color-primary)/95
        backdrop-blur-md
        border border-white/20

        text-white

        flex items-center justify-center

        shadow-[0_10px_30px_rgba(94,45,180,0.35)]

        transition-all duration-300 ease-out

        hover:scale-105
        hover:-translate-y-1
        hover:shadow-[0_16px_40px_rgba(94,45,180,0.45)]

        active:scale-95
      "
    >
      
      <div
        className="
          absolute inset-0 rounded-full
          bg-white/10
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
        "
      />

     
      <Plus
        size={30}
        strokeWidth={2.5}
        className="
          relative z-10
          transition-transform duration-300
          group-hover:rotate-90
        "
      />
    </button>
  )
}