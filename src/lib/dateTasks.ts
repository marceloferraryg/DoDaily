import { Task } from '@/store/useTasks'

function toISO(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

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

export function sortTasks(tasks: Task[]) {
  return [...tasks].sort((a, b) => {
    // concluídas vão para baixo
    if (a.done !== b.done) {
      return Number(a.done) - Number(b.done)
    }

    // tarefas com hora primeiro
    if (a.time && b.time) {
      return a.time.localeCompare(b.time)
    }

    if (a.time) return -1
    if (b.time) return 1

    return 0
  })
}


export function getTaskGroups(tasks: Task[]) {
  const today = todayISO()
  const tomorrow = tomorrowISO()

  const todayTasks = []
  const tomorrowTasks = []
  const overdueTasks = []
  const futureTasks = []
  const noDateTasks = []

  for (const task of tasks) {
    if (!task.date) {
      noDateTasks.push(task)
      continue
    }

    if (task.date === today) {
      todayTasks.push(task)
      continue
    }

    if (task.date === tomorrow) {
      tomorrowTasks.push(task)
      continue
    }

    if (task.date < today) {
      overdueTasks.push(task)
      continue
    }

    if (task.date > tomorrow) {
      futureTasks.push(task)
    }
  }

  return {
    todayTasks: sortTasks(todayTasks),
    tomorrowTasks: sortTasks(tomorrowTasks),
    overdueTasks: sortTasks(overdueTasks),
    futureTasks: sortTasks(futureTasks),
    noDateTasks: sortTasks(noDateTasks),
  }
}