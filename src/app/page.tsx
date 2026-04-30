'use client'

import { useState } from 'react'
import { HeaderHome } from '@/components/HeaderHome'
import { TaskCard } from '@/components/TaskCard'
import SummaryDay from '@/components/SummaryDay'
import { useTasks } from '@/store/useTasks'
import { FabButton } from '@/components/FabButton'
import { Task } from '@/components/TaskCard'

export default function Home() {
  
  const tasks = useTasks((state) => state.tasks)
  const toggleTask = useTasks((state) => state.toggleTask)
  const removeTask = useTasks((state) => state.removeTask)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  return (
    <main className="flex flex-col h-screen bg-(--color-bg-body) overflow-hidden">
      <HeaderHome />

      <div
        className="flex flex-1 flex-col p-5 bg-(--color-bg-body)
                     overflow-y-auto scroll-smooth pb-40 rounded-t-3xl -mt-5"
      >
        <SummaryDay />

        <div className="mt-6">
          <h1 className="text-2xl font-bold text-(--color-text-primary) mb-5">
            Tarefas de hoje
          </h1>

          {tasks.map((task) => ( 
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onRemove={() => removeTask(task.id)}
              onShowNotes={() => setSelectedTask(task)}
            />
          ))}
        </div>
      </div>

      <FabButton />

    </main>
  )
}
