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

export const taskCategoriesMap = [
  {
    id: 'work',
    name: 'Trabalho',
    icon: Briefcase,
    color: '#7C3AED', // violet forte
  },
  {
    id: 'health',
    name: 'Saúde',
    icon: HeartPulse,
    color: '#EF4444', // red
  },
  {
    id: 'home',
    name: 'Casa',
    icon: Home,
    color: '#F97316', // orange
  },
  {
    id: 'study',
    name: 'Estudos',
    icon: BookOpen,
    color: '#2563EB', // blue forte
  },
  {
    id: 'travel',
    name: 'Viagem',
    icon: Plane,
    color: '#06B6D4', // cyan
  },
  {
    id: 'pets',
    name: 'Pets',
    icon: PawPrint,
    color: '#65A30D', // green lime escuro
  },
  {
    id: 'maintenance',
    name: 'Manutenção',
    icon: Wrench,
    color: '#A16207', // amber / bronze
  },
  {
    id: 'other',
    name: 'Outros',
    icon: MoreHorizontal,
    color: '#64748B', // slate gray
  },
]