'use client'

import {
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion'

import { ReactNode } from 'react'
import { Check, Trash } from 'lucide-react'

type Props = {
  children: ReactNode
  onComplete: () => void
  onRemove: () => void
}

export function TaskSwipeCard({
  children,
  onComplete,
  onRemove,
}: Props) {

  const x = useMotionValue(0)

  const greenWidth = useTransform(x, [0, 180], ['0%', '100%'])
  const redWidth = useTransform(x, [-180, 0], ['100%', '0%'])

  const greenOpacity = useTransform(x, [0, 40], [0, 1])
  const redOpacity = useTransform(x, [-40, 0], [1, 0])

  function handleDragEnd(_: any, info: any) {
    const offset = info.offset.x

    if (offset > 110) {
      onComplete()
    }

    if (offset < -110) {
      onRemove()
    }
  }

  return (
    <div className="relative mb-3 overflow-hidden rounded-2xl">

      <motion.div
        style={{
          width: greenWidth,
          opacity: greenOpacity,
        }}
        className="
          absolute left-0 top-0 bottom-0
          bg-green-500
          flex items-center pl-5
          text-white font-semibold
          z-0
        "
      >
        <Check size={24} />
        <span className="ml-2">Concluir</span>
      </motion.div>

      <motion.div
        style={{
          width: redWidth,
          opacity: redOpacity,
        }}
        className="
          absolute right-0 top-0 bottom-0
          bg-(--color-danger)
          flex items-center justify-end pr-5
          text-white font-semibold
          z-0
        "
      >
        <span className="mr-2">Deletar</span>
        <Trash size={24} />
      </motion.div>


      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        whileTap={{ scale: 0.98 }}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  )
}