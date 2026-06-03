'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'

import { AppShell } from '@/components/AppShell'

import { HeaderHome } from '@/components/headers/HeaderHome'

import SummaryDay from '@/components/utils/SummaryDay'
import { FabButton } from '@/components/utils/FabButton'
import { MenuTabBar } from '@/components/utils/MenuTabBar'
import InstallBanner from '@/components/utils/InstallBanner'

import { TaskCard } from '@/components/tasks/TaskCard'
import { TaskSwipeCard } from '@/components/tasks/TaskSwipeCard'

import { InfoTaskBottom } from '@/components/utils/InfoTaskBottom'
import { ConfirmBottom } from '@/components/utils/ConfirmBottom'

import { useTasks } from '@/store/useTasks'

import { Task } from '@/types/tasks'

import { useUser } from '@/store/useUser'


import {
  getTaskGroups,
  sortTasks,
} from '@/lib/dateTasks'

export default function Home() {
  const router = useRouter()

  const [showBanner, setShowBanner] = useState(false)

  const tasks = useTasks(
    (state) => state.tasks
  )

  const toggleTask = useTasks(
    (state) => state.toggleTask
  )

  const removeTask = useTasks(
    (state) => state.removeTask
  )

  const {
    todayTasks,
    tomorrowTasks,
    overdueTasks,
    noDateTasks,
  } = getTaskGroups(tasks)

  const [newUser, setNewUser] = useState<string>('')

  /*
  ------------------------
  TASKS DA HOME
  ------------------------
  */

  // Tasks de hoje + tasks sem data
  const homeToday = sortTasks([
    ...todayTasks,
    ...noDateTasks,
  ])

  // Tasks realmente atrasadas + tasks de hoje
  // que passaram do horário
 const homeOverdue =
  sortTasks(overdueTasks)

  /*
  ------------------------
  MODALS
  ------------------------
  */

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null)

  const [isInfoOpen, setIsInfoOpen] =
    useState(false)

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false)

  /*
  ------------------------
  ACTIONS
  ------------------------
  */

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

  /*
  ------------------------
  RENDER TASKS
  ------------------------
  */

  function renderTasks(list: Task[]) {
    return list.map((task) => (
      <TaskSwipeCard
        key={task.id}
        onComplete={() =>
          toggleTask(task.id)
        }
        onRemove={() => openDelete(task)}
        isDone={task.done}
      >
        <TaskCard
          task={task}
          onShowNotes={() =>
            openInfo(task)
          }
          onRemove={() =>
            openDelete(task)
          }
        />
      </TaskSwipeCard>
    ))
  }

   /*
  ------------------------
  USER
  ------------------------
  */

  const user = useUser(
  (state) => state.user
)

const createUser = useUser(
  (state) => state.createUser
)

function handleEnter(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  async function handleSubmit() {

  const formattedName =
    newUser.trim()

  if (!formattedName) {
    return
  }

  createUser(formattedName)
}
  
const isDisabled =
  newUser.trim().length === 0

 /*
  ------------------------
  INSTALL BANNER
  ------------------------
  */

  useEffect(() => {

  const timer =
    setTimeout(() => {
      setShowBanner(true)
    }, 3000)

    clearTimeout(timer)

}, [])

  return (
    <AppShell>


    {user === null ? (


    <div 
      className=' flex flex-col h-screen w-full
                  bg-(--color-bg-body)
                  justify-center items-center
                  '>


        <Image
          src="/images/logoDoDaily.png"
          alt="Logo"
          width={100}
          height={100}
        />

      <h1 className='text-lg font-bold text-(--color-text-primary) mt-8'> 
        Bem-vindo ao DoDaily
      </h1>

      <span className='text-md text-(--color-text-secondary) mt-5'>
        Me diga, qual seu primeiro nome?
      </span>

      <input 
        type="text"
        autoFocus
        maxLength={20}
        value={newUser}
        placeholder="Seu primeiro nome"
        onChange={(e) => setNewUser(e.target.value)}
        onKeyDown={handleEnter}
        className="
                  mt-3

                  h-12
                  w-72

                  rounded-3xl

                  border
                  border-(--color-border)
                  bg-(--color-input-bg)

                  px-4

                  text-base

                  outline-none

                  transition-all

                  focus:border-(--color-primary)
                  focus:ring-4
                  focus:ring-(--color-primary)/10
                "
                    
        
                    
      />

      

      <span
        className="
          mt-2

          max-w-72

          text-center
          text-sm
          leading-6

          text-(--color-text-muted)
        "
      >
        Seu nome será usado para personalizar
        sua experiência dentro do app.
      </span>

      <button 
           onClick={handleSubmit}
            disabled={isDisabled}
            className={`
              mt-5

              rounded-3xl

              px-5 py-3

              text-white
              text-sm
              font-medium

              transition-all

              ${
                isDisabled
                  ? 'bg-(--color-border) opacity-60'
                  : 'bg-(--color-primary) active:scale-[0.98]'
              }
            `}   
      >
            
        Continuar
      </button>

    </div>
    
  
    ) : (
    <div
        className="
          flex flex-col h-screen
          bg-(--color-bg-body)
          overflow-hidden
        "
      >
        <HeaderHome />

        <div
          className="
            flex flex-1 flex-col
            py-5
            bg-(--color-bg-body)
            overflow-y-auto
            scroll-smooth
            pb-40
            rounded-t-3xl
            mt-24
            z-100
            
          "
        >

        {showBanner && <InstallBanner />}

          <SummaryDay />

          {/* ATRASADAS */}

          {homeOverdue.length > 0 && (
            <section
              className="
                pb-8 mb-3
                bg-(--color-overdue-task) px-5 pt-3
              "
            >
              <h1
                className="
                  text-lg font-bold
                  text-red-500
                  mb-3
                "
              >
                Atrasadas
              </h1>

              <div className="space-y-3">
                {renderTasks(homeOverdue)}
              </div>
            </section>
          )}

          {/* HOJE */}

          <div className="px-5">
            <section
              className="
                border-b border-(--color-border)
                pb-8
              "
            >
              <h1
                className="
                  text-lg font-bold
                  text-(--color-text-primary)
                  mb-3
                "
              >
                Tarefas de hoje
              </h1>

              <div className="space-y-3">
                {homeToday.length > 0 ? (
                  renderTasks(homeToday)
                ) : (
                  <p
                    className="
                      text-(--color-text-muted)
                      text-sm
                    "
                  >
                    Nenhuma tarefa para hoje
                  </p>
                )}
              </div>
            </section>

            {/* AMANHÃ */}

            <section className="mt-3">
              <h1
                className="
                  text-lg font-bold
                  text-(--color-text-primary)
                  mb-3
                "
              >
                Amanhã
              </h1>

              <div className="space-y-3">
                {tomorrowTasks.length > 0 ? (
                  renderTasks(
                    sortTasks(tomorrowTasks)
                  )
                ) : (
                  <p
                    className="
                      text-(--color-text-muted)
                      text-sm
                    "
                  >
                    Nenhuma tarefa para amanhã
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>

        <FabButton />

        <MenuTabBar />

        {selectedTask && (
          <>
            <InfoTaskBottom
              isOpen={isInfoOpen}
              onClose={() =>
                setIsInfoOpen(false)
              }
              onEdit={() =>
                router.push(
                  `/tasks/${selectedTask.id}`
                )
              }
              task={selectedTask}
            />

            <ConfirmBottom
              isOpen={isDeleteOpen}
              onClose={() =>
                setIsDeleteOpen(false)
              }
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
    )}


      
    </AppShell>
  )
}