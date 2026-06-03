'use client'

import {
  useEffect,
  useState,
} from 'react'

type BeforeInstallPromptEvent =
  Event & {
    prompt: () => Promise<void>
    userChoice: Promise<{
      outcome: 'accepted' | 'dismissed'
    }>
  }

export default function useInstallPrompt() {

  //------------------------------------------
  // STATE
  //------------------------------------------

  const [isInstalled, setIsInstalled] = useState(false)

  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  //------------------------------------------
  // CHECK INSTALLATION
  //------------------------------------------

  useEffect(() => {

    const installed =

      window.matchMedia(
        '(display-mode: standalone)'
      ).matches ||

      (
        'standalone' in navigator &&
        (
          navigator as Navigator & {
            standalone?: boolean
          }
        ).standalone === true
      )

    setIsInstalled(installed)

  }, [])

  //------------------------------------------
  // CAPTURE INSTALL EVENT
  //------------------------------------------

  useEffect(() => {

    const handler = (
      e: Event
    ) => {

      e.preventDefault()

      setInstallPrompt(
        e as BeforeInstallPromptEvent
      )

    }

    window.addEventListener(
      'beforeinstallprompt',
      handler
    )

    return () => {

      window.removeEventListener(
        'beforeinstallprompt',
        handler
      )

    }

  }, [])

  //------------------------------------------
  // INSTALL
  //------------------------------------------

  async function install() {

    if (!installPrompt) {
      return false
    }

    await installPrompt.prompt()

    const result =
      await installPrompt.userChoice

    if (
      result.outcome ===
      'accepted'
    ) {

      setInstallPrompt(null)

      setIsInstalled(true)

      return true

    }

    return false

  }

  //------------------------------------------
  // RETURN
  //------------------------------------------

  return {

    isInstalled,

    canInstall:
      installPrompt !== null,

    install,

  }

}