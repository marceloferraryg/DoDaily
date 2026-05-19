

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

  itemsCount: number
  completedItemsCount: number

  sortOrder: number
}

//------------------------------------------
//-------- LIST ITEMS ----------------------

export type ListItem = {
  id: string

  listId: string

  title: string
  description?: string

  done: boolean

  createdAt: string
  updatedAt: string
  completedAt?: string

  sortOrder: number

  priority?: TaskPriority

  quantity?: string

  notes?: string
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
//-------- LISTSTORE -----------------------

export type ListStore = {
  lists: List[]
  listItems: ListItem[]

  createList: (newList: NewList) => void

  updateList: (
    listId: string,
    updates: Partial<List>
  ) => void

  deleteList: (listId: string) => void

  togglePinned: (listId: string) => void

  archiveList: (listId: string) => void
}

//------------------------------------------
//-------- LISTTYPES -----------------------

export type ListType =
  | 'checklist'
  | 'notes'
  | 'shopping'
