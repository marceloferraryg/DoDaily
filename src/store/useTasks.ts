import { create } from 'zustand'

type Task = {
  id: string
  title: string
  done: boolean
}

type TaskStore = {
  tasks: Task[]
  toggleTask: (id: string) => void
}

export const useTasks = create<TaskStore>((set) => ({
  tasks: [
    { id: '1', title: 'Tomar remédio', done: false },
    { id: '2', title: 'Ir ao mercado', done: true },
    { id: '3', title: 'Finalizar projeto', done: true },
    { id: '4', title: 'Ler 20 páginas', done: false },
  ],

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      ),
    })),
}))