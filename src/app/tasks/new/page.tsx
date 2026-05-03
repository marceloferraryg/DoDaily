'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock } from 'lucide-react'

import { AppShell } from '@/components/AppShell'
import Header from '@/components/Header'
import { useTasks } from '@/store/useTasks'

export default function NewTask() {
  const router = useRouter()
  const addTask = useTasks((state) => state.addTask)

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')

  const canSave = title.trim().length > 0

  function handleAdd() {
    if (!canSave) return

    addTask({
      title: title.trim(),
      date,
      time,
      notes: notes.trim(),
    })

    router.push('/')
  }

  return (
    <AppShell>
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-(--color-bg-body)">
        
       
        <Header
          title="Nova tarefa"
          subtitle="Adicione uma nova tarefa à sua lista"
        />

       
        <div
          className="
            z-50
            -mt-5
            flex-1
            overflow-y-auto
            rounded-t-3xl
            bg-(--color-bg-body)
            pb-32
            scroll-smooth
          "
        >
          <div className="space-y-5 p-5">
            
           
            <section className="border-b border-(--color-border) pb-3">
              <div className="mb-2 ml-2">
                <span className="text-md font-bold text-(--color-text-secondary)">
                  Título
                </span>
              </div>

              <input
                type="text"
                autoFocus
                maxLength={70}
                value={title}
                placeholder="Ex: Comprar leite"
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAdd()
                }}
                className="
                  w-full rounded-3xl
                  bg-(--color-input-bg)
                  px-3 py-3
                  text-(--color-text-primary)
                  placeholder:text-(--color-text-muted)
                  shadow-md
                  outline-none
                  transition
                  focus:ring-2
                  focus:ring-(--color-primary)/20
                "
              />

              <div className="mt-2 mr-2 text-right">
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
            </section>

           
            <section className="border-b border-(--color-border) pb-5">
              <div className="mb-2 ml-2">
                <span className="text-md font-bold text-(--color-text-secondary)">
                  Agendamento
                </span>
              </div>

              <div className="space-y-4">
               
                <div className="flex items-center gap-4">
                  <div className="flex w-24 items-center gap-2 text-(--color-text-primary)">
                    <Calendar size={22} />
                    <span className="font-medium text-md">Data</span>
                  </div>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="
                      h-12 w-full rounded-3xl
                      bg-(--color-input-bg)
                      px-3
                      shadow-md
                      outline-none
                      transition
                      focus:ring-2
                      focus:ring-(--color-primary)/20
                    "
                  />
                </div>

               
                <div className="flex items-center gap-4">
                  <div className="flex w-24 items-center gap-2 text-(--color-text-primary)">
                    <Clock size={22} />
                    <span className="font-medium text-md">Hora</span>
                  </div>

                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="
                      h-12 w-full rounded-3xl
                      bg-(--color-input-bg)
                      px-3
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
              <div className="mb-3 ml-2">
                <span className="text-md font-bold text-(--color-text-secondary)">
                  Observações
                </span>
              </div>

              <textarea
                rows={4}
                maxLength={250}
                value={notes}
                placeholder="Adicione detalhes importantes..."
                onChange={(e) => setNotes(e.target.value)}
                className="
                  w-full resize-none rounded-3xl
                  bg-(--color-input-bg)
                  px-3 py-3
                  leading-6
                  shadow-md
                  outline-none
                  transition
                  placeholder:text-(--color-text-muted)
                  focus:ring-2
                  focus:ring-(--color-primary)/20
                "
              />

              <div className="mt-2 mr-2 text-right">
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
            </section>
          </div>
        </div>

       
        <div className="shell-bottom">
          <button
            onClick={handleAdd}
            disabled={!canSave}
            className={`
              h-14 w-full 
              text-lg font-bold text-white
              transition active:scale-[0.98]
              ${
                canSave
                  ? 'bg-(--color-primary) shadow-[0_10px_30px_rgba(94,45,180,0.35)]'
                  : 'bg-gray-400'
              }
            `}
          >
            Salvar tarefa
          </button>
        </div>
      </div>
    </AppShell>
  )
}