
import { TaskCategory } from '@/components/tasks/maps/TaskCategoryMap'
import { TaskPriority } from '@/components/tasks/maps/TaskPriorityMap'


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