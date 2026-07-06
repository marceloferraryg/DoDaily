'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type {
  Session,
  User as SupabaseUser,
} from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase'

import type {
  AuthAccount,
  AuthContextValue,
} from '@/types/auth'

//------------------------------------------
// CONTEXT
//------------------------------------------

const AuthContext =
  createContext<AuthContextValue | null>(null)

//------------------------------------------
// HELPERS
//------------------------------------------

function mapSupabaseUser(
  user: SupabaseUser
): AuthAccount {

  const meta = user.user_metadata ?? {}

  return {
    id: user.id,
    email: user.email ?? '',
    localId: meta.local_id,
    name: meta.name,
    bio: meta.bio,
    avatar: meta.avatar,
    theme: meta.theme,
    themeColor: meta.theme_color,
  }
}

//------------------------------------------
// PROVIDER
//------------------------------------------

type Props = {
  children: React.ReactNode
}

export function AuthProvider({
  children,
}: Props) {

  const [account, setAccount] =
    useState<AuthAccount | null>(null)

  const [session, setSession] =
    useState<Session | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  //------------------------------------------
  // SET ACCOUNT FROM AUTH
  //------------------------------------------

  const setAccountFromAuth = useCallback((
    user: SupabaseUser,
    authSession: Session | null
  ) => {

    setAccount(
      mapSupabaseUser(user)
    )

    setSession(authSession)

  }, [])

  //------------------------------------------
  // SIGN OUT
  //------------------------------------------

  const signOut = useCallback(async () => {

    await supabase.auth.signOut()

    setAccount(null)
    setSession(null)

  }, [])

  //------------------------------------------
  // RESTORE SESSION ON MOUNT
  //------------------------------------------

  useEffect(() => {

    let isMounted = true

    async function initSession() {

      const { data } =
        await supabase.auth.getSession()

      if (!isMounted) {
        return
      }

      if (data.session?.user) {

        setAccountFromAuth(
          data.session.user,
          data.session
        )

      }

      setIsLoading(false)

    }

    initSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, authSession) => {

        if (!isMounted) {
          return
        }

        if (authSession?.user) {

          setAccountFromAuth(
            authSession.user,
            authSession
          )

        } else {

          setAccount(null)
          setSession(null)

        }

        setIsLoading(false)

      }
    )

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }

  }, [setAccountFromAuth])

  //------------------------------------------
  // VALUE
  //------------------------------------------

  const value = useMemo<AuthContextValue>(() => ({

    account,
    session,
    isAuthenticated: session !== null,
    isLoading,
    setAccountFromAuth,
    signOut,

  }), [
    account,
    session,
    isLoading,
    setAccountFromAuth,
    signOut,
  ])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

//------------------------------------------
// HOOK
//------------------------------------------

export function useAuth(): AuthContextValue {

  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth deve ser usado dentro de AuthProvider'
    )
  }

  return context
}
