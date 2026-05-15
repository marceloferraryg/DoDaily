'use client'
import { useState } from "react"

import { taskPriorityMap, TaskPriority } from '@/components/tasks/maps/TaskPriorityMap'



export default function FilterPriority() {


    const [active, setActive] = useState<TaskPriority>()

    function handleActive(value: TaskPriority) {
        setActive(value)

    }

    const priority = Object.values(taskPriorityMap) 

    return (
        <div className="flex w-full rounded-3xl justify-around items-center 
                         bg-(--color-bg-task) p-1 shadow-md">
        
            {priority.map((item) => {
            const Icon = item.icon
            const isActive = item.id === active
                return (
                    <div 
                        onClick={() => handleActive(item.id)}
                        className={`flex px-5 rounded-full font-medium justify-center items-center
                                    whitespace-nowrap transition-all active:scale-95 cursor-pointer
                                    ${isActive 
                                        ? 'bg-(--color-primary) text-(--color-text-primary-white) shadow-md'
                                        : 'bg-(--color-bg-task) text-(--color-text-primary)'
                                    }
                                    `}>
                        <div className={`flex justify-center items-center gap-2
                                        ${isActive
                                        ? 'text-(--color-text-primary-white)'
                                        : 'bg-(--color-bg-task) text-(--color-text-primary)'
                                        }
                                        `}
                        >
                            <span className="text-xl font-extrabold">
                                {Icon}
                            </span>
                            <span className="text-xs font-medium">
                                {item.name}
                            </span>
                        </div>
                    </div>
            
            )})
            }
        </div>
    )
}