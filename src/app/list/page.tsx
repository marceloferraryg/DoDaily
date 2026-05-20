'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Plus } from 'lucide-react'

import { MenuTabBar } from '@/components/utils/MenuTabBar'
import { AppShell } from '@/components/AppShell'
import Header from '@/components/headers/Header'
import ListCard from '@/components/lists/ListCard'
import { List } from '@/types/lists'
import { useLists } from '@/store/useLists'




export default function ListPage() {

    const [loading] = useState(false)
    const router = useRouter();

    const lists = useLists((state) => state.lists);

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

    function handleNewList() {
        router.push('/list/new')
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

            <Header 
                title="Minhas listas" 
                subtitle={""} 
                page="listPage"
            />

        <div className="
               grid grid-cols-2
               z-60 mt-20
               overflow-y-auto
               rounded-t-3xl
               bg-(--color-bg-body)
               pb-32 p-5
               scroll-smooth
               justify-center
               
            "
        >
               
        

            <button 
                className='absolute cursor-pointer flex justify-center items-center top-5 right-3
                            w-32 h-10 '
                onClick={handleNewList}
            >
                <Plus size={20} color='white'/>
                <span className="ml-1 text-sm text-white">Nova lista</span>
            </button>

          

                {lists.length === 0 && (
                    <div className="flex h-full w-full flex-col items-center justify-center text-center 
                                    text-(--color-text-secondary) p-5">
                        Você ainda não tem nenhuma lista. Clique no botão acima para criar uma nova lista.
                    </div>
                )}
                {lists.length > 0 && (
                    lists.map((list) => (
                        <ListCard 
                            key={list.id}   
                            list={list}
                        />
                    ))
                )}
                
           
            

             <MenuTabBar />

        </div>
      </div>
    </AppShell>
    )
}












 



 
 


