'use client'

import { useRouter } from 'next/navigation'

import { AppShell } from '@/components/AppShell'
import Header from '@/components/headers/Header'
import { MenuTabBar } from '@/components/utils/MenuTabBar'

import { useNotes } from '@/store/useNotes'

export default function NotesPage() {

  const router = useRouter()

  //------------------------------------------
  // STORE
  //------------------------------------------

  const notes = useNotes(
    (state) => state.notes
  )

  const createNote = useNotes(
    (state) => state.createNote
  )

  //------------------------------------------
  // CREATE NOTE
  //------------------------------------------

  function handleCreateNote() {

  const id = createNote()

  requestAnimationFrame(() => {

    router.push(`/notes/${id}`)

  })
}

  //------------------------------------------
  // RENDER
  //------------------------------------------

  return (
    <AppShell>

      <div
        className="
          relative flex h-screen w-full
          flex-col overflow-hidden
          bg-(--color-bg-body)
        "
      >

        <Header
          title="Minhas notas"
          subtitle=""
          page="notesPage" 
        />

        {/* EMPTY STATE */}

        {notes.length === 0 ? (

          <div
            className="
              z-60 mt-20

              flex h-full w-full
              flex-col
              items-center justify-center

              gap-3

              bg-(--color-bg-body)

              p-12

              text-center
            "
          >

            <span
              className="
                block text-md
                font-semibold
              "
            >
              Nenhuma nota por aqui!
            </span>

            <span
              className="
                block text-sm
                text-(--color-text-secondary)
              "
            >
              Crie notas para salvar ideias,
              lembretes e pensamentos rápidos.
            </span>

            <button
              onClick={handleCreateNote}
              className="
                mt-5

                cursor-pointer

                rounded-3xl

                bg-(--color-primary)

                px-4 py-3

                text-sm
                font-medium
                text-white

                transition-all
                active:scale-[0.97]
              "
            >
              Criar minha primeira nota
            </button>

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-[repeat(auto-fit,minmax(160px,160px))]

              content-start
              justify-center

              gap-5

              overflow-y-auto

              rounded-t-3xl

              bg-(--color-bg-body)

              p-5
              pb-32

              scroll-smooth

              z-60 mt-20
            "
          >

            {/* NOTES */}

            {notes.map((note) => {

              const firstLine =
                note.content
                  .split('\n')[0]
                  .trim()

              const preview =
                note.content
                  .replace(/\n/g, ' ')
                  .trim()

              return (

                <button
                  key={note.id}

                  onClick={() =>
                    router.push(
                      `/notes/${note.id}`
                    )
                  }

                  className="
                    flex min-h-48
                    w-40
                    flex-col

                    overflow-hidden

                    rounded-3xl

                    bg-(--color-bg-task)

                    p-4

                    text-left

                    shadow-sm

                    transition-all
                    active:scale-[0.985]
                  "
                >

                  {/* TITLE */}

                  <span
                    className="
                      line-clamp-2

                      text-sm
                      font-semibold
                      leading-5

                      text-(--color-text-primary)
                    "
                  >
                    {firstLine ||
                      'Nova nota'}
                  </span>

                  {/* PREVIEW */}

                  <span
                    className="
                      mt-3

                      line-clamp-6

                      text-sm
                      leading-5

                      text-(--color-text-secondary)
                    "
                  >
                    {preview ||
                      'Sem conteúdo'}
                  </span>

                </button>

              )
            })}

          </div>

        )}

      </div>

      <MenuTabBar />

    </AppShell>
  )
}