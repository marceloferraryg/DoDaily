'use client'

import {
  taskPeriodMap,
  FilterPeriodType,
} from '../maps/TaskPeriodMap'

type Props = {
  value: FilterPeriodType
  onChange: (
    value: FilterPeriodType
  ) => void
}

export default function FilterPeriod({
  value,
  onChange,
}: Props) {
  const periods =
    Object.values(taskPeriodMap)

  return (
    <div
      className="
        flex w-full gap-1
        rounded-3xl
        bg-(--color-bg-task)
        p-1 shadow-md
      "
    >
      {periods.map((item) => {
        const isActive =
          item.value === value

        return (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              onChange(item.value)
            }
            className={`
              flex-1 min-w-0
              py-2
              rounded-3xl
              text-xs font-medium
              transition-all
              active:scale-95
              cursor-pointer
              truncate
              ${
                isActive
                  ? 'bg-(--color-primary) text-(--color-text-primary-white) shadow-md'
                  : 'bg-(--color-bg-task) text-(--color-text-primary)'
              }
            `}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}