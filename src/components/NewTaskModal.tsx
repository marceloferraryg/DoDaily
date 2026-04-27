'use client'

import { useState } from 'react'
import { useTasks } from '@/store/useTasks'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function NewTaskModal({ isOpen, onClose }: Props) {
  const { addTask } = useTasks()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')

  if (!isOpen) return null

  function handleAdd() {
    if (!title.trim()) return

    addTask({
      title,
      date,
      time,
      notes,
    })

    // limpa campos
    setTitle('')
    setDate('')
    setTime('')
    setNotes('')

    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-end justify-center z-50 "
      onClick={onClose}
    >
    
      <div
        className="w-full max-w-md bg-(--color-bg-body) rounded-t-2xl p-5 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <h2 className="text-xl font-bold text-(--color-text-primary)">
            Nova tarefa
          </h2>
          <p className="text-sm text-(--color-text-muted)">
            Adicione uma nova tarefa à sua lista
          </p>
        </div>

       
        <div className="flex flex-col gap-3">

          <input
            type="text"
            placeholder="Título da tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="w-full p-3 rounded-xl bg-(--color-input-bg) text-(--color-text-primary) outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd()
            }}
          />

    
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-xl bg-(--color-input-bg) text-(--color-text-primary) outline-none"
          />

      
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 rounded-xl bg-(--color-input-bg) text-(--color-text-primary) outline-none"
          />

      
          <textarea
            placeholder="Observações (opcional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded-xl bg-(--color-input-bg) text-(--color-text-primary) outline-none resize-none"
            rows={3}
          />
        </div>

      
        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={handleAdd}
            className="w-full bg-(--color-primary) text-white p-3 rounded-xl font-bold 
                        active:scale-[0.98] transition hover:bg-(--color-hover-btn) mb-5"
          >
            Salvar tarefa
          </button>

          
        </div>
      </div>
    </div>
  )
}