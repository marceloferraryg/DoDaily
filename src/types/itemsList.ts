//------------------------------------------
//-------- PRIORITY ------------------------

export type Priority =
  | 'low'
  | 'medium'
  | 'high'


//------------------------------------------
//-------- LIST ITEM -----------------------

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

  priority?: Priority

  quantity?: string

  notes?: string
}


//------------------------------------------
//-------- LIST ITEMS STORE ----------------

export type ListItemsStore = {
  listItems: ListItem[]

  addItem: (
    listId: string,
    title: string
  ) => void

  updateItem: (
    itemId: string,
    updates: Partial<ListItem>
  ) => void

  removeItem: (
    itemId: string
  ) => void

  removeItemsByListId: (
    listId: string
  ) => void

  toggleItem: (
    itemId: string
  ) => void

  clearCompletedItems: (
    listId: string
  ) => void

  reorderItems: (
    items: ListItem[]
  ) => void
}