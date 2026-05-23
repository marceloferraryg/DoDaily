'use client'

import { useState } from 'react'
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

import { useLists } from '@/store/useLists'
import { useListItems } from '@/store/useItemList'
import { List } from '@/types/lists'

type ChecklistViewProps = {
  list: List
}

export default function ChecklistView({ list }: ChecklistViewProps) {

  const router = useRouter()

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
   const [selectedList, setSelectedList] = useState<List | null>(null)
    
 const deleteList = useLists(
  (state) => state.deleteList
)


const removeItemsByListId =
  useListItems(
    (state) =>
      state.removeItemsByListId
  )

   function openDelete(list: List) {
      setSelectedList(list)
      setIsDeleteOpen(true)
    }

function handleDelete() {

  removeItemsByListId(list.id)

  deleteList(list.id)

  router.push('/list')
}

  return (
    <AppShell>
        <div
          className="
            flex min-h-screen
            w-full flex-col
            bg-(--color-bg-body)
          "
        >

            <div
                className="
                sticky top-0 z-50

                flex h-16 w-full
                items-center justify-between

                bg-(--color-bg-body)/80

                px-2

                backdrop-blur-sm

                pt-[env(safe-area-inset-top)]
                "
            >

                    <button
                    onClick={() => router.push('/list')}
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
                        className="text-(--color-text-primary)"
                    />
                    </button>


            <div className="flex items-center gap-1">

              <button
                onClick={() => openDelete(list)}
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
                    className="text-(--color-danger)"
                    />

              </button>

              {list.pinned && (
                <button
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
                        className="text-(--color-text-primary)"
                    />

                </button>
              )}

              <button
                  onClick={() => router.push(`/list/edit/${list.id}`)}
                  className="
                    flex h-12 w-12
                    items-center justify-center

                    rounded-full

                    transition-all
                    active:scale-[0.96]
                  "
                >
                    <Edit
                        size={22}
                        className="text-(--color-text-primary)"
                    />

                </button>

            </div>
          </div>


          <div className="px-6 pt-2 pb-4">

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

          </div>


          <div
            className="
              flex flex-1 flex-col

              overflow-y-auto

              px-6
              pb-36
            "
          >

            <div className="flex flex-col gap-4">

              <p className="text-(--color-text-secondary)">
                itens aqui
              </p>

            </div>

          </div>


                <AddItemsBar 
                    listId={list.id}    
                />

                <ConfirmBottom
                            isOpen={isDeleteOpen}
                            onClose={() => setIsDeleteOpen(false)}
                            onConfirm={handleDelete}
                            task={undefined}
                            list={selectedList || undefined}
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