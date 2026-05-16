import { Task } from '@/store/useTasks'
import { TaskCategory } from '@/components/tasks/maps/TaskCategoryMap'
import { TaskPriority } from '@/components/tasks/maps/TaskPriorityMap'
import {
  todayISO,
  tomorrowISO,
} from '@/lib/dateTasks'

export type FilterPeriod =
  | 'today'
  | 'week'
  | 'all'
  | 'late'

type Filters = {
  period: FilterPeriod
  categories: TaskCategory[]
  priorities: TaskPriority[]
}

export function filterTasks( tasks: Task[], filters: Filters ) {
 
  const today = todayISO()

  const weekDate = new Date()
  weekDate.setDate(weekDate.getDate() + 7)

  const weekISO = weekDate
    .toISOString()
    .split('T')[0]

  return tasks.filter((task) => {
    /*
    ------------------------
    PERIOD
    ------------------------
    */

    if (filters.period === 'today') {
      if (task.date !== today) {
        return false
      }
    }

    if (filters.period === 'week') {
      if (
        !task.date ||
        task.date < today ||
        task.date > weekISO
      ) {
        return false
      }
    }

    if (filters.period === 'late') {
      if (
        !task.date ||
        task.date >= today
      ) {
        return false
      }
    }

    /*
    ------------------------
    CATEGORY
    ------------------------
    */

    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(task.category)
    ) {
      return false
    }

    /*
    ------------------------
    PRIORITY
    ------------------------
    */

    if (
      filters.priorities.length > 0 &&
      !filters.priorities.includes(task.priority)
    ) {
      return false
    }

    return true
  })
}