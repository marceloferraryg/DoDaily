
import { useRouter } from "next/navigation"

import { Info } from "lucide-react"

import useInstallPrompt from "@/hooks/useInstallPrompt"


export default function InstallBanner() {

    const router = useRouter()

  const { isInstalled, canInstall, install } = useInstallPrompt()
    if (isInstalled) return null    
    if (!canInstall) return null

  return (
    <div
      className="
        flex items-center justify-between
        gap-4

        w-full
        px-5 py-3

        rounded-3xl
        bg-(--color-primary)/10
        mt-3 mb-10 
      "
    >   
        <div
            className="
                flex items-center gap-3
            "
        >
            <Info size={20} className="text-(--color-primary)" />   
            <span
                className="
                    text-sm
                    text-(--color-primary)
                "
            >
                Instale o DoDaily para acessar mais recursos e ter uma melhor experiência!
            </span>
        </div>

        <div className="flex-col flex items-center gap-3 md:flex">
            <button
                className="
                    px-4 py-2
                    rounded-lg  
                    bg-(--color-primary)
                    text-white
                    text-sm 
                    font-medium
                    active:scale-[0.98]
                    transition-all
                    cursor-pointer
                "
                onClick={() => router.push('/settings')}
            >
                Instalar
            </button>
            <button
                className="
                    text-sm
                    text-(--color-text-primary)
                    underline
                    cursor-pointer
                "
                onClick={install}
            >
                Cancelar
            </button>
        </div>
    </div>
  )
}