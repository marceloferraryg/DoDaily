import { Task } from '@/store/useTasks'
import { TaskCategory } from '@/maps/TaskCategoryMap'
import { TaskPriority } from '@/maps/TaskPriorityMap'
import { FilterPeriodType } from '@/maps/TaskPeriodMap' 

import {
  todayISO,
  tomorrowISO,
} from '@/lib/dateTasks'

type Filters = {
  period: FilterPeriodType
  categories: TaskCategory[]
  priorities: TaskPriority[]
}

function getNowTime() {
  const now = new Date()

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}

export function filterTasks(
  tasks: Task[],
  filters: Filters,
) {
  const today = todayISO()
  const tomorrow = tomorrowISO()

  const nowTime = getNowTime()

  /*
  ------------------------
  WEEK LIMIT
  amanhã + 6 dias
  ------------------------
  */

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

    /*
    Semana:
    amanhã até +7 dias
    (hoje NÃO entra)
    */

    if (filters.period === 'week') {
      if (
        !task.date ||
        task.date < tomorrow ||
        task.date > weekISO
      ) {
        return false
      }
    }

    /*
    Atrasadas:
    - datas anteriores a hoje
    - OU hoje com horário já passado
    */

    if (filters.period === 'late') {
      const isPastDate =
        task.date &&
        task.date < today

      const isLateToday =
        task.date === today &&
        task.time &&
        task.time < nowTime

      if (!isPastDate && !isLateToday) {
        return false
      }
    }

    /*
    Sem data:
    somente tasks sem date
    */

    if (filters.period === 'nodate') {
      if (task.date) {
        return false
      }
    }

    /*
    Todos:
    não filtra por data
    */

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