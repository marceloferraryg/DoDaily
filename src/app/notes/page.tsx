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

  const deleteNote = useNotes(
    (state) => state.deleteNote
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
  // FORMAT DATE
  //------------------------------------------
function formatDateBR(date: string) {

  return new Date(date).toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
  )
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
              flex flex-col
              w-full h-full

              items-center
              justify-center
              text-center

              gap-3

              overflow-y-auto

              rounded-t-3xl

              bg-(--color-bg-body)

              p-10

              scroll-smooth

              z-60 mt-20
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

               bg-linear-to-b 
               from-(--color-primary) 
               to-(--color-hover-btn)

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
              flex flex-col

              content-start
              justify-center

              gap-3

              overflow-y-auto

              rounded-t-3xl

              bg-(--color-bg-body)

              p-5
              pb-24

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

              const title =
                firstLine.length > 30
                  ? `${firstLine.slice(0, 40)}...`
                  : firstLine

              return (

                <button
                  key={note.id}

                  onClick={() =>
                    router.push(
                      `/notes/${note.id}`
                    )
                  }

                  className="
                    flex h-16
                    w-full
                    flex-col

                    justify-center 
                    
                    overflow-hidden

                    rounded-3xl

                    bg-(--color-bg-task)

                    px-5 py-2 gap-1

                    text-left

                    shadow-sm

                    transition-all
                    active:scale-[0.95]

                    cursor-pointer
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
                    {title ||
                      'Nova nota'}
                  </span>

                  <span
                    className='text-xs text-(--color-text-muted)'
                  >
                    {formatDateBR(note.updatedAt)}
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