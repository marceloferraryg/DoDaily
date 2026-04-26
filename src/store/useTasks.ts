
import { create } from 'zustand'
import { persist } from 'zustand/middleware'



export type Task = {
  id: string
  title: string
  done: boolean
  date?: string
  time?: string
  notes?: string
}

type NewTask = {
  title: string
  date?: string
  time?: string
  notes?: string
}

type TaskStore = {
  tasks: Task[]

  addTask: (task: NewTask) => void
  toggleTask: (id: string) => void
  removeTask: (id: string) => void
}



export const useTasks = create<TaskStore>()(

  persist(
    (set) => ({
      tasks: [],

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now().toString(),
              title: task.title,
              done: false,
              date: task.date,
              time: task.time,
              notes: task.notes,
            },
          ],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, done: !task.done }
              : task
          ),
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: 'dodaily-tasks',
    }
  )
)