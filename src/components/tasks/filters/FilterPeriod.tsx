'use client'
import { useState } from "react"



export default function FilterPeriod() {

    const periods = [
        { label: 'Hoje', value: 'today' },
        { label: 'Semana', value: 'week' },
        { label: 'Tudo', value: 'all' },
        { label: 'Atrasadas', value: 'late' },
    ]

    const [active, setActive] = useState('today') 

    function handleActive(value: string) {
        setActive(value)
    }

    return (
        <div className="flex w-full rounded-3xl justify-around items-center
                         bg-(--color-bg-task) p-1 shadow-md">
        
            {periods.map((item) => (

                <div 
                    onClick={() => handleActive(item.value)}
                    className={`flex px-5 py-1 rounded-3xl text-sm font-medium justify-center items-center
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
                        {item.label}
                    </h1>
                </div>
            
        ))
            }
        </div>
    )
}