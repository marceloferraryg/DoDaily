import {
  Briefcase,
  HeartPulse,
  Home,
  BookOpen,
  Plane,
  PawPrint,
  Wrench,
  MoreHorizontal,
} from 'lucide-react'

export const taskCategoriesMap = {
  other: {
            id: 'other',
            name: 'Outros',
            icon: MoreHorizontal,
            color: '#64748B', // slate gray
         },
  work: {
          id: 'work',
          name: 'Trabalho',
          icon: Briefcase,
          color: '#7C3AED', // violet forte
        },
  health: {
            id: 'health',
            name: 'Saúde',
            icon: HeartPulse,
            color: '#EF4444', // red
          },
  home: {
          id: 'home',
          name: 'Casa',
          icon: Home,
          color: '#F97316', // orange
        },
  study: {
            id: 'study',
            name: 'Estudos',
            icon: BookOpen,
            color: '#2563EB', // blue forte
          },
  travel: {
            id: 'travel',
            name: 'Viagem',
            icon: Plane,
            color: '#06B6D4', // cyan
          },
  pets: {
          id: 'pets',
          name: 'Pets',
          icon: PawPrint,
          color: '#65A30D', // green lime escuro
        },
  maintenance: {
                  id: 'maintenance',
                  name: 'Manutenção',
                  icon: Wrench,
                  color: '#A16207', // amber / bronze
               },
  
} as const

export type TaskCategory =
  keyof typeof taskCategoriesMap 