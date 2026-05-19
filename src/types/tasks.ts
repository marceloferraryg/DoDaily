
import { TaskCategory } from '@/maps/TaskCategoryMap'
import { TaskPriority } from '@/maps/TaskPriorityMap'


//------------------------------------------
//-------- TASK ----------------------------


export type Task = {
    id: string
    title: string
    category: TaskCategory
    priority: TaskPriority
    done: boolean
    date?: string
    time?: string
    notes?: string
    createdAt: number
}

//------------------------------------------
//-------- NEW TASK ------------------------

export type NewTask = {
    title: string
    category: TaskCategory
    priority: TaskPriority
    date?: string
    time?: string
    notes?: string
}

//------------------------------------------
//-------- TASKSTORE -----------------------

export type TaskStore = {
  tasks: Task[]

  addTask: (task: NewTask) => void

  updateTask: (
    id: string,
    data: Partial<Task>,
  ) => void

  toggleTask: (id: string) => void

  removeTask: (id: string) => void

  editTask: (
    id: string,
    updates: Partial<Task>,
  ) => void
}

