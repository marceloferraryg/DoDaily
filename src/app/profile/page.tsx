'use client'

import { AppShell } from '@/components/AppShell'

import { MenuTabBar } from '@/components/utils/MenuTabBar'
import FormPerfil from '@/components/profile/FormPerfil'

import { useUser } from '@/store/useUser'


export default function Profile() {

    const user = useUser((state) => state.user)

    if (!user) return null

    return (

        <AppShell>
            <div
                className="flex flex-col h-screen bg-(--color-bg-body) w-full"
            >
                
                <div className='flex flex-col w-full h-60 bg-(--color-primary) 
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

                <FormPerfil 
                    user={user}
                />
                
            </div>
            <MenuTabBar />
        </AppShell>
    )
}