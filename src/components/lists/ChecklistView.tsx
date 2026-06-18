'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '../AppShell'

import {
  ArrowLeft,
  Pin,
  Trash2,
  Edit,
} from 'lucide-react'

import AddItemsBar from './AddItemsBar'
import { ConfirmBottom } from '@/components/utils/ConfirmBottom'
import ItemsListCard from './ItemsListCard'

import { useLists } from '@/store/useLists'
import { useItemList } from '@/store/useItemList'
import { List } from '@/types/lists'
import incrementUserActions from '@/hooks/useIncrementUserActions'

type ChecklistViewProps = {
  list: List
}

export default function ChecklistView({ list }: ChecklistViewProps) {
  const router = useRouter()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedList, setSelectedList] = useState<List | null>(null)
    
  const deleteList = useLists((state) => state.deleteList)
  const listItems = useItemList((state) => state.listItems)

  const items = useMemo(() => {
    return listItems.filter((item) => item.listId === list.id)
  }, [listItems, list.id])

  const removeItemsByListId = useItemList((state) => state.removeItemsByListId)

  function openDelete(list: List) {
    setSelectedList(list)
    setIsDeleteOpen(true)
  }

  async function handleDelete() {
    try {
      removeItemsByListId(list.id)
      deleteList(list.id)
      incrementUserActions()
      router.push('/list')
    } catch (error) {
      console.error('Error deleting list:', error)
    }
  }


                      const [scrollY, setScrollY] =
                      useState(0)

                    useEffect(() => {
                      const update = () =>
                        setScrollY(window.scrollY)

                      window.addEventListener(
                        'scroll',
                        update
                      )

                      return () =>
                        window.removeEventListener(
                          'scroll',
                          update
                        )
                    }, [])

const [debug, setDebug] = useState({
  win: 0,
  html: 0,
  body: 0,
})

useEffect(() => {
  const update = () => {
    setDebug({
      win: window.scrollY,
      html: document.documentElement.scrollTop,
      body: document.body.scrollTop,
    })
  }

  update()

  window.addEventListener('scroll', update)

  return () =>
    window.removeEventListener('scroll', update)
}, [])

useEffect(() => {
  const lockScroll = () => {
    document.documentElement.scrollTop = 0
    window.scrollTo(0, 0)
  }

  window.addEventListener('scroll', lockScroll)

  return () => {
    window.removeEventListener('scroll', lockScroll)
  }
}, [])

  return (
    <AppShell>
   
      <div
        className="
          relative 
          flex h-full w-full flex-col
          bg-(--color-bg-body)
          overflow-hidden
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
          <button
            onClick={() => router.push('/list')}
            className="
              flex h-12 w-12
              items-center justify-center
              bg-(--color-bg-card)
              rounded-full
              transition-all
              active:scale-[0.96]
            "
          >
            <ArrowLeft size={28} className="text-(--color-text-primary)" />
          </button>

          <div className="flex items-center gap-3 pr-3">
            <button
              onClick={() => openDelete(list)}
              className="
                flex h-12 w-12
                items-center justify-center
                bg-(--color-bg-card)
                rounded-full
                transition-all
                active:scale-[0.96]
              "
            >
              <Trash2 size={22} className="text-(--color-danger)" />
            </button>

            {list.pinned && (
              <button
                className="
                  flex h-12 w-12
                  items-center justify-center
                  bg-(--color-bg-card)
                  rounded-full
                  transition-all
                  active:scale-[0.96]
                "
              >
                <Pin size={22} className="text-(--color-text-primary)" />
              </button>
            )}

            <button
              onClick={() => router.push(`/list/edit/${list.id}`)}
              className="
                flex h-12 w-12
                items-center justify-center
                bg-(--color-bg-card)
                rounded-full
                transition-all
                active:scale-[0.96]
              "
            >
              <Edit size={22} className="text-(--color-text-primary)" />
            </button>
          </div>
        </div>

       
        <div
          className="
            flex flex-1 flex-col
            overflow-y-auto
            px-6
            pt-16
            pb-24 
            min-h-0
          "
        >
          <div className="pt-6 pb-4">
            <h1
              className="
                text-2xl
                font-bold
                leading-tight
                text-(--color-text-primary)
              "
            >
              {list.title}
            </h1>

            <div
  className="
    fixed
    top-80
    left-0
    z-100
    bg-red-500
    text-white
    text-xs
  "
>
  win: {debug.win}
  <br />
  html: {debug.html}
  <br />
  body: {debug.body}
</div>

          </div>                           

          <ItemsListCard items={items} /> 
        </div>

     
         <AddItemsBar  
            listId={list.id}   
            listEmpty={items.length === 0}    
         />
      

        <ConfirmBottom
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDelete}
          task={undefined}
          list={selectedList || undefined}
          note={undefined}
          title="Remover lista"
          message="Tem certeza que deseja remover esta lista?"
          confirmText="Remover"
          cancelText="Cancelar"
          variant="danger"
        />
       
      </div>
    </AppShell>
  )
}