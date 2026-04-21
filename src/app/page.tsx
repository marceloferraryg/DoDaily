import { Header } from '@/components/Header'
import { TaskCard } from '@/components/TaskCard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <Header />

      <div className="mt-4">
        <TaskCard title="Tomar remédio" />
        <TaskCard title="Ir ao mercado" done />
        <TaskCard title="Finalizar projeto" done />
        <TaskCard title="Ler 20 páginas" />
        <TaskCard title="Beber água" />
        <TaskCard title="Organizar mesa" />
      </div>
    </main>
  )
}
