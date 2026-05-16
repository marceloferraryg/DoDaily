'use client'

type FilterPeriodType =
  | 'today'
  | 'week'
  | 'all'
  | 'late'

type Props = {
  value: FilterPeriodType
  onChange: ( value: FilterPeriodType ) => void
}

export default function FilterPeriod({ value, onChange }: Props) {
  
  const periods = [
    {
      label: 'Hoje',
      value: 'today',
    },
    {
      label: 'Semana',
      value: 'week',
    },
    {
      label: 'Tudo',
      value: 'all',
    },
    {
      label: 'Atrasadas',
      value: 'late',
    },
  ] as const

  return (
    <div
      className="
        flex w-full
        rounded-3xl
        justify-around items-center
        bg-(--color-bg-task)
        p-1 shadow-md
      "
    >
      {periods.map((item) => {
        const isActive =
          item.value === value

        return (
          <button
            key={item.value}
            type="button"
            onClick={() =>
              onChange(item.value)
            }
            className={`
              flex px-5 py-1 rounded-3xl
              text-sm font-medium
              justify-center items-center
              whitespace-nowrap
              transition-all
              active:scale-95
              cursor-pointer
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