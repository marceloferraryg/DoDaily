'use client'

import { ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion'

import { Check, RotateCcw, Trash2 } from 'lucide-react'

type Props = {
  children: ReactNode
  isDone?: boolean
  onComplete: () => void
  onRemove: () => void
}

export function TaskSwipeCard({
  children,
  isDone,
  onComplete,
  onRemove,
}: Props) {
  const x = useMotionValue(0)

  const greenWidth = useTransform(
    x,
    [0, 180],
    ['0%', '100%']
  )

  const greenOpacity = useTransform(
    x,
    [0, 40],
    [0, 1]
  )

  const redOpacity = useTransform(
    x,
    [-96, -20],
    [1, 0]
  )

  function resetCard() {
    animate(x, 0, {
      type: 'spring',
      stiffness: 420,
      damping: 34,
    })
  }

  function lockDelete() {
    animate(x, -96, {
      type: 'spring',
      stiffness: 420,
      damping: 34,
    })
  }

  function handleDragEnd(_: any, info: any) {
    const offset = info.offset.x

    // direita = alterna status
    if (offset > 110) {
      onComplete()
      resetCard()
      return
    }

    // esquerda = mostra excluir
    if (offset < -70) {
      lockDelete()
      return
    }

    resetCard()
  }

  function handleDelete() {
    onRemove()
    resetCard()
  }

  return (
    <div className="relative mb-3 overflow-hidden rounded-2xl">

      {/* Fundo direita */}
      <motion.div
        style={{
          width: greenWidth,
          opacity: greenOpacity,
        }}
        className={`
          absolute inset-y-0 left-0
          flex items-center pl-5
          text-white font-semibold
          z-0
          ${isDone ?  'bg-yellow-500' : 'bg-green-500'}
        `}
      >
        {isDone ? (
          <>
            <RotateCcw size={22} color='white' strokeWidth={3}/>
            <span className="ml-2 font-semibold">
              Desmarcar
            </span>
          </>
        ) : (
          <>
            <Check size={24} color='white' strokeWidth={3}/>
            <span className="ml-2 font-semibold">
              Concluir
            </span>
          </>
        )}
      </motion.div>

      {/* Fundo esquerda */}
      <motion.div
        style={{ opacity: redOpacity }}
        className="
          absolute inset-y-0 right-0
          w-24
          bg-(--color-danger)
          z-0
        "
      >
        <button
          onClick={handleDelete}
          className="
            w-full h-full
            flex flex-col items-center justify-center
            text-white font-semibold
            active:scale-95 transition
          "
        >
          <Trash2 size={22} color='white' strokeWidth={2}/>
        </button>
      </motion.div>

      {/* Card */}
      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{
          left: -140,
          right: 140,
        }}
        dragElastic={0.04}
        whileTap={{ scale: 0.985 }}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="relative z-10 touch-pan-y"
      >
        {children}
      </motion.div>
    </div>
  )
}