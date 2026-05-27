import { create } from 'zustand'

import { persist } from 'zustand/middleware'

import { v4 as uuid } from 'uuid'

import {
  User,
  UserStore,
} from '@/types/user'

export const useUser =
  create<UserStore>()(

    persist(

      (set) => ({

        //------------------------------------------
        // STATE
        //------------------------------------------

        user: null,

        //------------------------------------------
        // CREATE USER
        //------------------------------------------

        createUser: (name) => {

          const now =
            new Date().toISOString()

          const user: User = {

            id: uuid(),

            name,

            createdAt: now,

          }

          set({
            user,
          })
        },

        //------------------------------------------
        // UPDATE USER
        //------------------------------------------

        updateUser: (updates) => {

          set((state) => {

            if (!state.user) {
              return state
            }

            return {

              user: {

                ...state.user,

                ...updates,

              },

            }
          })
        },

        //------------------------------------------
        // LOGOUT
        //------------------------------------------

        logout: () => {

          set({
            user: null,
          })
        },

      }),

      {
        name: 'dodaily-user',
      }

    )

  )