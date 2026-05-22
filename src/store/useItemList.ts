import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { v4 as uuid } from 'uuid'

import {
  ListItem,
  ListItemsStore,
} from '@/types/itemsList'


//------------------------------------------
//-------- USE LIST ITEMS ------------------

export const useListItems =
  create<ListItemsStore>()(
    persist(
      (set, get) => ({

        listItems: [],

        //------------------------------------------
        //-------- ADD ITEM ------------------------

        addItem: (
          listId,
          title
        ) => {

          const now =
            new Date().toISOString()

          const itemsFromList =
            get().listItems.filter(
              (item) =>
                item.listId === listId
            )

          const newItem: ListItem = {
            id: uuid(),

            listId,

            title: title.trim(),

            done: false,

            createdAt: now,
            updatedAt: now,

            sortOrder:
              itemsFromList.length,
          }

          set((state) => ({
            listItems: [
              ...state.listItems,
              newItem,
            ],
          }))
        },

        //------------------------------------------
        //-------- UPDATE ITEM ---------------------

        updateItem: (
          itemId,
          updates
        ) => {

          set((state) => ({
            listItems:
              state.listItems.map(
                (item) => {

                  if (
                    item.id !== itemId
                  ) {
                    return item
                  }

                  return {
                    ...item,
                    ...updates,

                    updatedAt:
                      new Date().toISOString(),
                  }
                }
              ),
          }))
        },

        //------------------------------------------
        //-------- REMOVE ITEM ---------------------

        removeItem: (
          itemId
        ) => {

          set((state) => ({
            listItems:
              state.listItems.filter(
                (item) =>
                  item.id !== itemId
              ),
          }))
        },

        //------------------------------------------
        //-------- REMOVE ITEMS BY LIST ------------

        removeItemsByListId: (
          listId
        ) => {

          set((state) => ({
            listItems:
              state.listItems.filter(
                (item) =>
                  item.listId !== listId
              ),
          }))
        },

        //------------------------------------------
        //-------- TOGGLE ITEM ---------------------

        toggleItem: (
          itemId
        ) => {

          set((state) => ({
            listItems:
              state.listItems.map(
                (item) => {

                  if (
                    item.id !== itemId
                  ) {
                    return item
                  }

                  const done =
                    !item.done

                  return {
                    ...item,

                    done,

                    completedAt: done
                      ? new Date().toISOString()
                      : undefined,

                    updatedAt:
                      new Date().toISOString(),
                  }
                }
              ),
          }))
        },

        //------------------------------------------
        //-------- CLEAR COMPLETED -----------------

        clearCompletedItems: (
          listId
        ) => {

          set((state) => ({
            listItems:
              state.listItems.filter(
                (item) =>
                  !(
                    item.listId ===
                      listId &&
                    item.done
                  )
              ),
          }))
        },

        //------------------------------------------
        //-------- REORDER ITEMS -------------------

        reorderItems: (
          items
        ) => {

          if (items.length === 0) {
            return
          }

          const reordered =
            items.map(
              (
                item,
                index
              ) => ({
                ...item,
                sortOrder: index,
              })
            )

          set((state) => {

            const otherItems =
              state.listItems.filter(
                (item) =>
                  item.listId !==
                  reordered[0].listId
              )

            return {
              listItems: [
                ...otherItems,
                ...reordered,
              ],
            }
          })
        },

      }),
      {
        name:
          'dodaily-list-items-v1',
      }
    )
  )