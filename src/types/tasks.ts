
import { TaskCategory } from '@/maps/TaskCategoryMap'
import { TaskPriority } from '@/maps/TaskPriorityMap'


export type Task = {
  id: string
  title: string
  category: TaskCategory
  priority: TaskPriority
  done: boolean
  date?: string
  time?: string
  notes?: string
}