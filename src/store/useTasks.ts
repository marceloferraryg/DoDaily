import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { v4 as uuid } from 'uuid'

import { Task, TaskStore } from '@/types/tasks'


//------------------------------------------
//-------- SORT TASKS ----------------------

function sortTasks(tasks: Task[]) {
  return [...tasks].sort((a, b) => {
    /**
     * 1. não concluídas primeiro
     */
    if (a.done !== b.done) {
      return Number(a.done) - Number(b.done)
    }

    /**
     * 2. tarefas com horário primeiro
     */
    if (a.time && !b.time) return -1
    if (!a.time && b.time) return 1

    /**
     * 3. ordenar horário
     */
    if (a.time && b.time) {
      return a.time.localeCompare(b.time)
    }

    /**
     * 4. mais recentes primeiro
     */
    return b.createdAt - a.createdAt
  })
}

//------------------------------------------
//-------- USE TASKS PERSIST----------------

export const useTasks = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (task) =>
        set((state) => {
          const newTask: Task = {
            id: uuid(),

            title: task.title.trim(),

            category: task.category || 'other',
            priority: task.priority || 'low',

            done: false,

            date: task.date || '',
            time: task.time || '',
            notes: task.notes?.trim() || '',

            createdAt: Date.now(),
          }

          return {
            tasks: sortTasks([
              ...state.tasks,
              newTask,
            ]),
          }
        }),

      updateTask: (id, data) =>
        set((state) => ({
          tasks: sortTasks(
            state.tasks.map((task) =>
              task.id === id
                ? {
                    ...task,
                    ...data,
                  }
                : task,
            ),
          ),
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: sortTasks(
            state.tasks.map((task) =>
              task.id === id
                ? {
                    ...task,
                    done: !task.done,
                  }
                : task,
            ),
          ),
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter(
            (task) => task.id !== id,
          ),
        })),

      editTask: (id, updates) =>
        set((state) => ({
          tasks: sortTasks(
            state.tasks.map((task) =>
              task.id === id
                ? {
                    ...task,
                    ...updates,
                  }
                : task,
            ),
          ),
        })),
    }),
    {
      name: 'dodaily-tasks-v1',
    },
  ),
)