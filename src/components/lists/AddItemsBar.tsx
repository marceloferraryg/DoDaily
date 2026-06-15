'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

import { useItemList } from '@/store/useItemList'
import incrementUserActions from '@/hooks/useIncrementUserActions'

export default function AddItemsBar({ listId, listEmpty }: { listId: string; listEmpty: boolean }) {
  const [itemTitle, setItemTitle] = useState<string>('')
  const addItem = useItemList((state) => state.addItem)

  async function handleAddItem() {
    if (itemTitle.trim() === '') return

    try {
      addItem(listId, itemTitle)
      setItemTitle('')
      incrementUserActions()
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddItem()
    }
  }

  return (
    /* ALTERAÇÃO AQUI: 
      - Removemos o absolute, bottom-0, left-0, right-0.
      - Removemos o cálculo agressivo de margin-bottom (mb-).
      - Deixamos a largura total com w-full e adicionamos pb-4 (ou pb-2) apenas para distanciar do limite do container.
    */
    <div
      className="
        w-full
        z-50
        px-5
        pb-5
        flex items-center
        p-2
      "
    >
      <div className="mr-2 flex-1">
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
          bg-linear-to-b
          from-(--color-primary)
          to-(--color-hover-btn)
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