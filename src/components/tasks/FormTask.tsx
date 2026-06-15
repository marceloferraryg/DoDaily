'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock } from 'lucide-react'

import { AppShell } from '@/components/AppShell'
import Header from '@/components/headers/Header'
import TaskCategorySelect from '@/components/tasks/selects/TaskCategorySelect'
import { useTasks } from '@/store/useTasks'
import { TaskCategory } from '@/maps/TaskCategoryMap'
import { TaskPrioritySelect } from '@/components/tasks/selects/TaskPrioritySelect'
import { TaskPriority } from '@/maps/TaskPriorityMap'

import incrementUserActions from '@/hooks/useIncrementUserActions'

type Props = {
  mode: 'create' | 'edit'
  taskId?: string
}

export default function FormTask({ mode, taskId }: Props) {
  const router = useRouter()

  const addTask = useTasks((state) => state.addTask)
  const updateTask = useTasks((state) => state.updateTask)

  const task = useTasks((state) =>
    mode === 'edit'
      ? state.tasks.find((item) => item.id === taskId)
      : undefined
  )

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<TaskCategory>('other')
  const [priority, setPriority] = useState<TaskPriority>('low')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')

  const [loading, setLoading] = useState(mode === 'edit')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (mode === 'edit') {
      if (!taskId) {
        router.push('/tasks/new')
        return
      }

      if (!task) {
        router.push('/tasks/new')
        return
      }

      setTitle(task.title || '')
      setCategory(task.category || 'other')
      setPriority(task.priority || 'low')
      setDate(task.date || '')
      setTime(task.time || '')
      setNotes(task.notes || '')
      setLoading(false)
    }
  }, [mode, taskId, task, router])

  const canSave = useMemo(() => {
    return title.trim().length > 0 && !saving
  }, [title, saving])

  const pageTitle =
    mode === 'edit' ? 'Editar tarefa' : 'Nova tarefa'

  const pageSubtitle =
    mode === 'edit'
      ? 'Atualize os dados da tarefa'
      : 'Adicione uma nova tarefa à sua lista'

  const buttonText =
    saving
      ? 'Salvando...'
      : mode === 'edit'
        ? 'Salvar alterações'
        : 'Salvar tarefa'

  function getPayload() {
    return {
      title: title.trim(),
      category: category,
      priority: priority,
      date,
      time,
      notes: notes.trim(),
    }
  }

  async function handleSubmit() {
    if (!canSave) return

    setSaving(true)

    const payload = getPayload()

    try {
      if (mode === 'create') {
        addTask(payload)
      } else if (taskId) {
        updateTask(taskId, payload)
      }

      incrementUserActions()
      router.push('/')
    } finally {
      setSaving(false)
    }
  }

  function handleEnter(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

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

  return (
    <AppShell>
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-(--color-bg-body)">


        <Header
          title={pageTitle}
          subtitle={pageSubtitle}
          page='formNewTask'
        />

    
        <div
          className="
            z-60
            mt-20
            flex-1
            overflow-y-auto
            rounded-t-3xl
            bg-(--color-bg-body)
            pb-48
            scroll-smooth
          "
        >
          <div className="space-y-4 p-5">

   
            <section className="border-b border-(--color-border) pb-3">
              
              <div className='flex justify-between'>
                  <div className="mb-1 ml-2">
                    <span className="text-sm font-bold tracking-wide text-(--color-text-secondary)">
                      Título
                    </span>
                  </div>

                  <div className="text-right mr-2">
                    <span
                      className={`text-sm ${
                        title.length > 60
                          ? 'text-red-500'
                          : 'text-(--color-text-muted)'
                      }`}
                    >
                      {title.length}/70
                    </span>
                  </div>
              </div>
              <input
                type="text"
                autoFocus
                maxLength={70}
                value={title}
                placeholder="Ex: Comprar leite"
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleEnter}
                className="
                  h-8 w-full rounded-3xl
                  bg-(--color-input-bg)
                  px-4
                  text-md
                  shadow-md
                  outline-none
                  transition
                  placeholder:text-(--color-text-muted)
                  focus:ring-2
                  focus:ring-(--color-primary)/20
                "
              />

              
            </section>

            <section className="border-b border-(--color-border) pb-3">
              <div className="mb-1 ml-2">
                <span className="text-sm font-bold tracking-wide text-(--color-text-secondary)">
                  Categoria
                </span>
              </div>
                  <TaskCategorySelect 
                    onSelectCategory={ (value: TaskCategory) => setCategory(value) }
                    editMode={task?.category}
                  />
            </section>
            
            <section className="border-b border-(--color-border) pb-5">
              <div className="mb-1 ml-2">
                <span className="text-sm font-bold tracking-wide text-(--color-text-secondary)">
                  Prioridade
                </span>
              </div>
                  <TaskPrioritySelect 
                    onSelectPriority={ (value: TaskPriority) => setPriority(value) }
                    editMode={task?.priority}
                  />
            </section>

  
            <section className="border-b border-(--color-border) pb-6">
              <div className="mb-1 ml-2">
                <span className="text-sm font-bold tracking-wide text-(--color-text-secondary)">
                  Agendamento
                </span>
              </div>

              <div className="space-y-4">


                <div className="flex items-center gap-3">
                  <div className="flex w-24 items-center gap-2">
                    <Calendar size={20} />
                    <span className="font-medium">
                      Data
                    </span>
                  </div>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="
                      h-8 w-full rounded-3xl
                      bg-(--color-input-bg)
                      px-4
                      shadow-md
                      outline-none
                      transition
                      focus:ring-2
                      focus:ring-(--color-primary)/20
                    "
                  />
                </div>


                <div className="flex items-center gap-3">
                  <div className="flex w-24 items-center gap-2">
                    <Clock size={20} />
                    <span className="font-medium">
                      Hora
                    </span>
                  </div>

                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="
                      h-8 w-full rounded-3xl
                      bg-(--color-input-bg)
                      px-4
                      shadow-md
                      outline-none
                      transition
                      focus:ring-2
                      focus:ring-(--color-primary)/20
                    "
                  />
                </div>
              </div>
            </section>

  
            <section>

              <div className='flex justify-between'>
                  <div className="mb-1 ml-2 flex items-center gap-2">
                      
                      <span className="text-sm font-bold tracking-wide text-(--color-text-secondary)">
                        Observações
                      </span>
                  </div>

                  <div className="text-right mr-2">
                      <span
                        className={`text-sm ${
                          notes.length > 230
                            ? 'text-red-500'
                            : 'text-(--color-text-muted)'
                        }`}
                      >
                        {notes.length}/250
                      </span>
                  </div>

              </div>

              <textarea
                rows={5}
                maxLength={250}
                value={notes}
                placeholder="Adicione detalhes importantes..."
                onChange={(e) => setNotes(e.target.value)}
                className="
                  w-full resize-none rounded-3xl
                  bg-(--color-input-bg)
                  px-4 py-4
                  leading-4
                  shadow-md
                  outline-none
                  transition
                  placeholder:text-(--color-text-muted)
                  focus:ring-2
                  focus:ring-(--color-primary)/20
                "
              />

              
            </section>

          </div>
        </div>

        
        <div className="shell-button">
          <button
            onClick={handleSubmit}
            disabled={!canSave}
            className={`
              h-18 w-full
              rounded-none
              text-lg font-bold text-white
              transition active:scale-[0.98]
              ${
                canSave
                  ? ' bg-linear-to-b from-(--color-primary) to-(--color-hover-btn) shadow-[0_10px_30px_rgba(94,45,180,0.35)]'
                  : 'bg-gray-400'
              }
            `}
          >
            {buttonText}
          </button>
        </div>

      </div>
    </AppShell>
  )
}