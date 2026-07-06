import type {
  Session,
  User as SupabaseUser,
} from '@supabase/supabase-js'

export type AuthAccount = {
  id: string
  email: string
  localId?: string
  name?: string
  bio?: string
  avatar?: string
  theme?: string
  themeColor?: string
}

export type AuthContextValue = {
  account: AuthAccount | null
  session: Session | null
  isAuthenticated: boolean
  isLoading: boolean
  setAccountFromAuth: (
    user: SupabaseUser,
    session: Session | null
  ) => void
  signOut: () => Promise<void>
}
