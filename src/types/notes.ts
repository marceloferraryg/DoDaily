//------------------------------------------
//-------- NOTE ----------------------------
//------------------------------------------

export type Note = {
  id: string

  content: string

  createdAt: string
  updatedAt: string

  pinned: boolean
  archived: boolean
}

//------------------------------------------
//-------- NOTES STORE ---------------------
//------------------------------------------

export type NotesStore = {

  //------------------------------------------
  // STATE
  //------------------------------------------

  notes: Note[]

  //------------------------------------------
  // ACTIONS
  //------------------------------------------

  createNote: () => string

  updateNote: (
    noteId: string,
    updates: Partial<Note>
  ) => void

  deleteNote: (
    noteId: string
  ) => void

  togglePinned: (
    noteId: string
  ) => void

  archiveNote: (
    noteId: string
  ) => void
}