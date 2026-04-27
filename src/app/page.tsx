'use client'

import { HeaderHome } from '@/components/HeaderHome'
import { TaskCard } from '@/components/TaskCard'
import SummaryDay from '@/components/SummaryDay'
import { useTasks } from '@/store/useTasks'
import { FabButton } from '@/components/FabButton'

export default function Home() {
  const { tasks, toggleTask } = useTasks()

  return (
    <main className="flex flex-col h-screen bg-(--color-bg-body) overflow-hidden">
      <HeaderHome />

      <div
        className="flex flex-1 flex-col p-5 bg-(--color-bg-body)
                     overflow-y-auto scroll-smooth pb-40 rounded-t-3xl -mt-5"
      >
        <SummaryDay />

        <div className="mt-8">
          <h1 className="text-2xl font-bold text-(--color-text-primary) mb-5">
            Tarefas de hoje
          </h1>

          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              done={task.done}
              onToggle={() => toggleTask(task.id)}
            />
          ))}
        </div>
      </div>

      <FabButton />
    </main>
  )
}
