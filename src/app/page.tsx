'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AppShell } from '@/components/AppShell'
import { HeaderHome } from '@/components/HeaderHome'
import SummaryDay from '@/components/SummaryDay'
import { FabButton } from '@/components/FabButton'
import { TaskCard } from '@/components/TaskCard'
import { TaskSwipeCard } from '@/components/TaskSwipeCard'

import { InfoTaskBottom } from '@/components/InfoTaskBottom'
import { ConfirmBottom } from '@/components/ConfirmBottom'

import { useTasks } from '@/store/useTasks'
import { Task } from '@/types/tasks'
import { getTaskGroups, sortTasks } from '@/lib/dateTasks'

export default function Home() {
  const router = useRouter()

  const tasks = useTasks((state) => state.tasks)
  const toggleTask = useTasks((state) => state.toggleTask)
  const removeTask = useTasks((state) => state.removeTask)

  const {
  todayTasks,
  tomorrowTasks,
  noDateTasks
  } = getTaskGroups(tasks)

  const homeToday = sortTasks([...todayTasks, ...noDateTasks])
 

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  function openInfo(task: Task) {
    setSelectedTask(task)
    setIsInfoOpen(true)
  }

  function openDelete(task: Task) {
    setSelectedTask(task)
    setIsDeleteOpen(true)
  }

  function confirmDelete() {
    if (!selectedTask) return

    removeTask(selectedTask.id)
    setIsDeleteOpen(false)
    setSelectedTask(null)
  }

  return (
    <AppShell>
      <div className="flex flex-col h-screen bg-(--color-bg-body) overflow-hidden">

        <HeaderHome />

        <div
          className="
            flex flex-1 flex-col p-5
            bg-(--color-bg-body)
            overflow-y-auto scroll-smooth
            pb-40 rounded-t-3xl -mt-5
          "
        >
          <SummaryDay />

          <div className="mt-2 border-b border-(--color-border) pb-10">
            <h1 className="text-2xl font-bold text-(--color-text-primary) mb-5">
              Tarefas de hoje
            </h1>

            {homeToday.map((task) => (
              <TaskSwipeCard
                key={task.id}
                onComplete={() => toggleTask(task.id)}
                onRemove={() => openDelete(task)}
                isDone={task.done}
              >
                <TaskCard
                  task={task}
                  onShowNotes={() => openInfo(task)}
                  onRemove={() => openDelete(task)}
                />
              </TaskSwipeCard>
            ))}

            
          </div>

          <div className='mt-2'>
              <h1 className="text-2xl font-bold text-(--color-text-primary) mb-5">
              Amanhã
            </h1>

            {tomorrowTasks.map((task) => (
              <TaskSwipeCard
                key={task.id}
                onComplete={() => toggleTask(task.id)}
                onRemove={() => openDelete(task)}
                isDone={task.done}
              >
                <TaskCard
                  task={task}
                  onShowNotes={() => openInfo(task)}
                  onRemove={() => openDelete(task)}
                />
              </TaskSwipeCard>
            ))}
          </div>
        </div>

        <FabButton />

        {selectedTask && (
          <>
            <InfoTaskBottom
              isOpen={isInfoOpen}
              onClose={() => setIsInfoOpen(false)}
              onEdit={() => router.push(`/tasks/${selectedTask.id}`)}
              task={selectedTask}
            />

            <ConfirmBottom
              isOpen={isDeleteOpen}
              onClose={() => setIsDeleteOpen(false)}
              onConfirm={confirmDelete}
              task={selectedTask}
              title="Remover tarefa"
              message="Tem certeza que deseja remover esta tarefa?"
              confirmText="Remover"
              cancelText="Cancelar"
              variant="danger"
            />
          </>
        )}
      </div>
    </AppShell>
  )
}