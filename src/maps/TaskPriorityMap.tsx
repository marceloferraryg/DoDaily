
export const taskPriorityMap = {
  low: {
            id: 'low',
            name: 'Baixa',
            icon: '!',
         },
  medium: {
            id: 'medium',
            name: 'Média',
            icon: '!!',
         },
  high: {
            id: 'high',
            name: 'Alta',
            icon: '!!!',
         }
}as const

export type TaskPriority =
  keyof typeof taskPriorityMap 