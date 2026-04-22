import { Header } from '@/components/Header'
import { TaskCard } from '@/components/TaskCard'

export default function Home() {
  return (
    <main className="flex-col min-h-screen bg-gray-100 p-4">
      <Header />

      <div className="mt-4">
        <TaskCard title="Tomar remédio" />
        <TaskCard title="Ir ao mercado" done />
        <TaskCard title="Finalizar projeto" done />
        <TaskCard title="Ler 20 páginas" />
        <TaskCard title="Beber água" done/>
        <TaskCard title="Organizar mesa" />
      </div>
    </main>
  )
}
