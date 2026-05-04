'use client'

import { Trash } from 'lucide-react'
import { Task } from '@/types/tasks'

type PropsTaskCard = {
  task: Task
  onRemove?: () => void
  onShowNotes?: () => void
}

export function TaskCard({
  task,
  onRemove,
  onShowNotes,
}: PropsTaskCard) {


  const colorIndicator = task.done
    ? 'bg-green-500'
    : 'bg-amber-300'

  return (
    <div
     onClick={(e) => {
              e.stopPropagation()
              onShowNotes?.()
            }}
      className="
        flex rounded-3xl overflow-hidden shadow-md
        cursor-pointer active:scale-[0.97] transition-transform
      "
    >
      <div className={`w-3 self-stretch shrink-0 ${colorIndicator}`} />

      <div
        className="
          flex items-center gap-3 w-full px-4 py-2
          bg-(--color-bg-task)
          hover:bg-(--color-hover-task)
          transition-colors
        "
      >
        <input
          type="checkbox"
          checked={task.done}
          readOnly
          className="w-5 h-5 accent-(--color-primary)"
        />

        <p
          className={`flex-1 truncate min-w-0 ${
            task.done
              ? 'line-through text-(--color-text-muted)'
              : 'text-(--color-text-primary) font-medium'
          }`}
        >
          {task.title}
        </p>
      </div>

      <div className="flex items-center gap-3 text-(--color-text-muted) ">
          {task.time ? (
            <div className='flex h-full w-22 bg-(--color-bg-task)  items-center
                              transition-colors' >
            <span className="text-sm ml-5 mr-8 ">
              {task.time}
            </span>
            </div>
          ) : <div className='flex h-full w-22 bg-(--color-bg-task) 
                              transition-colors' />}
      </div>
    </div>
  )
}