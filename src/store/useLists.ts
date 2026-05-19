import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { v4 as uuid } from 'uuid'

import { List, NewList, ListStore } from '@/types/lists'


//------------------------------------------
//-------- USE LISTS -----------------------

export const useLists = create<ListStore>()(
  persist(
    (set, get) => ({
      lists: [],
      listItems: [],

      createList: (newList: NewList) => {
        const now = new Date().toISOString()

        const list: List = {
          id: uuid(),

          title: newList.title,
          description: newList.description,

          icon: newList.icon,
          color: newList.color,

          type: newList.type,

          createdAt: now,
          updatedAt: now,

          pinned: false,
          archived: false,

          itemsCount: 0,
          completedItemsCount: 0,

          sortOrder: get().lists.length,
        }

        set((state) => ({
          lists: [...state.lists, list],
        }))
      },

      //------------------------------------------
      // UPDATE LIST
      //------------------------------------------

      updateList: ( listId: string, updates: Partial<List> ) => {
        set((state) => ({
          lists: state.lists.map((list) => {
            if (list.id !== listId) {
              return list
            }

            return {
              ...list,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          }),
        }))
      },

      //------------------------------------------
      // DELETE LIST
      //------------------------------------------

      deleteList: (listId: string) => {
        set((state) => ({
          lists: state.lists.filter(
            (list) => list.id !== listId
          ),

          listItems: state.listItems.filter(
            (item) => item.listId !== listId
          ),
        }))
      },

      //------------------------------------------
      // TOGGLE PINNED
      //------------------------------------------

      togglePinned: (listId: string) => {
        set((state) => ({
          lists: state.lists.map((list) => {
            if (list.id !== listId) {
              return list
            }

            return {
              ...list,
              pinned: !list.pinned,
              updatedAt: new Date().toISOString(),
            }
          }),
        }))
      },

      //------------------------------------------
      // ARCHIVE LIST
      //------------------------------------------

      archiveList: (listId: string) => {
        set((state) => ({
          lists: state.lists.map((list) => {
            if (list.id !== listId) {
              return list
            }

            return {
              ...list,
              archived: true,
              updatedAt: new Date().toISOString(),
            }
          }),
        }))
      },
    }),

    //------------------------------------------
    // PERSIST
    //------------------------------------------

    {
      name: 'dodaily-lists-v1',
    }
  )
)