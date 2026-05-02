import { useRouter } from 'next/navigation'

import { Plus } from 'lucide-react'

export function FabButton() {

const router = useRouter()



  return (
    <button
      onClick={() => router.push('/tasks/new')}
      className="
        fixed bottom-20 right-10 z-50
        w-18 h-18
        rounded-full
        bg-(--color-primary)
        flex items-center justify-center
        shadow-lg
        active:scale-95 transition
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <Plus size={32} color="#fff" strokeWidth={3}/>
    </button>
  )
}