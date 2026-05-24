'use client'

import {
  useEffect,
  useState,
  useRef,
} from 'react'


import { use } from 'react'
import { ConfirmBottom } from '@/components/utils/ConfirmBottom'
import { useRouter } from 'next/navigation'

import {
  ArrowLeft,
  Trash2, 
} from 'lucide-react'

import { AppShell } from '@/components/AppShell'

import { useNotes } from '@/store/useNotes'
import { Note } from '@/types/notes'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function NoteView({ params }: PageProps) {

  const router = useRouter()
  const [content, setContent] = useState('')

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const textareaRef =
  useRef<HTMLTextAreaElement | null>(null)

 const { id } = use(params)

  const note = useNotes(
  (state) =>
    state.notes.find(
      (note) => note.id === id
    )
)


  //------------------------------------------
  // GET CONTENT
  //------------------------------------------
 useEffect(() => {

  if (!note) {
    return
  }

  setContent(note.content)

}, [note])

//------------------------------------------
// AUTO FOCUS
//------------------------------------------

useEffect(() => {

  const timeout = setTimeout(() => {

    textareaRef.current?.focus()

  }, 100)

  return () => clearTimeout(timeout)

}, [])


  //------------------------------------------
  // USENOTES
  //------------------------------------------
  const deleteNote = useNotes(
    (state) => state.deleteNote
  )

  const update = useNotes(
  (state) => state.updateNote
)


  //------------------------------------------
  // UPDATE 0,5 SECONDS
  //------------------------------------------
   useEffect(() => {

      if (!id || !note) {
        return
      }

      if (content === note.content) {
        return
      }

      const timeout = setTimeout(() => {

        update(id, {
          content,
        })

      }, 500)

      return () => {
        clearTimeout(timeout)
      }

    }, [
      content,
      id,
      note,
      update,
    ])


  //------------------------------------------
  // DELETE
  //------------------------------------------
  function openDelete(note: Note) {
        setSelectedNote(note)
        setIsDeleteOpen(true)
      }
  
  function handleDelete(){
    deleteNote(id)

    router.replace('/notes')
  }


  //------------------------------------------
  // BACK AND UPDATE
  //------------------------------------------
 function handleBack() {

  if (!content.trim()) {

    deleteNote(id)

    router.replace('/notes')

    return
  }

  update(id, {
    content,
  })

  router.replace('/notes')
}

 //------------------------------------------
  // BACK IF ID INVALID
  //------------------------------------------
useEffect(() => {

  if (!note) {
    router.replace('/notes')
  }

}, [note, router])

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
            absolute top-0 left-0 z-50

            flex h-16 w-full
            items-center justify-between

            bg-transparent

            px-2 pl-5

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
              bg-white
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

         

          {/* ACTIONS */}

          <div
            className="
              flex items-center
              gap-1 pr-3
            "
          >

            {/* DELETE */}

            <button
              onClick={() => note && openDelete(note)}
              disabled={!note}
              className="
                flex  h-12 w-12
                items-center justify-center
               bg-white
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
              setContent(e.target.value)
            }
            autoFocus
            ref={textareaRef}
            spellCheck={false}
            className="
              h-full w-full

              resize-none

              border-none
              bg-transparent

              pt-24
              pb-24

              text-[16px]
              leading-7

              text-(--color-text-primary)

              placeholder:text-(--color-text-muted)

              outline-none
            "
          />

        </div>

        <div className='bg-transparent w-full h-16' />

        

         <ConfirmBottom
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={handleDelete}
            task={undefined}
            list={undefined}
            note={selectedNote || undefined}
            title="Excluir nota"
            message="Tem certeza que deseja excluir esta nota?"
            confirmText="Excluir"
            cancelText="Cancelar"
            variant="danger"
         />

      </div>

    </AppShell>
  )
}