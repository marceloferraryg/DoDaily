'use client'

import {
  taskCategoriesMap,
  TaskCategory,
} from '@/maps/TaskCategoryMap'

type Props = {
  value: TaskCategory[]
  onChange: (value: TaskCategory[]) => void
}

export default function FilterCategory({ value, onChange }: Props) {
 
  const categories = Object.values(taskCategoriesMap)

  function toggleCategory(category: TaskCategory) {
    const alreadySelected =
      value.includes(category)

    if (alreadySelected) {
      onChange(
        value.filter((item) => item !== category)
      )

      return
    }

    onChange([...value, category])
  }

  return (
    <div
      className="
        grid grid-cols-4 gap-1
        w-full rounded-3xl
        bg-(--color-bg-task)
        p-1 shadow-md
      "
    >
      {categories.map((item) => {
        const Icon = item.icon

        const isActive =
          value.includes(item.id)

        return (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              toggleCategory(item.id)
            }
            className={`
              flex flex-col
              py-2 rounded-3xl
              transition-all active:scale-95
              justify-center items-center
              cursor-pointer
              ${
                isActive
                  ? ' bg-linear-to-b from-(--color-primary) to-(--color-hover-btn) text-white shadow-md'
                  : 'bg-(--color-input-bg)'
              }
            `}
          >
            <Icon
              size={20}
              color={
                isActive
                  ? '#ffffff'
                  : item.color
              }
            />

            <span
              className={`
                text-xs font-medium truncate
                ${
                  isActive
                    ? 'text-white'
                    : 'text-(--color-text-primary)'
                }
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