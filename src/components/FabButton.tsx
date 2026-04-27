import { useRouter } from 'next/navigation'


export function FabButton() {

const router = useRouter()



  return (
    <button
      onClick={() => router.push('/tasks/new')}
      className="
        fixed bottom-10 right-10
        w-18 h-18
        rounded-full
        bg-(--color-primary)
        text-white text-5xl
        flex items-center justify-center
        shadow-lg
        active:scale-95 transition
      "
    >
      +
    </button>
  )
}