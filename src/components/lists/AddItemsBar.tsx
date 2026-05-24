'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

import { useItemList } from '@/store/useItemList'


export default function AddItemsBar({ listId, listEmpty }: { listId: string; listEmpty: boolean }) {

  const [itemTitle, setItemTitle] = useState<string>('')
  const addItem = useItemList((state) => state.addItem)

function handleAddItem() {

  if (itemTitle.trim() === '') return

  addItem(listId, itemTitle)
  setItemTitle('')
}

function handleEnter(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddItem()
    }
  }

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
            placeholder={listEmpty ? "Adicione seu primeiro item..." : "Adicione um item..."}
            maxLength={100}
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="done"
            onKeyDown={handleEnter}
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
        onClick={handleAddItem}
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