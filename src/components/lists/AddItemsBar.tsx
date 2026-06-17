'use client'

import { useEffect, useState } from 'react'
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


  useEffect(() => {
  if (!window.visualViewport) return

  const handleResize = () => {
    console.log(
      'Viewport:',
      window.visualViewport?.height
    )
  }

  window.visualViewport.addEventListener(
    'resize',
    handleResize
  )

  return () => {
    window.visualViewport?.removeEventListener(
      'resize',
      handleResize
    )
  }
}, [])

  return (
  
    <div
      className="
        absolute bottom-0 left-0 right-0
        flex items-center
        mb-[calc(env(safe-area-inset-bottom)+8px)]
        
        w-full
        z-100
        p-5
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
            text-[16px]
            text-(--color-text-primary)
            shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]
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