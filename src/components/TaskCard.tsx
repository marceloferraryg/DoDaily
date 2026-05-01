'use client'

import { useState } from 'react'
import { Trash, Info } from 'lucide-react'

import { NoteTaskModal } from './NoteTaskModal'

type Props = {
  isOpen: boolean
  onClose: () => void
  task: Task
} 

export type Task = {
  id: string
  title: string
  done: boolean
  date?: string
  time?: string
  notes?: string
}

type PropsTaskCard = {
  task: Task
  onToggle?: () => void
  onRemove?: () => void
  onShowNotes?: () => void
}

export function TaskCard({ task, onToggle, onRemove, onShowNotes }: PropsTaskCard) {

  const colorIndicator = task.done
    ? 'bg-green-500'
    : 'bg-amber-300'

    const [isNoteModalOpen, setIsNoteModalOpen] = useState<boolean>(false)

  return (

    <>
    <div
      onClick={onToggle}
      className="flex mb-3 rounded-2xl overflow-hidden shadow-sm cursor-pointer 
                  active:scale-[0.97] transition-transform"
    >
   
      <div className={`w-3 self-stretch shrink-0 ${colorIndicator}`} />

  
      <div
        className="flex items-center gap-3 w-full px-4 py-2
                    bg-(--color-bg-task)
                    hover:bg-(--color-hover-task) 
                    transition-colors"
      >
    
        <input
          type="checkbox"
          checked={task.done}
          onClick={(e) => {
            e.stopPropagation()
            onToggle?.()
          }}
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

  
        <div className="flex items-center gap-3 text-(--color-text-muted)">
          {task.notes && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsNoteModalOpen(true)
              }}
              className="hover:text-(--color-primary) transition-colors cursor-pointer hover:scale-130"
            >
              <Info size={24} />
            </button>
          )}

          {task.time && (
            <span className="text-sm mr-4">
              {task.time}
            </span>
          )}

          

          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            className="hover:text-red-500 transition-colors cursor-pointer hover:scale-130"
          >
            <Trash size={24} />
          </button>
        </div>
      </div>
      
    </div>
    
    <NoteTaskModal 
        isOpen={isNoteModalOpen} 
        onClose={() => setIsNoteModalOpen(false)} 
        title={task.title}
        content={task.notes}
    />
 </>   
  )
}