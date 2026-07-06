export type User = {
  id: string

  name: string

  email?: string

  supabaseId?: string

  avatar?: string

  theme: string 

  bio: string

  createdAt: string
}

export type UserStore = {
  user: User | null

  createUser: (
    name: string
  ) => void

  updateUser: (
    updates: Partial<User>
  ) => void

  logout: () => void
}