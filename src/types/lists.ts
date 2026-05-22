//------------------------------------------
//-------- LIST TYPES ----------------------

export type ListType =
  | 'checklist'
  | 'notes'


//------------------------------------------
//-------- LIST ----------------------------

export type List = {
  id: string

  title: string
  description?: string

  icon?: string
  color?: string

  type: ListType

  createdAt: string
  updatedAt: string

  pinned: boolean
  archived: boolean

  sortOrder: number
}


//------------------------------------------
//-------- NEW LIST ------------------------

export type NewList = {
  title: string

  description?: string

  icon?: string
  color?: string

  type: ListType
}


//------------------------------------------
//-------- LIST STORE ----------------------

export type ListStore = {
  lists: List[]

  createList: (
    newList: NewList
  ) => void

  updateList: (
    listId: string,
    updates: Partial<List>
  ) => void

  deleteList: (
    listId: string
  ) => void

  togglePinned: (
    listId: string
  ) => void

  archiveList: (
    listId: string
  ) => void
}