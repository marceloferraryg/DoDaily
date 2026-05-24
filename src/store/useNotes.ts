'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { v4 as uuid } from 'uuid'

import {
  Note,
  NotesStore,
} from '@/types/notes'

//------------------------------------------
//-------- USE NOTES -----------------------
//------------------------------------------

export const useNotes =
  create<NotesStore>()(

    persist(

      (set, get) => ({

        //------------------------------------------
        // STATE
        //------------------------------------------

        notes: [],

        hasHydrated: false,

        setHasHydrated: (
          state
        ) => {

          set({
            hasHydrated: state,
          })
        },

        //------------------------------------------
        // CREATE NOTE
        //------------------------------------------

        createNote: () => {

          const id = uuid()

          const now =
            new Date().toISOString()

          const note: Note = {
            id,

            content: '',

            createdAt: now,
            updatedAt: now,

            pinned: false,
            archived: false,
          }

          set((state) => ({
            notes: [
              note,
              ...state.notes,
            ],
          }))

          return id
        },

        //------------------------------------------
        // UPDATE NOTE
        //------------------------------------------

        updateNote: (
          noteId,
          updates
        ) => {

          set((state) => ({

            notes:
              state.notes.map(
                (note) => {

                  if (
                    note.id !== noteId
                  ) {
                    return note
                  }

                  return {

                    ...note,

                    ...updates,

                    updatedAt:
                      new Date().toISOString(),
                  }
                }
              ),

          }))
        },

        //------------------------------------------
        // DELETE NOTE
        //------------------------------------------

        deleteNote: (
          noteId
        ) => {

          set((state) => ({

            notes:
              state.notes.filter(
                (note) =>
                  note.id !== noteId
              ),

          }))
        },

        //------------------------------------------
        // TOGGLE PIN
        //------------------------------------------

        togglePinned: (
          noteId
        ) => {

          set((state) => ({

            notes:
              state.notes.map(
                (note) => {

                  if (
                    note.id !== noteId
                  ) {
                    return note
                  }

                  return {

                    ...note,

                    pinned:
                      !note.pinned,

                    updatedAt:
                      new Date().toISOString(),
                  }
                }
              ),

          }))
        },

      }),

      //------------------------------------------
      // PERSIST
      //------------------------------------------

      {
        name: 'dodaily-notes-v1',

        onRehydrateStorage: () => {

          return (state) => {

            state?.setHasHydrated(
              true
            )
          }
        },
      }

    )

  )