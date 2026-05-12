'use client'

import { useState } from 'react'

import { AppShell } from '@/components/AppShell'
import  Header  from '@/components/headers/Header'
import { useTasks } from '@/store/useTasks'
import TaskFilters from '@/components/tasks/filters/TaskFilters'




export default function Tasks() {

    const [loading, setLoading] = useState(false)


    if (loading) {
    return (
      <AppShell>
        <div className="flex h-screen items-center justify-center">
          <div className="text-(--color-text-secondary)">
            Carregando tarefa...
          </div>
        </div>
      </AppShell>
    )
  }

return(
    <AppShell>
        <div className="relative flex h-screen w-full flex-col overflow-hidden bg-(--color-bg-body)">

            <Header 
                title='Minhas Tarefas'
                subtitle=''
            />

            <div
            className=" flex z-60 mt-25 flex-1 overflow-y-auto rounded-t-3xl bg-(--color-bg-body) pb-32 scroll-smooth"
            >

             <TaskFilters />

            </div>

            
        </div>
    </AppShell>
)

}