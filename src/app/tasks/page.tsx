'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { AppShell } from '@/components/AppShell'
import Header from '@/components/headers/Header'
import { FabButton } from '@/components/utils/FabButton'

import TaskFilters from '@/components/tasks/filters/TaskFilters'
import { filterTasks } from '@/lib/taskFilters'
import { TaskCard } from '@/components/tasks/TaskCard'
import { TaskSwipeCard } from '@/components/tasks/TaskSwipeCard'
import { InfoTaskBottom } from '@/components/utils/InfoTaskBottom'
import { ConfirmBottom } from '@/components/utils/ConfirmBottom'
import { MenuTabBar } from '@/components/utils/MenuTabBar'

import { useTasks } from '@/store/useTasks'
import { Task } from '@/types/tasks'

import { TaskCategory } from '@/maps/TaskCategoryMap'
import { TaskPriority } from '@/maps/TaskPriorityMap'
import { FilterPeriodType } from '@/maps/TaskPeriodMap' 


export default function Tasks() {
  
   const router = useRouter()

  const tasks = useTasks((state) => state.tasks)

  const toggleTask = useTasks((state) => state.toggleTask)
  const removeTask = useTasks((state) => state.removeTask)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const [loading] = useState(false)

  // filtro obrigatório
  const [period, setPeriod] =
    useState<FilterPeriodType>('today')

  // filtros opcionais
  const [categories, setCategories] = useState<
    TaskCategory[]
  >([])

  const [priorities, setPriorities] = useState<
    TaskPriority[]
  >([])


  const totalTasks = useMemo(() => {
    return tasks.length
  }, [tasks])

  if (loading) {
    return (
      <AppShell>
        <div className="flex h-screen items-center justify-center">
          <div className="text-(--color-text-secondary)">
            Carregando tarefa...
          </div>
        </div>
      </AppShell>
    )
  }

  const filteredTasks = filterTasks(tasks, {
  period,
  categories,
  priorities,
})

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
      <div
        className="
          relative flex h-dvh w-full
          flex-col overflow-hidden
          bg-(--color-bg-body)
        "
      >
        <Header
          title="Minhas Tarefas"
          subtitle={`${totalTasks} tarefas`}
          page='tasksPage'
        />

        <div
          className="
            z-60 mt-20 flex-1
            overflow-y-auto
            rounded-t-3xl
            bg-(--color-bg-body)
            pb-32 
            scroll-smooth
          "
        >
          <TaskFilters
            period={period}
            onChangePeriod={setPeriod}
            categories={categories}
            onChangeCategories={setCategories}
            priorities={priorities}
            onChangePriorities={setPriorities}
          />

        <div className='flex flex-col border-t border-(--color-border) mx-5 pt-5'>


          {filteredTasks.length === 0 ? ( 
                    <div className="z-60
                    flex flex-col w-full
                    rounded-t-3xl
                    bg-(--color-bg-body)
                    p-8
                    justify-center items-center 
                    text-center
                    gap-3 ">
                        <span className="block text-md font-semibold">
                            Nenhuma tarefa encontrada!
                        </span>

                        <span className="block text-sm text-(--color-text-secondary)">
                            Selecione outra opção de filtro 
                            ou remova algum para encontrar suas tarefas.
                        </span>

                        

                    </div>
                       
            ) : (

                filteredTasks.map((task) => (
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
                )))}

        </div>  

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
                      list={undefined}
                      note={undefined}
                      title="Remover tarefa"
                      message="Tem certeza que deseja remover esta tarefa?"
                      confirmText="Remover"
                      cancelText="Cancelar"
                      variant="danger"
                  />
               </>
           )}

        </div>

        <FabButton />
        
        <MenuTabBar />

      </div>
    </AppShell>
  )
}