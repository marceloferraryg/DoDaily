'use client'
import { useState } from "react"



export default function TaskPrioritySelect() {

    const priority = [
        { label: 'Baixa', value: 'low', icon: '!' },
        { label: 'Média', value: 'medium', icon: '!!' },
        { label: 'Alta', value: 'high', icon: '!!!' },
    ]

    const [active, setActive] = useState('low') 

    function handleActive(value: string) {
        setActive(value)
    }

    return (
        <div className="flex w-full rounded-3xl justify-around items-center
                         bg-(--color-bg-task) p-2">
        
            {priority.map((item) => (

                <div 
                    onClick={() => handleActive(item.value)}
                    className={`flex w-8 h-8 rounded-full font-medium justify-center items-center
                                 whitespace-nowrap transition-all active:scale-95 cursor-pointer
                                ${item.value === active
                                    ? 'bg-(--color-primary) text-(--color-text-primary-white) shadow-md'
                                    : 'bg-(--color-bg-task) text-(--color-text-primary)'
                                }
                                `}>
                    <h1 className={`${item.value === active
                                      ? 'text-(--color-text-primary-white)'
                                      : 'bg-(--color-bg-task) text-(--color-text-primary) text-sm'
                                    }
                                    `}
                    >
                        {item.icon}
                        {item.label}
                    </h1>
                </div>
            
        ))
            }
        </div>
    )
}