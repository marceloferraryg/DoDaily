import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { v4 as uuid } from 'uuid'

import {
  List,
  NewList,
  ListStore,
} from '@/types/lists'


//------------------------------------------
//-------- USE LISTS -----------------------

export const useLists = create<ListStore>()(
  persist(
    (set, get) => ({

      lists: [],

      //------------------------------------------
      //-------- CREATE LIST ---------------------

      createList: (
        newList: NewList
      ) => {

        const now =
          new Date().toISOString()

        const list: List = {
          id: uuid(),

          title: newList.title.trim(),

          description:
            newList.description,

          icon: newList.icon,
          color: newList.color,

          createdAt: now,
          updatedAt: now,

          pinned: false,
          archived: false,

          sortOrder:
            get().lists.length,
        }

        set((state) => ({
          lists: [
            ...state.lists,
            list,
          ],
        }))
      },

      //------------------------------------------
      //-------- UPDATE LIST ---------------------

      updateList: (
        listId,
        updates
      ) => {

        set((state) => ({
          lists: state.lists.map(
            (list) => {

              if (
                list.id !== listId
              ) {
                return list
              }

              return {
                ...list,
                ...updates,

                updatedAt:
                  new Date().toISOString(),
              }
            }
          ),
        }))
      },

      //------------------------------------------
      //-------- DELETE LIST ---------------------

      deleteList: (
        listId
      ) => {

        set((state) => ({
          lists: state.lists.filter(
            (list) =>
              list.id !== listId
          ),
        }))
      },

      //------------------------------------------
      //-------- TOGGLE PINNED -------------------

      togglePinned: (
        listId
      ) => {

        set((state) => ({
          lists: state.lists.map(
            (list) => {

              if (
                list.id !== listId
              ) {
                return list
              }

              return {
                ...list,

                pinned:
                  !list.pinned,

                updatedAt:
                  new Date().toISOString(),
              }
            }
          ),
        }))
      },

      //------------------------------------------
      //-------- ARCHIVE LIST --------------------

      archiveList: (
        listId
      ) => {

        set((state) => ({
          lists: state.lists.map(
            (list) => {

              if (
                list.id !== listId
              ) {
                return list
              }

              return {
                ...list,

                archived: true,

                updatedAt:
                  new Date().toISOString(),
              }
            }
          ),
        }))
      },

    }),
    {
      name: 'dodaily-lists-v1',
    }
  )
)