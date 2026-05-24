'use client'

import { useRouter } from 'next/navigation'

import {
  ArrowLeft,
  Plus,
} from 'lucide-react'

import { useNotes } from '@/store/useNotes'

type HeaderProps = {
  title: string
  subtitle?: string
  page:
    | 'home'
    | 'tasksPage'
    | 'listPage'
    | 'notesPage'
    | 'formNewList'
    | 'formNewTask'
    | 'secondary'
}

const BACK_ROUTES: Record<
  HeaderProps['page'],
  string
> = {
  home: '/',
  tasksPage: '/',
  listPage: '/',
  notesPage: '/',
  formNewList: '/list',
  formNewTask: '/',
  secondary: '/',
}

export default function Header({
  title,
  subtitle,
  page,
}: HeaderProps) {

  const router = useRouter()

  const createNote = useNotes(
    (state) => state.createNote
  )

  //------------------------------------------
  // HELPERS
  //------------------------------------------

  const isMainPage =
    page === 'tasksPage' ||
    page === 'listPage' ||
    page === 'notesPage'

  //------------------------------------------
  // ACTIONS
  //------------------------------------------

  function handleBack() {

    router.push(
      BACK_ROUTES[page]
    )
  }

  function handleNewList() {

    router.push('/list/new')
  }

  function handleNewNote() {

    const noteId = createNote()

    router.push(`/notes/${noteId}`)
  }

  //------------------------------------------
  // RENDER
  //------------------------------------------

  return (

    <header className="shell-top">

      <div className="flex h-26 w-full">

        {/* LEFT */}

        {isMainPage ? (

          <div
            className="
              flex w-8
              items-center justify-center

              bg-(--color-primary)

              pb-5
            "
          />

        ) : (

          <button
            onClick={handleBack}
            className="
              flex w-24
              items-center justify-center

              bg-(--color-primary)

              pb-5

              transition-all
              active:scale-[0.98]
            "
          >

            <ArrowLeft
              size={28}
              color="white"
            />

          </button>

        )}

        {/* TITLE */}

        <div
          className="
            flex flex-1
            flex-col justify-center

            bg-(--color-primary)

            pb-6
          "
        >

          <h2
            className="
              text-xl
              font-bold

              text-(--color-text-primary-white)
            "
          >
            {title}
          </h2>

          {subtitle && (

            <p
              className="
                text-sm

                text-(--color-text-secondary-white)
              "
            >
              {subtitle}
            </p>

          )}

        </div>

        {/* ACTIONS */}

        {page === 'listPage' && (

          <div
            className="
              flex w-32
              items-center justify-center

              bg-(--color-primary)

              pb-5 pr-8
            "
          >

            <button
              onClick={handleNewList}
              className="
                flex h-14 w-38
                items-center justify-center

                transition-all
                active:scale-[0.96]
              "
            >

              <Plus
                size={24}
                color="white"
                strokeWidth={3}
              />

              <span
                className="
                  ml-1
                  text-sm
                  text-white
                "
              >
                Nova lista
              </span>

            </button>

          </div>

        )}

        {page === 'notesPage' && (

          <div
            className="
              flex w-32
              items-center justify-center

              bg-(--color-primary)

              pb-5 pr-8
            "
          >

            <button
              onClick={handleNewNote}
              className="
                flex h-14 w-38
                items-center justify-center

                transition-all
                active:scale-[0.96]
              "
            >

              <Plus
                size={24}
                color="white"
                strokeWidth={3}
              />

              <span
                className="
                  ml-1
                  text-sm
                  text-white
                "
              >
                Nova nota
              </span>

            </button>

          </div>

        )}

      </div>

    </header>
  )
}