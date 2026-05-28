'use client'

import {
  taskPriorityMap,
  TaskPriority,
} from '@/maps/TaskPriorityMap'

type Props = {
  value: TaskPriority[]
  onChange: (value: TaskPriority[]) => void
}

export default function FilterPriority({ value, onChange }: Props) {

  const priorities = Object.values(taskPriorityMap)

  function togglePriority( priority: TaskPriority ) {
    const alreadySelected =
      value.includes(priority)

    if (alreadySelected) {
      onChange(
        value.filter((item) => item !== priority)
      )

      return
    }

    onChange([...value, priority])
  }

  return (
    <div
      className="
        flex w-full rounded-3xl
        justify-around items-center
        bg-(--color-bg-task)
        p-1 shadow-md
      "
    >
      {priorities.map((item) => {
        const isActive =
          value.includes(item.id)

        return (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              togglePriority(item.id)
            }
            className={`
              flex px-5 rounded-full
              font-medium
              justify-center items-center
              whitespace-nowrap
              transition-all active:scale-95
              cursor-pointer
              ${
                isActive
                  ? ' bg-linear-to-b from-(--color-primary) to-(--color-hover-btn) text-white shadow-md'
                  : 'text-(--color-text-primary)'
              }
            `}
          >
            <div className="flex justify-center items-center gap-2">
              <span className="text-xl font-extrabold">
                {item.icon}
              </span>

              <span className="text-xs font-medium">
                {item.name}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}