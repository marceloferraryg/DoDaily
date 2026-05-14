'use client'

import { useState } from 'react'
import { taskCategoriesMap } from '@/components/tasks/TaskCategoryMap'

export default function FilterCategory() {

  const [active, setActive] = useState('')

  function handleActive(value: string) {
    setActive(value)
  }

  const categories = Object.values(taskCategoriesMap)

  return (
    <div
      className="
        grid grid-cols-4 gap-1
        w-full rounded-3xl
        bg-(--color-bg-task)
        p-1
        shadow-md
      "
    >
      {categories.map((item) => {
        const Icon = item.icon
        const isActive = item.id === active

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleActive(item.id)}
            className={`
              flex flex-col
              py-1  rounded-3xl
              transition-all active:scale-95
              justify-center items-center
              cursor-pointer
              ${
                isActive
                  ? 'bg-(--color-primary) text-white shadow-md'
                  : 'bg-(--color-input-bg) text-(--color-text-primary)'
              }
            `}
          >
            <Icon
              size={20}
              color={isActive ? '#ffffff' : item.color}
            />

            <span
              className={`
                text-xs font-medium truncate
                ${isActive ? 'text-white' : ''}
              `}
            >
              {item.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}