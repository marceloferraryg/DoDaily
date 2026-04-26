type PropsTaskCard = {
  title: string
  done?: boolean
  onToggle?: () => void
}

export function TaskCard({ title, done, onToggle }: PropsTaskCard) {
  return (
    
    <div 
      onClick={onToggle}
      className="flex items-center gap-3 p-4 bg-(--color-bg-task) rounded-2xl shadow-sm mb-3 
                    hover:bg-(--color-hover-task) transition-colors cursor-pointer"
    >

      <input
        type="checkbox"
        checked={done}
        onChange={(e) => {
    e.stopPropagation()
    onToggle?.()
  }}
        className="w-5 h-5 cursor-pointer accent-(--color-primary) "
      />

        <p 
        className={`${done 
          ? 'line-through text-(--color-text-muted)' 
          : 'text-(--color-text-primary) font-medium'}`}
      >
        {title}
      </p>

     
    </div>
  )
}