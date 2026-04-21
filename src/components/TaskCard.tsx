type Props = {
  title: string
  done?: boolean
}

export function TaskCard({ title, done }: Props) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm mb-3">
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
          done ? 'bg-green-500 border-green-500' : 'border-gray-300'
        }`}
      />

      <p className={`${done ? 'line-through text-gray-400' : ''}`}>
        {title}
      </p>
    </div>
  )
}