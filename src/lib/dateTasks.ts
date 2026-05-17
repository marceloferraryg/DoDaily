import { Task } from '@/store/useTasks'

/*
-----------------------------------
DATE HELPERS
-----------------------------------
*/

function toISO(date: Date) {
  const year = date.getFullYear()

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, '0')

  const day = String(
    date.getDate(),
  ).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function todayISO() {
  return toISO(new Date())
}

export function tomorrowISO() {
  const date = new Date()

  date.setDate(date.getDate() + 1)

  return toISO(date)
}

export function currentTimeISO() {
  return new Date()
    .toTimeString()
    .slice(0, 5)
}

/*
-----------------------------------
SORT
-----------------------------------
*/

export function sortTasks(tasks: Task[]) {
  return [...tasks].sort((a, b) => {
    /*
    concluídas por último
    */

    if (a.done !== b.done) {
      return Number(a.done) - Number(b.done)
    }

    /*
    tarefas com horário primeiro
    */

    if (a.time && !b.time) return -1

    if (!a.time && b.time) return 1

    /*
    ordenar horário
    */

    if (a.time && b.time) {
      return a.time.localeCompare(
        b.time,
      )
    }

    /*
    fallback
    */

    return 0
  })
}

/*
-----------------------------------
LATE TASKS
-----------------------------------
*/

export function getLateTodayTasks(
  tasks: Task[],
) {
  const today = todayISO()

  const currentTime =
    currentTimeISO()

  return tasks.filter((task) => {
    return (
      !task.done &&
      task.date === today &&
      !!task.time &&
      task.time < currentTime
    )
  })
}

export function isTaskLate(
  task: Task,
) {
  const today = todayISO()

  const currentTime =
    currentTimeISO()

  /*
  concluída nunca atrasa
  */

  if (task.done) {
    return false
  }

  /*
  sem data não atrasa
  */

  if (!task.date) {
    return false
  }

  /*
  dias anteriores
  */

  if (task.date < today) {
    return true
  }

  /*
  hoje + horário vencido
  */

  if (
    task.date === today &&
    task.time &&
    task.time < currentTime
  ) {
    return true
  }

  return false
}

/*
-----------------------------------
GROUPS
-----------------------------------
*/

export function getTaskGroups(
  tasks: Task[],
) {
  const today = todayISO()

  const tomorrow = tomorrowISO()

  const todayTasks: Task[] = []

  const tomorrowTasks: Task[] = []

  const overdueTasks: Task[] = []

  const futureTasks: Task[] = []

  const noDateTasks: Task[] = []

  for (const task of tasks) {
    /*
    SEM DATA
    */

    if (!task.date) {
      noDateTasks.push(task)
      continue
    }

    /*
    ATRASADAS
    */

    if (isTaskLate(task)) {
      overdueTasks.push(task)
      continue
    }

    /*
    HOJE
    */

    if (task.date === today) {
      todayTasks.push(task)
      continue
    }

    /*
    AMANHÃ
    */

    if (task.date === tomorrow) {
      tomorrowTasks.push(task)
      continue
    }

    /*
    FUTURAS
    */

    if (task.date > tomorrow) {
      futureTasks.push(task)
    }
  }

  return {
    todayTasks: sortTasks(todayTasks),

    tomorrowTasks: sortTasks(
      tomorrowTasks,
    ),

    overdueTasks: sortTasks(
      overdueTasks,
    ),

    futureTasks: sortTasks(
      futureTasks,
    ),

    noDateTasks: sortTasks(
      noDateTasks,
    ),
  }
}