'use client'

import { useTasks } from '@/store/useTasks'
import { todayISO } from '@/lib/dateTasks'

export default function SummaryDay() {


  const tasks = useTasks(
    (state) => state.tasks
  )

  const today = todayISO()

  const todayTasks = tasks.filter(
    (task) => task.date === today
  )

  const done = todayTasks.filter(
    (task) => task.done
  ).length

  const pending = todayTasks.filter(
    (task) => !task.done
  ).length

  return (
    <div
      className="
        flex flex-col items-center justify-center
        pb-5 mb-3 -mt-3
        border-b border-(--color-border)
        bg-(--color-bg-body)
      "
    >
      <h1
        className="
          mb-3
          text-(--color-text-primary)
          font-bold text-xl
        "
      >
        Resumo do dia
      </h1>

      <div className="flex justify-center gap-5">
        <div
          className="
            w-40 h-14
            bg-(--color-bg-summary-card)
            rounded-3xl
            flex flex-col
            justify-center items-center
            shadow-md
            hover:scale-[1.03]
            transition-transform
          "
        >
          <h1
            className="
              text-xl font-bold
              text-(--color-primary)
            "
          >
            {done}
          </h1>

          <p
            className="
              text-sm
              text-(--color-primary)
            "
          >
            {done === 1
              ? 'Concluída'
              : 'Concluídas'}
          </p>
        </div>

        <div
          className="
            w-40 h-14
            bg-(--color-bg-summary-card)
            rounded-3xl
            flex flex-col
            justify-center items-center
            shadow-md
            hover:scale-[1.03]
            transition-transform
          "
        >
          <h1
            className="
              text-xl font-bold
              text-(--color-primary)
            "
          >
            {pending}
          </h1>

          <p
            className="
              text-sm
              text-(--color-primary)
            "
          >
            {pending === 1
              ? 'Pendente'
              : 'Pendentes'}
          </p>
        </div>
      </div>
    </div>
  )
}