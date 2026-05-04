'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { Task } from '@/types/tasks'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  task?: Task

  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'primary'
}

function formatDateBR(dateString: string) {
  const date = new Date(dateString)

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function ConfirmBottom({
  isOpen,
  onClose,
  onConfirm,
  task,
  title,
  message,
  confirmText,
  cancelText,
  variant,
}: Props) {
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

  function finishClose() {
    setVisible(false)
    setClosing(false)
    setTranslateY(0)
    onClose()
  }

  function closeWithAnimation(callback?: () => void) {
    setClosing(true)

    setTimeout(() => {
      callback?.()
      finishClose()
    }, 260)
  }

  function handleClose() {
    closeWithAnimation()
  }

  function handleConfirm() {
    if ('vibrate' in navigator) {
      navigator.vibrate(25)
    }

    closeWithAnimation(onConfirm)
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
    if (translateY > 110) {
      handleClose()
    } else {
      setTranslateY(0)
    }
  }

  if (!visible) return null

  const overlayOpacity = Math.max(0, 0.42 - translateY / 450)

  const confirmClass =
    variant === 'danger'
      ? 'bg-(--color-danger)'
      : 'bg-(--color-primary)'

  return (
    <div
      onClick={handleClose}
      className="shell-sheet"
      style={{
        backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: closing ? 'all .26s ease' : 'none',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`
          shell-sheet-content
          px-5 pt-3
          pb-[calc(1.4rem+env(safe-area-inset-bottom))]
          shadow-2xl
          select-none
          ${closing ? 'animate-sheet-down' : 'animate-sheet-up'}
        `}
        style={{
          transform: `translateY(${translateY}px)`,
          transition:
            translateY === 0
              ? 'transform .28s cubic-bezier(.22,1,.36,1)'
              : 'none',
        }}
      >
  
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />


        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center shadow-sm">
            <AlertTriangle
              size={30}
              className="text-(--color-danger)"
            />
          </div>
        </div>


        <h2 className="text-xl font-bold text-center text-(--color-text-primary)">
          {title}
        </h2>

    
        <p className="mt-2 text-center text-sm leading-6 text-(--color-text-secondary)">
          {message}
        </p>


        {task && (
          <div
            className="
              mt-5 rounded-3xl
              border border-(--color-border)
              bg-(--color-bg-body)
              px-4 py-4
              shadow-sm
            "
          >
            <p className="text-center font-semibold text-(--color-text-primary) break-words">
              {task.title}
            </p>

            {(task.date || task.time) && (
              <div className="mt-3 text-sm text-(--color-text-muted)">
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
            )}
          </div>
        )}

  
        <div className="mt-6 grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={handleClose}
            disabled={closing}
            className="
              h-12 rounded-3xl
              border border-(--color-border)
              bg-(--color-bg-body)
              text-(--color-text-primary)
              font-semibold
              active:scale-[0.98]
              transition
            "
          >
            {cancelText}
          </button>

          <button
            onClick={handleConfirm}
            disabled={closing}
            className={`
              h-12 rounded-3xl
              text-white font-semibold
              active:scale-[0.98]
              transition
              hover:brightness-110 
              ${confirmClass}
            `}
          >
            <span className="flex items-center justify-center gap-2">
              <Trash2 size={18} />
              {confirmText}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}