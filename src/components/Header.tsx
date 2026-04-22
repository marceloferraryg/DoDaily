export function Header() {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  return (
    <div className="mb-6">
      <p className="text-gray-600 capitalize font-bold">{today}</p>
      <h1 className="text-2xl font-bold text-blue-400">Hoje</h1>
    </div>
  )
}