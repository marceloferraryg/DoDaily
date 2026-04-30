'use client'

import { Task } from './TaskCard'

type Props = {
  isOpen: boolean
  onClose: () => void
  task: Task
}

export function NoteTaskModal({ isOpen, onClose, task }: Props) {


  if (!isOpen) return null

  
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-end justify-center z-50 "
      onClick={onClose}
    >
    
      <div className='w-full min-h-80 bg-white rounded-t-3xl p-5 animate-slide-up'>

         <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            
            <div className='flex items-center justify-center'>
              <h1 className='text-xl font-bold text-(--color-text-primary) truncate min-w-0'>
                {task.title}
              </h1>
            </div>

            <div className='flex mt-5 text-justify p-3'>
                <p>
                    {task.notes}
                </p>
            </div>

            <div className='flex items-center justify-center mt-5'>
                <button
                  className='bg-(--color-primary) hover:bg-(--color-hover-btn) text-white 
                              font-bold py-2 px-6 rounded-3xl'
                  onClick={onClose}
                >
                  Fechar
                </button>
            </div>
      
      </div>
     
     
    </div>
  )
}