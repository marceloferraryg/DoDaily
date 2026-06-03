import {
    Home,
    CheckSquare,
    ShoppingCart,
    NotepadText ,
    Settings,   
} from 'lucide-react'

export const menuTabBarMap = {
  home: {
            id: 'home',
            name: 'Hoje',
            href: '/',
            icon: Home,
         },
  tasks: {
            id: 'tasks',
            name: 'Tarefas',
            href: '/tasks',
            icon: CheckSquare,
         },         
  list: {
            id: 'list',
            name: 'Listas',
            href: '/list',
            icon: ShoppingCart,
         },
  notes: {
            id: 'notes',
            name: 'Notas',
            href: '/notes',
            icon: NotepadText ,
         },
  settings: {
            id: 'settings',
            name: 'Ajustes',
            href: '/settings',
            icon: Settings,
         },


} as const

export type MenuTabBarTypes =
  keyof typeof menuTabBarMap 