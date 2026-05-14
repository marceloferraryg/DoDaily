'use client'
import { useState } from "react"

type Props = {
  onSelectPriority: (value: string) => void
  editMode: string | undefined
}

export function TaskPrioritySelect({ onSelectPriority, editMode }: Props) {

    const priority = [
        { label: 'Baixa', value: 'low', icon: '!' },
        { label: 'Média', value: 'medium', icon: '!!' },
        { label: 'Alta', value: 'high', icon: '!!!' },
    ]

    const [active, setActive] = useState<string>(
        editMode || 'low'
      )

    function handleActive(value: string) {
        setActive(value)
        onSelectPriority(value)
    }

    return (
        <div className="flex w-full rounded-3xl justify-around items-center 
                         bg-(--color-bg-task) p-1 shadow-md">
        
            {priority.map((item) => (

                <div 
                    onClick={() => handleActive(item.value)}
                    className={`flex px-5 rounded-full font-medium justify-center items-center
                                 whitespace-nowrap transition-all active:scale-95 cursor-pointer
                                ${item.value === active
                                    ? 'bg-(--color-primary) text-(--color-text-primary-white) shadow-md'
                                    : 'bg-(--color-bg-task) text-(--color-text-primary)'
                                }
                                `}>
                    <div className={`flex justify-center items-center gap-2
                                    ${item.value === active
                                      ? 'text-(--color-text-primary-white)'
                                      : 'bg-(--color-bg-task) text-(--color-text-primary)'
                                    }
                                    `}
                    >
                        <span className="text-xl font-extrabold">
                            {item.icon}
                        </span>
                        <span className="text-xs font-medium">
                            {item.label}
                        </span>
                    </div>
                </div>
            
        ))
            }
        </div>
    )
}