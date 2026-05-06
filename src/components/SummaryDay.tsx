import { useTasks } from '@/store/useTasks'

export default function SummaryDay() {

const tasks = useTasks((state) => state.tasks)

const done = tasks.filter(t => t.done).length
const pending = tasks.filter(t => !t.done).length

  return (
    <div className="flex flex-col items-center justify-center pb-10 border-b border-(--color-border)
                     bg-(--color-bg-body)">

      <h1 className="mb-4 text-(--color-text-primary) font-bold text-2xl">
        Resumo do dia
      </h1>

      <div className="flex justify-center gap-5">
        
        <div className="w-40 h-20 bg-(--color-bg-summary-card) rounded-2xl flex flex-col 
                        justify-center items-center shadow-md  hover:scale-[1.03]">
          <h1 className="text-3xl font-bold text-(--color-primary)">{done}</h1>
          <p className="text-md text-(--color-text-secondary)">{done === 1 ? 'Concluída' : 'Concluídas'}</p>
        </div>

        <div className="w-40 h-20 bg-(--color-bg-summary-card) rounded-2xl flex flex-col 
                        justify-center items-center shadow-md  hover:scale-[1.03]">
          <h1 className="text-3xl font-bold text-(--color-primary)">{pending}</h1>
          <p className="text-md text-(--color-text-secondary)">{pending === 1 ? 'Pendente' : 'Pendentes'}</p>
        </div>

      </div>
    </div>
  )
}