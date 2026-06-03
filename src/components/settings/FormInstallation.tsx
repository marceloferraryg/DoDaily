'use client'

import {
  CheckCircle2,
  Info,
  Share,
  Smartphone,
} from 'lucide-react'

import useInstallPrompt from '@/hooks/useInstallPrompt'


type Props = {
  back: () => void
}

export default function FormInstallation({
  back,
}: Props) {

  //------------------------------------------
  // STATES
  //------------------------------------------

  const { isInstalled, canInstall, install } = useInstallPrompt()

 
  //------------------------------------------
  // INSTALLED SCREEN
  //------------------------------------------

  if (isInstalled) {

    return (

      <div
        className="
          flex flex-col

          items-center
          justify-center

          gap-5

          py-12
          px-6
        "
      >

        <div
          className="
            flex h-24 w-24

            items-center
            justify-center

            rounded-full

            bg-(--color-success)/15
          "
        >

          <CheckCircle2
            size={48}
            className="
              text-(--color-success)
            "
          />

        </div>

        <h1
          className="
            text-xl
            font-bold

            text-(--color-text-primary)
          "
        >
          Aplicativo instalado
        </h1>

        <p
          className="
            max-w-sm

            text-center
            text-sm

            text-(--color-text-secondary)
          "
        >
          O DoDaily já está instalado
          neste dispositivo e pronto
          para uso.
        </p>

      </div>

    )

  }

  //------------------------------------------
  // RENDER
  //------------------------------------------

  return (

    <div
      className="
        flex flex-col

        gap-6

        pb-16
      "
    >

      {/* HEADER */}

      <div>

        <p
          className="
            text-sm

            text-(--color-text-secondary)
          "
        >
          Instale o DoDaily na tela
          inicial do seu celular para
          uma experiência completa.
        </p>

      </div>

      {/* BENEFITS */}

      <div
        className="
          rounded-3xl

          bg-(--color-bg-summary-card)

          p-5
        "
      >

        <div
          className="
            flex flex-col

            gap-4
          "
        >

          <div
            className="
              flex items-center
              gap-3
            "
          >

            <CheckCircle2
              size={18}
              className="
                text-(--color-primary)
              "
            />

            <span
              className="
                text-sm

                text-(--color-text-primary)
              "
            >
              Acesso rápido pela tela inicial
            </span>

          </div>

          <div
            className="
              flex items-center
              gap-3
            "
          >

            <CheckCircle2
              size={18}
              className="
                text-(--color-primary)
              "
            />

            <span
              className="
                text-sm

                text-(--color-text-primary)
              "
            >
              Abre como aplicativo
            </span>

          </div>

          <div
            className="
              flex items-center
              gap-3
            "
          >

            <CheckCircle2
              size={18}
              className="
                text-(--color-primary)
              "
            />

            <span
              className="
                text-sm

                text-(--color-text-primary)
              "
            >
              Ícone próprio na tela inicial
            </span>

          </div>

        </div>

      </div>

      {/* IPHONE */}

      <div
        className="
          rounded-3xl

          bg-(--color-bg-card)

          p-5
        "
      >

        <div
          className="
            mb-4

            flex items-center
            gap-3
          "
        >

          <Smartphone
            className="
              text-(--color-primary)
            "
          />

          <h2
            className="
              font-semibold

              text-(--color-text-primary)
            "
          >
            iPhone (Safari)
          </h2>

        </div>

        <div
          className="
            flex flex-col

            gap-4
          "
        >

          <span>
            1. Toque em <strong>Compartilhar</strong> <Share size={16} className="inline" />
          </span>

          <span>
            2. Escolha <strong>Adicionar à Tela de Início</strong>
          </span>

          <span>
            3. Toque em <strong>Adicionar</strong>
          </span>

        </div>

      </div>

      {/* ANDROID */}

      <div
        className="
          rounded-3xl

          bg-(--color-bg-card)

          p-5
        "
      >

        <div
          className="
            mb-4

            flex items-center
            gap-3
          "
        >

          <Smartphone
            className="
              text-(--color-primary)
            "
          />

          <h2
            className="
              font-semibold

              text-(--color-text-primary)
            "
          >
            Android (Chrome)
          </h2>

        </div>

        {canInstall ? (

          <button
            onClick={install}
            className="
              flex h-12
              w-full

              items-center
              justify-center

              rounded-3xl

              bg-(--color-primary)

              font-semibold
              text-white

              active:scale-95
            "
          >
            Instalar aplicativo
          </button>

        ) : (

          <div
            className="
              flex flex-col

              gap-4
            "
          >

            <span>
              1. Abra o menu ⋮ do navegador
            </span>

            <span>
              2. Toque em <strong>Instalar aplicativo</strong>
            </span>

            <span>
              3. Confirme a instalação
            </span>

          </div>

        )}

      </div>

      {/* INFO */}

      <div
        className="
          flex items-start
          gap-3

          rounded-3xl

          border

          border-(--color-border)

          p-4
        "
      >

        <Info
          size={18}
          className="
            mt-0.5

            text-(--color-primary)
          "
        />

        <p
          className="
            text-sm

            text-(--color-text-secondary)
          "
        >
          Não encontrou a opção de
          instalação? Certifique-se
          de estar utilizando Safari
          no iPhone ou Chrome no Android.
        </p>

      </div>

    </div>

  )
}