import { useRouter } from 'next/navigation'

import { ArrowLeft } from "lucide-react"

type propsHeader = {
    title: string
    subtitle: string
}

export default function Header({title, subtitle} : propsHeader) {

 const router = useRouter()

   return (
  <header className="shell-top">
    <div className="flex h-26 w-full">
      <button
        className="w-24 bg-(--color-primary) flex items-center justify-center pb-5"
        onClick={() => router.push('/')}
      >
        <ArrowLeft size={28} color="white" />
      </button>

      <div className="flex flex-1 flex-col justify-center bg-(--color-primary) pb-6">
        <h2 className="text-xl font-bold text-(--color-text-primary-white)">
          {title}
        </h2>

        <p className="text-sm text-(--color-text-secondary-white)">
          {subtitle}
        </p>
      </div>
    </div>
  </header>
)
} 