'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useRouter } from 'next/navigation'

import {
  ArrowLeft,
  Trash2,
  Pin,
} from 'lucide-react'

import { AppShell } from '@/components/AppShell'

import { useNotes } from '@/store/useNotes'

type Props = {
  noteId: string
}

export default function NoteView({
  noteId,
}: Props) {

  const router = useRouter()

  //------------------------------------------
  // STORE
  //------------------------------------------

  const notes = useNotes(
    (state) => state.notes
  )

  const hasHydrated = useNotes(
    (state) => state.hasHydrated
  )

  const updateNote = useNotes(
    (state) => state.updateNote
  )

  const deleteNote = useNotes(
    (state) => state.deleteNote
  )

  const togglePinned = useNotes(
    (state) => state.togglePinned
  )

  //------------------------------------------
  // NOTE
  //------------------------------------------

  const note = useMemo(() => {

    return notes.find(
      (item) => item.id === noteId
    )

  }, [notes, noteId])

  //------------------------------------------
  // LOCAL STATE
  //------------------------------------------

  const [content, setContent] =
    useState('')

  //------------------------------------------
  // LOAD CONTENT
  //------------------------------------------

  useEffect(() => {

    if (!note) {
      return
    }

    setContent(note.content)

  }, [note])

  //------------------------------------------
  // NOTE NOT FOUND
  //------------------------------------------

  useEffect(() => {

    if (!hasHydrated) {
      return
    }

    if (note) {
      return
    }

    router.replace('/notes')

  }, [
    hasHydrated,
    note,
    router,
  ])

  //------------------------------------------
  // AUTO SAVE
  //------------------------------------------

  useEffect(() => {

    if (!hasHydrated) {
      return
    }

    if (!note) {
      return
    }

    if (content === note.content) {
      return
    }

    const timeout =
      setTimeout(() => {

        updateNote(
          note.id,
          {
            content,
          }
        )

      }, 300)

    return () =>
      clearTimeout(timeout)

  }, [
    hasHydrated,
    content,
    note,
    updateNote,
  ])

  //------------------------------------------
  // BACK
  //------------------------------------------

  function handleBack() {

    if (!note) {

      router.push('/notes')

      return
    }

    //------------------------------------------
    // DELETE EMPTY NOTE
    //------------------------------------------

    if (!content.trim()) {

      deleteNote(note.id)

      router.push('/notes')

      return
    }

    router.push('/notes')
  }

  //------------------------------------------
  // DELETE NOTE
  //------------------------------------------

  function handleDelete() {

    if (!note) {
      return
    }

    deleteNote(note.id)

    router.push('/notes')
  }

  //------------------------------------------
  // TITLE
  //------------------------------------------

  const previewTitle =
    content
      .split('\n')
      .find((line) =>
        line.trim()
      )
      ?.trim()

  //------------------------------------------
  // LOADING
  //------------------------------------------

  if (!hasHydrated) {

    return (

      <AppShell>

        <div
          className="
            flex h-dvh
            w-full
            items-center
            justify-center

            bg-(--color-bg-body)
          "
        >

          <span
            className="
              text-sm
              text-(--color-text-secondary)
            "
          >
            Carregando...
          </span>

        </div>

      </AppShell>

    )
  }

  //------------------------------------------
  // NOTE NOT FOUND
  //------------------------------------------

  if (!note) {

    return (

      <AppShell>

        <div
          className="
            flex h-dvh
            w-full
            items-center
            justify-center

            bg-(--color-bg-body)
          "
        >

          <span
            className="
              text-sm
              text-(--color-text-secondary)
            "
          >
            Abrindo nota...
          </span>

        </div>

      </AppShell>

    )
  }

  //------------------------------------------
  // RENDER
  //------------------------------------------

  return (

    <AppShell>

      <div
        className="
          flex h-dvh
          w-full flex-col

          bg-(--color-bg-body)
        "
      >

        {/* HEADER */}

        <div
          className="
            sticky top-0 z-50

            flex h-16 w-full
            items-center justify-between

            bg-(--color-bg-body)/80

            px-2

            backdrop-blur-xl

            pt-[env(safe-area-inset-top)]
          "
        >

          {/* BACK */}

          <button
            onClick={handleBack}
            className="
              flex h-12 w-12
              items-center justify-center

              rounded-full

              transition-all
              active:scale-[0.96]
            "
          >

            <ArrowLeft
              size={28}
              className="
                text-(--color-text-primary)
              "
            />

          </button>

          {/* TITLE */}

          <div
            className="
              flex flex-1
              items-center
              justify-center

              px-4
            "
          >

            <span
              className="
                line-clamp-1

                text-sm
                font-medium

                text-(--color-text-secondary)
              "
            >
              {previewTitle || 'Nova nota'}
            </span>

          </div>

          {/* ACTIONS */}

          <div
            className="
              flex items-center
              gap-1
            "
          >

            {/* PIN */}

            <button
              onClick={() =>
                togglePinned(note.id)
              }
              className="
                flex h-12 w-12
                items-center justify-center

                rounded-full

                transition-all
                active:scale-[0.96]
              "
            >

              <Pin
                size={22}
                className={`
                  transition-colors

                  ${
                    note.pinned
                      ? 'text-(--color-primary)'
                      : 'text-(--color-text-secondary)'
                  }
                `}
              />

            </button>

            {/* DELETE */}

            <button
              onClick={handleDelete}
              className="
                flex h-12 w-12
                items-center justify-center

                rounded-full

                transition-all
                active:scale-[0.96]
              "
            >

              <Trash2
                size={22}
                className="
                  text-(--color-danger)
                "
              />

            </button>

          </div>

        </div>

        {/* TEXTAREA */}

        <div
          className="
            flex flex-1

            px-5
            pb-[calc(env(safe-area-inset-bottom)+20px)]
          "
        >

          <textarea
            value={content}

            onChange={(e) =>
              setContent(
                e.target.value
              )
            }

            placeholder="Comece a escrever..."

            autoFocus

            spellCheck={false}

            className="
              h-full w-full

              resize-none

              border-none
              bg-transparent

              pt-4

              text-[16px]
              leading-7

              text-(--color-text-primary)

              placeholder:text-(--color-text-muted)

              outline-none
            "
          />

        </div>

      </div>

    </AppShell>
  )
}