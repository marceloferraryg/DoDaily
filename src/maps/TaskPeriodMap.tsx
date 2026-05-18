import { id } from "date-fns/locale"

 
 
 export const taskPeriodMap = {
   today: {
            id: 'today',    
            label: 'Hoje',
            value: 'today',
          },
    week: {
            id: 'week',
            label: 'Semana',
            value: 'week',
          },
    all: {
            id: 'all',
            label: 'Tudo',
            value: 'all',
          },
    late: {
            id: 'late',
            label: 'Atrasadas',
            value: 'late',
          },
    nodate: {
            id: 'nodate',
            label: 'Sem data',
            value: 'nodate',
         }
} as const

  export type FilterPeriodType =
    keyof typeof taskPeriodMap

     