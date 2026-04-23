export function Header() {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  return (
    <div className="mb-6">
      <p className="text-(--color-text) capitalize font-bold">{today}</p>
      <h1 className="text-2xl font-bold text-(--color-primary)">Hoje</h1>
    </div>
  )
}