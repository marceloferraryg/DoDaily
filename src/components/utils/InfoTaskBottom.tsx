'use client'

import { useEffect, useRef, useState } from 'react'
import { Task } from '@/types/tasks'
import { Edit } from 'lucide-react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  task: Task
}

function formatDateBR(dateString: string | number | Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}


export function InfoTaskBottom({ isOpen, onClose, onEdit, task }: Props) {

  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [translateY, setTranslateY] = useState(0)

  const startY = useRef(0)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      setClosing(false)
      setTranslateY(0)
    }
  }, [isOpen])

  function handleClose() {
    setClosing(true)

    setTimeout(() => {
      setVisible(false)
      setClosing(false)
      setTranslateY(0)
      onClose()
    }, 250)
  }

  function handleTouchStart(e: React.TouchEvent) {
    startY.current = e.touches[0].clientY
  }

  function handleTouchMove(e: React.TouchEvent) {
    const currentY = e.touches[0].clientY
    const diff = currentY - startY.current

    if (diff > 0) {
      setTranslateY(diff)
    }
  }

  function handleTouchEnd() {
    if (translateY > 120) {
      handleClose()
    } else {
      setTranslateY(0)
    }
  }

  if (!visible || !task) return null

  const overlayOpacity = Math.max(0, 0.4 - translateY / 500)

  return (
    <div
      onClick={handleClose}
      className="shell-sheet"
      style={{
        backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
        transition: closing ? 'opacity 0.25s ease' : 'none',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`shell-sheet-content p-5
          ${closing ? 'animate-sheet-down' : 'animate-sheet-up'}
        `}
        style={{
          transform: `translateY(${translateY}px)`,
          transition:
            translateY === 0
              ? 'transform 0.25s ease'
              : 'none',
        }}
      >

        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />

         <div className="flex justify-center items-center mb-3">
            <div > 
                <span
                  className={`px-5 py-1 rounded-3xl text-sm font-semibold tracking-wide
                    ${task.done
                      ? 'bg-(--color-task-done) text-(--color-success)'
                      : 'bg-(--color-task-pending) text-(--color-warning)'}
                  `}
                >
                  {task.done ? 'Concluída' : 'Pendente'}
                </span>
           </div>
           
           <div className="flex items-center text-(--color-text-primary) absolute right-0">
                <button
                  onClick={onEdit}
                  className='w-15 h-15 cursor-pointer'
                >
                  <Edit size={32} className="text-(--color-text-primary)" />
                </button>
          </div>
        </div>

  
        <h2 className="text-xl font-bold truncate whitespace-pre-wrap break-word leading-7 text-center
                        text-(--color-text-primary)">
          {task.title}
        </h2>

        <div className="mt-2 text-sm text-(--color-text-secondary)">

            {task.date && task.time && (
              <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                <span className="text-right pr-3">
                  {formatDateBR(task.date)}
                </span>

                <span className="opacity-40">•</span>

                <span className="text-left pl-3">
                  {task.time}
                </span>
              </div>
            )}

            {task.date && !task.time && (
              <div className="text-center">
                {formatDateBR(task.date)}
              </div>
            )}

            {!task.date && task.time && (
              <div className="text-center">  
                {task.time}
              </div>
            )}

        </div>

        <div className="mt-5 max-h-[50vh] overflow-y-auto text-justify">
          <p
            className="
              text-(--color-text-secondary)
              whitespace-pre-wrap
              break-word
              leading-7
            "
          >
            {task.notes || 'Sem observações'}
          </p>
        </div>


        <button
          onClick={handleClose}
          className="
            mt-6 w-full h-12 rounded-2xl
            bg-(--color-primary)
            text-white font-semibold
            active:scale-[0.98]
            transition
          "
        >
          Fechar
        </button>
      </div>
    </div>
  )
}