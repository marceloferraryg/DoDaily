'use client'

import { Plus } from 'lucide-react'

export default function AddItemsBar({ listId }: { listId: string }) {
  return (
    <div
      className="
        absolute bottom-0 left-0 right-0
        z-50
        mx-5
        mb-[calc(env(safe-area-inset-bottom)+20px)]

        flex items-center
        p-2
      "
    >
      <div
        className="
          mr-2
          flex-1
        "
      >
        <input
            type="text"
            placeholder="Adicione um item..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="done"
            className="
                h-10 w-full
                rounded-full
                border-none
                bg-(--color-input-bg)
                px-4

                text-base

                text-(--color-text-primary)

                shadow-sm
                outline-none
                transition-all

                placeholder:text-(--color-text-muted)

                focus:ring-2
                focus:ring-(--color-primary)/20
            "
            />
      </div>

      <button
        className="
          flex h-10 w-10
          items-center justify-center

          rounded-full

          bg-(--color-primary)

          shadow-md

          transition-all
          active:scale-[0.95]
        "
      >
        <Plus size={20} color="white" />
      </button>
    </div>
  )
}