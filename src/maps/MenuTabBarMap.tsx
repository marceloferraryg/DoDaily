import {
    Home,
    CheckSquare,
    ShoppingCart,
    User,   
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
  profile: {
            id: 'profile',
            name: 'Perfil',
            href: '/profile',
            icon: User,
         },


} as const

export type MenuTabBarTypes =
  keyof typeof menuTabBarMap 