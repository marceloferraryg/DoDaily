'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { List } from '@/types/lists'

import { useItemList } from '@/store/useItemList'

type PropsListCard = {
  list: List
}

export default function ListCard({ list }: PropsListCard) {

  const router = useRouter()

  //------------------------------------------
  // ITEMS
  //------------------------------------------

  const listItems = useItemList(
    (state) => state.listItems
  )

  const items = useMemo(() => {
    return listItems.filter(
      (item) => item.listId === list.id
    )
  }, [listItems, list.id])

  //------------------------------------------
  // PREVIEW
  //------------------------------------------

  const pendingItems = items.filter(
  (item) => !item.done
)

const previewItems =
  pendingItems.slice(0, 5)

const remainingCount =
  items.length -
  previewItems.length

  return (

    <button
      onClick={() =>
        router.push(`/list/${list.id}`)
      }
      className="

        flex h-68 w-full
        flex-col

        overflow-hidden

        rounded-3xl

        bg-(--color-bg-task)

        p-4

        shadow-sm

        transition-all
        active:scale-[0.95]

        cursor-pointer
      "
    >

      {/* HEADER */}

      <div
        className="
          flex min-h-12
          items-center

          border-b
          border-(--color-border)

          pb-3
        "
      >

        <span
          className="
            line-clamp-2

            text-left
            text-[15px]
            font-semibold
            leading-5

            text-(--color-text-primary)
          "
        >
          {list.title}
        </span>

      </div>

     {/* ITEMS */}

<div
  className="
    mt-3

    flex flex-1
    flex-col

    overflow-hidden
  "
>

  {/* EMPTY */}

  {previewItems.length === 0 && (

    <div
      className="
        flex flex-1
        items-center
        justify-center
      "
    >

      <span
        className="
          text-center
          text-sm italic

          text-(--color-text-muted)
        "
      >
        Nenhum item ainda
      </span>

    </div>

  )}

  {/* PREVIEW ITEMS */}

  {previewItems.length > 0 && (

    <div
      className="
        flex flex-1
        flex-col
        gap-2
      "
    >

      {previewItems.map((item) => (

        <div
          key={item.id}
          className="
            flex items-center
            gap-2
          "
        >

          <div
            className="
              h-1.5 w-1.5
              shrink-0
              rounded-full
              bg-(--color-text-muted)
            "
          />

          <span
            className="
              line-clamp-1

              text-sm
              leading-5

              text-(--color-text-secondary)
            "
          >
            {item.title}
          </span>

        </div>

      ))}

    </div>

  )}

  {/* REMAINING */}

  {remainingCount > 0 && (

    <div
      className="
        mt-auto
        pt-3
      "
    >

      <span
        className="
          text-xs
          font-medium

          text-(--color-text-muted)
        "
      >
        +{remainingCount} itens
      </span>

    </div>

  )}

</div>

    </button>
  )
}