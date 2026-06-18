'use client'

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

import { useItemList } from '@/store/useItemList'
import incrementUserActions from '@/hooks/useIncrementUserActions'


export default function AddItemsBar({
  listId,
  listEmpty,
}: {
  listId: string
  listEmpty: boolean
}) {

  const [itemTitle, setItemTitle] = useState<string>('')
  const [keyboardHeight, setKeyboardHeight] = useState(0)


  const addItem =
    useItemList(
      (state) => state.addItem
    )



  async function handleAddItem() {

    if (itemTitle.trim() === '') return


    try {

      addItem(
        listId,
        itemTitle
      )

      setItemTitle('')

      incrementUserActions()


    } catch (error) {

      console.error(
        'Error adding item:',
        error
      )

    }

  }




  function handleEnter(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {

    if (e.key === 'Enter') {

      e.preventDefault()

      handleAddItem()

    }

  }





  //------------------------------------------
  // KEYBOARD HANDLING IOS + ANDROID
  //------------------------------------------

  useEffect(() => {


    const viewport =
      window.visualViewport


    if (!viewport) return



    const updateKeyboard = () => {


      const keyboard =
        document.documentElement.clientHeight -
        viewport.height



      setKeyboardHeight(
        keyboard > 0
          ? keyboard
          : 0
      )


    }



    viewport.addEventListener(
      'resize',
      updateKeyboard
    )


    viewport.addEventListener(
      'scroll',
      updateKeyboard
    )



    updateKeyboard()



    return () => {


      viewport.removeEventListener(
        'resize',
        updateKeyboard
      )


      viewport.removeEventListener(
        'scroll',
        updateKeyboard
      )


    }


  }, [])


  //------------------------------------------
  // LOCK AUTO SCROLL MOBILE
  //------------------------------------------

  function lockScroll() {


    document.documentElement.scrollTop = 0


    window.scrollTo({

      top: 0,

      left: 0,

      behavior: 'instant',

    })


  }


  function handleFocus() {


    window.addEventListener(
      'scroll',
      lockScroll,
      {
        passive: true,
      }
    )



    setTimeout(() => {

  


      const viewport =
        window.visualViewport



      if (!viewport) return



      const keyboard =
        window.innerHeight -
        viewport.height

      let finalKeyboard =
        keyboard > 0
          ? keyboard
          : 0

      if (/Android/i.test(navigator.userAgent)) {

        finalKeyboard =
          finalKeyboard -
          viewport.offsetTop

        if (finalKeyboard < 0) {
          finalKeyboard = 0
        }

      }

setKeyboardHeight(finalKeyboard)

      setKeyboardHeight(
        finalKeyboard
      )

    }, 300)


  }


  function handleBlur() {


    window.removeEventListener(
      'scroll',
      lockScroll
    )


    setKeyboardHeight(0)

  }

  return (


    <div


      className="
        absolute
        bottom-0
        left-0
        right-0

        flex
        items-center

        w-full

        z-100

        p-5

        transition-transform
        duration-150
      "



      style={{

        transform:
          `translateY(-${keyboardHeight}px)`

      }}


    >


      <div className="mr-2 flex-1">


        <input

          type="text"


          placeholder={
            listEmpty
              ? "Adicione seu primeiro item..."
              : "Adicione um item..."
          }


          maxLength={100}


          value={itemTitle}


          onChange={(e) =>
            setItemTitle(
              e.target.value
            )
          }


          onFocus={handleFocus}


          onBlur={handleBlur}


          autoComplete="off"

          autoCorrect="off"

          spellCheck={false}


          enterKeyHint="done"


          onKeyDown={handleEnter}



          className="
            h-10
            w-full

            rounded-full

            border-none

            bg-(--color-input-bg)

            px-4

            text-base

            text-(--color-text-primary)

            shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]

            outline-none

            transition-all

            placeholder:text-(--color-text-muted)

            focus:ring-2

            focus:ring-(--color-primary)/20
          "


        />


      </div>




      <button

        onClick={handleAddItem}

        className="
          flex
          h-10
          w-10

          items-center
          justify-center

          rounded-full

          bg-linear-to-b

          from-(--color-primary)

          to-(--color-hover-btn)

          shadow-md

          transition-all

          active:scale-[0.95]
        "

      >

        <Plus
          size={20}
          color="white"
        />

      </button>


    </div>


  )

}