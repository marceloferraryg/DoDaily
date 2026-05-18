'use client'

import FilterPeriod from './FilterPeriod'
import FilterCategory from './FilterCategory'
import FilterPriority from './FilterPriority'

import { TaskCategory } from '@/maps/TaskCategoryMap'
import { TaskPriority } from '@/maps/TaskPriorityMap'
import { FilterPeriodType } from '@/maps/TaskPeriodMap' 


type Props = {
  period: FilterPeriodType
  onChangePeriod: (
    value: FilterPeriodType
  ) => void

  categories: TaskCategory[]
  onChangeCategories: (
    value: TaskCategory[]
  ) => void

  priorities: TaskPriority[]
  onChangePriorities: (
    value: TaskPriority[]
  ) => void
}

export default function TaskFilters({
  period,
  onChangePeriod,
  categories,
  onChangeCategories,
  priorities,
  onChangePriorities,
}: Props) {
  return (
    <div className="flex flex-col w-full p-5 gap-3">

      <section>
        <h3 className="mb-2 text-lg font-bold text-(--color-text-primary)">
          Período
        </h3>

        <FilterPeriod
          value={period}
          onChange={onChangePeriod}
        />
      </section>

      <section>
        <h3 className="mb-2 text-lg font-bold text-(--color-text-primary)">
          Categoria
        </h3>

        <FilterCategory
          value={categories}
          onChange={onChangeCategories}
        />
      </section>

      <section>
        <h3 className="mb-2 text-lg font-bold text-(--color-text-primary)">
          Prioridade
        </h3>

        <FilterPriority
          value={priorities}
          onChange={onChangePriorities}
        />
      </section>

    </div>
  )
}