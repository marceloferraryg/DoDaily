type Props = {
  title: string
  done?: boolean
}

export function TaskCard({ title, done }: Props) {
  return (
    <div className="flex items-center gap-3 p-4 bg-(--color-bg) rounded-2xl shadow-sm mb-3">
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
          done ? 'bg-green-600 border-green-600' : 'border-gray-300'
        }`}
      />

      <p className={`${done ? 'line-through text-gray-400' : 'text-gray-700 font-bold'}`}>
        {title}
      </p>
    </div>
  )
}