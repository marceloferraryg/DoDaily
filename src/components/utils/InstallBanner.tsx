'use client'

import { useState, useEffect } from "react"
import { Info, X } from "lucide-react"
import useInstallPrompt from "@/hooks/useInstallPrompt"

export default function InstallBanner() {
  const { isInstalled, canInstall, install } = useInstallPrompt()
  const [shouldShow, setShouldShow] = useState(false)
  const [isApple, setIsApple] = useState(false)

  useEffect(() => {
    // 1. Detecta se é iOS/macOS (Safari não dispara o beforeinstallprompt)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    setIsApple(isIOS)



    if (isInstalled) return

        const bannerDismissed = localStorage.getItem("dodaily_dismiss_install_banner")
        const acoesAtuais = localStorage.getItem("dodaily_user_actions")
        const totalAcoes = acoesAtuais ? parseInt(acoesAtuais, 10) : 0

        
        if (bannerDismissed === "true" && totalAcoes < 5) {
            return 
        }

    const timer = setTimeout(() => {
      if (canInstall || isIOS) {
        setShouldShow(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isInstalled, canInstall])



  const handleDismiss = () => {
  localStorage.setItem("dodaily_dismiss_install_banner", "true")
  localStorage.setItem("dodaily_user_actions", "0")
  setShouldShow(false)
}

  // Se o hook disser que já está instalado, ou a lógica de delay não liberou, some.
  if (isInstalled || !shouldShow) return null

  return (
    <div
      className="
        flex items-center justify-between gap-4
        w-full px-5 py-4
        bg-(--color-primary)/10 text-(--color-primary)
        mt-3 mb-10 relative animate-fade-in
      "
    >   
      <div className="flex items-center gap-3 pr-6">
        <Info size={20} className="shrink-0" />   
        <span className="text-sm font-medium leading-tight">
          {isApple 
            ? "Adicione o DoDaily à tela inicial para usá-lo como aplicativo!" 
            : "Instale o DoDaily para acessar mais recursos e ter uma melhor experiência!"
          }
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="
            px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap
            bg-(--color-primary) text-white
            active:scale-[0.96] transition-all cursor-pointer
          "
          onClick={isApple ? () => window.location.href = '/profile' : install}
        >
          {isApple ? "Ver como" : "Instalar"}
        </button>

        {/* Botão X para fechar o banner amigavelmente */}
        <button 
          onClick={handleDismiss}
          className="p-1 rounded-full hover:bg-(--color-primary)/20 cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}