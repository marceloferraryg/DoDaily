'use client'

import { AppShell } from '@/components/AppShell'

import { MenuTabBar } from '@/components/utils/MenuTabBar'
import FormPerfil from '@/components/profile/FormPerfil'
import FormTheme from '@/components/profile/FormTheme'

import { useUser } from '@/store/useUser'


export default function Profile() {

    const user = useUser((state) => state.user)

    if (!user) return null

    return (

        <AppShell>
            <div
                className="flex flex-col h-screen bg-(--color-bg-body) w-full"
            >
                
                <div className='relative flex flex-col w-full h-67 bg-(--color-primary) 
                                justify-center items-center'>
                
                        <div className='flex rounded-full h-32 w-32 z-10 bg-(--color-bg-body)
                                        justify-center items-center
                                        border-6 border-(--color-border)'
                        >
                            <span className='text-3xl font-bold text-(--color-primary)'>
                                {user?.name[0].toUpperCase()}
                            </span>   
                        </div>
                        
                    <h1 className='text-white text-2xl font-bold mt-3'>
                            {user?.name}
                    </h1>
                    

                </div>

                <div className='absolute flex h-full w-full top-60 rounded-t-3xl  bg-(--color-bg-body)'>
                

                <FormTheme />
                </div>
                
                
                
            </div>
            <MenuTabBar />
        </AppShell>
    )
}

                {/* <FormPerfil 
                    user={user}
                /> */}