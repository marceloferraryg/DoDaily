
import { Trash } from "lucide-react"

type PropsTaskCard = {
 task: {
  id: string
  title: string
  done: boolean
  date?: string
  time?: string
  notes?: string
 }
  onToggle?: () => void
  onRemove?: () => void 
}



export function TaskCard({ task, onToggle, onRemove }: PropsTaskCard) {  



  return (


  <div 
    onClick={onToggle}
    className="flex shadow-sm mb-3 hover:bg-(--color-hover-task) transition-colors cursor-pointer 
                rounded-r-2xl"
  >
      
      <div
        className="bg-amber-300 w-4 h-14 rounded-l-2xl" 
      >
      </div>

      <div
        className="flex w-full h-fullitems-center gap-3 bg-(--color-bg-task) rounded-r-2xl px-4
                   shadow-sm mb-3 hover:bg-(--color-hover-task) transition-colors cursor-pointer"
      >

      

        <input
          type="checkbox"
          checked={task.done}
          onChange={(e) => {
            e.stopPropagation()
            onToggle?.()
          }}
          className="w-5 h-5 accent-(--color-primary)"
        />

        <p
          className={`${
            task.done
              ? 'line-through text-(--color-text-muted)'
              : 'text-(--color-text-primary) font-bold'
          }`}
        >
          {task.title}
        </p>

        <p className="ml-auto text-(--color-text-muted)">
          {task.time}
        </p>

        <Trash
          size={20}
          className="ml-auto text-(--color-text-muted) hover:text-red-500 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
        />
      </div>

  </div>
  )
}