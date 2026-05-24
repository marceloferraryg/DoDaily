'use client'

import {
  Check,
  Trash2,
} from 'lucide-react'

import {
  useMemo,
  useRef,
  useState,
} from 'react'

import { useItemList } from '@/store/useItemList'

import { ListItem } from '@/types/itemsList'

type Props = {
  items: ListItem[]
}

export default function ItemsListCard({
  items,
}: Props) {

  //------------------------------------------
  // STATES
  //------------------------------------------

  const [
    activeItemId,
    setActiveItemId,
  ] = useState<string | null>(null)

  const longPressRef =
    useRef<NodeJS.Timeout | null>(null)

  //------------------------------------------
  // STORE
  //------------------------------------------

  const removeItem = useItemList(
    (state) => state.removeItem
  )

  const toggleItemDone =
    useItemList(
      (state) => state.toggleItem
    )

  //------------------------------------------
  // PENDING ITEMS
  //------------------------------------------

  const pendingItems = useMemo(() => {
    return items.filter(
      (item) => !item.done
    )
  }, [items])

  //------------------------------------------
  // COMPLETED ITEMS
  //------------------------------------------

  const completedItems =
    useMemo(() => {
      return items.filter(
        (item) => item.done
      )
    }, [items])

  //------------------------------------------
  // ACTIVE ITEM
  //------------------------------------------

  const activeItem =
    items.find(
      (item) =>
        item.id === activeItemId
    )

  //------------------------------------------
  // RENDER ITEM
  //------------------------------------------

  function renderItem(item: ListItem) {

    //------------------------------------------
    // LONG PRESS START
    //------------------------------------------

    function handleLongPressStart() {

      longPressRef.current =
        setTimeout(() => {

          setActiveItemId(
            (prev) =>
              prev === item.id
                ? null
                : item.id
          )

        }, 500)
    }

    //------------------------------------------
    // LONG PRESS END
    //------------------------------------------

    function handleLongPressEnd() {

      if (longPressRef.current) {

        clearTimeout(
          longPressRef.current
        )

      }
    }

    //------------------------------------------
    // DELETE
    //------------------------------------------

    function handleDelete() {

      removeItem(item.id)

      setActiveItemId(null)
    }

    //------------------------------------------
    // IS ACTIVE
    //------------------------------------------

    const isActive =
      activeItemId === item.id

    return (

      <div
        key={item.id}
        className={`
          relative

          flex items-center

          rounded-2xl

          px-2 py-2

          transition-all
          duration-200

          will-change-transform

          ${
            isActive
              ? `
                z-50

                scale-[1.02]

                bg-white

                shadow-2xl
              `
              : ''
          }
        `}
      >

        {/* CHECK BUTTON */}

        <button
          onClick={() =>
            toggleItemDone(item.id)
          }
          className={`
            flex h-6 w-6
            shrink-0
            items-center justify-center

            rounded-full
            border

            transition-all
            active:scale-95

            ${
              item.done
                ? `
                  border-(--color-success)
                  bg-(--color-success)
                `
                : `
                  border-(--color-border)
                `
            }
          `}
        >

          {item.done && (

            <Check
              size={16}
              color="white"
              strokeWidth={3}
            />

          )}

        </button>

        {/* ITEM BUTTON */}

        <button

          onTouchStart={
            handleLongPressStart
          }

          onTouchEnd={
            handleLongPressEnd
          }

          onTouchCancel={
            handleLongPressEnd
          }

          onMouseDown={
            handleLongPressStart
          }

          onMouseUp={
            handleLongPressEnd
          }

          onMouseLeave={
            handleLongPressEnd
          }

          className="
            relative

            ml-3

            flex-1

            text-left
          "
        >

          <span
            className={`
              wrap-break-word

              text-sm

              transition-all

              ${
                item.done
                  ? `
                    text-(--color-text-muted)
                    line-through
                  `
                  : `
                    text-(--color-text-primary)
                  `
              }
            `}
          >
            {item.title}
          </span>

        </button>

        {/* CONTEXT MENU */}

        {isActive && (

          <div
            className="
              absolute

              right-0
              -bottom-14

              z-60

              overflow-hidden

              rounded-3xl

              border
              border-(--color-border)

              bg-white

              shadow-md
            "
          >

            <button
              onClick={handleDelete}
              className="
                flex items-center
                gap-2

                px-4 py-3

                text-sm
                font-medium

                text-(--color-danger)

                transition-colors

                active:bg-(--color-danger)
              "
            >

              <Trash2 size={16} />

              Excluir

            </button>

          </div>

        )}

      </div>
    )
  }

  //------------------------------------------
  // RENDER
  //------------------------------------------

  return (

    <div className="relative flex flex-1 flex-col">

      {/* OVERLAY */}

      {activeItem && (

        <div
          onClick={() =>
            setActiveItemId(null)
          }
          className="
            fixed inset-0

            z-40

            bg-black/20

            backdrop-blur-[2px]

            transition-all
          "
        />

      )}

      {/* EMPTY STATE */}

      {pendingItems.length === 0 &&
        completedItems.length === 0 && (

        <div
          className="
            flex h-full w-full
            flex-col items-center
            justify-center

            gap-5
            px-12
            mt-32

            text-center
          "
        >

          <span
            className="
              text-lg
              font-semibold

              text-(--color-text-primary)
            "
          >
            Nenhum item ainda
          </span>

          <span
            className="
              max-w-65

              text-sm
              leading-5

              text-(--color-text-secondary)
            "
          >
            Toque no campo abaixo para
            adicionar o primeiro item
            da lista.
          </span>

        </div>

      )}

      {/* PENDING */}

      {pendingItems.length > 0 && (

        <div className="flex items-center gap-3">

          <div className="h-px flex-1 bg-(--color-border)" />

          <span
            className="
              text-xs
              text-(--color-text-muted)
            "
          >
            {pendingItems.length}{' '}
            {pendingItems.length === 1
              ? 'pendente'
              : 'pendentes'}
          </span>

          <div className="h-px flex-1 bg-(--color-border)" />

        </div>

      )}

      {/* PENDING ITEMS */}

      <div className="mt-4 flex flex-col gap-3">

        {pendingItems.map(renderItem)}

      </div>

      {/* COMPLETED DIVIDER */}

      {completedItems.length > 0 && (

        <div
          className="
            my-6

            flex items-center
            gap-3
          "
        >

          <div className="h-px flex-1 bg-(--color-border)" />

          <span
            className="
              text-xs
              text-(--color-text-muted)
            "
          >
            {completedItems.length}{' '}
            {completedItems.length === 1
              ? 'completo'
              : 'completos'}
          </span>

          <div className="h-px flex-1 bg-(--color-border)" />

        </div>

      )}

      {/* COMPLETED ITEMS */}

      <div className="flex flex-col gap-3">

        {completedItems.map(renderItem)}

      </div>

    </div>
  )
}