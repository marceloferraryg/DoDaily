

export function Header() {

  const today = new Date().toLocaleDateString('pt-BR', {
  weekday: 'short',
  day: 'numeric',
  month: 'long'
})


  const Username = 'Marcelo'

  return (
    <header className="bg-(--color-bg-primary) px-5 pt-4 pb-10">
      
      
      <div className="flex items-center mb-5">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-sm text-gray-600">foto</span>
        </div>

        <div className="ml-3">
          <h1 className="font-bold text-xl text-white">
            Olá, {Username}
          </h1>
        </div>
      </div>

      
      <h2 className="text-4xl font-bold text-white">
        Hoje
      </h2>

      
      <p className="text-white/80">
        {today}
      </p>
    </header>
  )
}