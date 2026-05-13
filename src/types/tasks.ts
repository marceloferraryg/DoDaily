
import { TaskCategory } from '@/components/tasks/TaskCategoryMap'


export type Task = {
  id: string
  title: string
  category: TaskCategory
  done: boolean
  date?: string
  time?: string
  notes?: string
}