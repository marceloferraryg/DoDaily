'use client'

import { useRouter } from 'next/navigation'


import { MenuTabBar } from '@/components/utils/MenuTabBar'
import { AppShell } from '@/components/AppShell'
import Header from '@/components/headers/Header'
import ListCard from '@/components/lists/ListCard'
import { useLists } from '@/store/useLists'




export default function ListsPage() {

 
    const router = useRouter();

    const lists = useLists((state) => state.lists);

    
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

            {lists.length === 0 ? ( 
                    <div className="z-60 mt-20
                    flex flex-col h-full w-full
                    rounded-t-3xl
                    bg-(--color-bg-body)
                    p-12
                    justify-center items-center 
                    text-center
                    gap-3 ">
                        <span className="block text-md font-semibold">
                            Nenhuma lista ainda!
                        </span>

                        <span className="block text-sm text-(--color-text-secondary)">
                            Crie listas para organizar
                            compras, ideias, viagens e muito mais!
                        </span>

                        <button
                            className="
                            cursor-pointer
                                mt-5 px-4 py-3
                                bg-(--color-primary)
                                text-white
                                rounded-3xl
                                text-sm font-medium
                            "
                            onClick={() => router.push('/list/new')}
                        >
                            Criar minha primeira lista
                        </button>

                    </div>
                       
            ) : (

                <div className="
                    grid grid-cols-[repeat(auto-fit,minmax(160px,160px))]
                    justify-center
                    z-60 mt-20
                    overflow-y-auto
                    rounded-t-3xl
                    bg-(--color-bg-body)
                    pb-32 p-5
                    scroll-smooth
                    content-start
                    gap-5
                    "
                >
                    
                        {lists.map((list) => (
                                <ListCard 
                                    key={list.id}    
                                    list={list}
                                />
                            ))
                        }
                         

                </div>
            )
            }

      </div>

       <MenuTabBar />
        
    </AppShell>
    )
}












 



 
 


