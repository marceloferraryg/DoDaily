'use client'


import { Task } from '@/types/tasks'
import { Check } from 'lucide-react'

type PropsTaskCard = {
  task: Task
  onShowNotes?: () => void
  onRemove?: () => void
}

export function TaskCard({
  task,
  onShowNotes,
}: PropsTaskCard) {


  const colorIndicator = task.done
    ? 'bg-green-500'
    : 'bg-yellow-500'

  return (
    
    <div
     
      className="
        flex rounded-3xl overflow-hidden shadow-md
        cursor-pointer active:scale-[0.97] transition-transform
        hover:scale-[1.03] 
      "
    >
      <div className='flex '>
          <div className={`w-3 self-stretch shrink-0 ${colorIndicator}`} />

          <div className="flex items-center w-full pl-3 pr-5 bg-(--color-bg-task)">
            
              <div className={`flex w-6 h-6 justify-center items-center rounded-full 
                                border border-(--color-border)
                                ${task.done ? 'bg-green-500 border-green-500' : ''}
                            `} >
              
                {task.done ?
                  <Check size={18} color='white' strokeWidth={3}/>
                : ''
                }

              </div>

            
          </div>
      </div>
        
      <div 
      onClick={(e) => {
              e.stopPropagation()
              onShowNotes?.()
            }}
      className='flex items-center gap-3 w-full py-2
                        bg-(--color-bg-task)'>
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
            <div className='flex h-full w-14 bg-(--color-bg-task)  items-center
                              transition-colors' >
            <span className="text-sm  mr-8 ">
              {task.time}
            </span>
            </div>
          ) : <div className='flex h-full w-14 bg-(--color-bg-task) 
                              transition-colors' />}
      </div>

    </div>
  
)
}