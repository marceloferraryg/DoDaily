'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  content?: string
}

export function NoteTaskModal({
  isOpen,
  onClose,
  title,
  content,
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

  if (!visible) return null

  const overlayOpacity = Math.max(0, 0.4 - translateY / 500)

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-end justify-center backdrop-blur-sm p-2"
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
        className={`
          w-full bg-white rounded-t-3xl shadow-2xl
          px-5 pt-3
          pb-[calc(1.5rem+env(safe-area-inset-bottom))]
          max-h-[85vh]
          overflow-hidden
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

  
        <h2 className="text-xl font-bold text-center truncate whitespace-pre-wrap wrap-break-word leading-7">
          {title}
        </h2>


        <div className="mt-5 max-h-[50vh] overflow-y-auto">
          <p
            className="
              text-(--color-text-secondary)
              whitespace-pre-wrap
              wrap-break-word
              leading-7
            "
          >
            {content || 'Sem observações'}
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