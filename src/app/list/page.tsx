'use client'

import { useState } from 'react'

import { MenuTabBar } from '@/components/utils/MenuTabBar'
import { AppShell } from '@/components/AppShell'
import Header from '@/components/headers/Header'


export default function ListPage() {

    const [loading] = useState(false)

    
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
    
    return (
    <AppShell>
      <div
            className="
            relative flex h-screen w-full
            flex-col overflow-hidden
            bg-(--color-bg-body)
            "
      >

     <Header title="Minhas listas" subtitle={""} />

            <div className="
                    z-60 mt-20 flex-1
                    overflow-y-auto
                    rounded-t-3xl
                    bg-(--color-bg-body)
                    pb-32 
                    scroll-smooth
                "
            >
        

     <MenuTabBar />

            </div>
      </div>
    </AppShell>
    )
}












 



 
 


