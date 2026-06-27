'use client'

import Image from 'next/image'
import { AppShell } from '@/components/AppShell'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'



export default function SignInPage() {

    const router = useRouter() 

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   
    
    const canRegister = useMemo(() => {
            return email.trim().length > 0 
                && password.trim().length > 0 
                
          }, [email, password])
    

    return (
        <AppShell>
            <div className="flex flex-col items-center justify-center h-svh m-5
                            bg-(--color-bg-body)
                            scroll-smooth
                            overflow-y-auto
                            overflow-hidden"
            >
               
        {/*DIV CONTAINER*/}       
               <div className="flex flex-col items-center gap-5 w-full
                                border-4 border-(--color-primary) rounded-3xl p-5
                                bg-(--color-bg-body)">
                     
               {/*HEADER*/}
                     <Image
                              src="/images/logoDoDaily.png"
                              alt="Logo"
                              width={50}
                              height={50}
                              loading="eager"
                            />
                    <h1 className="text-lg text-center font-bold text-(--color-primary)">
                        Bem-vindo de volta!
                    </h1>

                    <span className="text-sm text-center text-(--color-text-secondary) mb-8">
                        Entre para acessar seus dados sincronizados.
                    </span>


               {/*INPUTS*/}

                    <div className="flex flex-col w-full gap-5 bg-(--color-bg-body) mb-5">
                        
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="
                                h-10 w-full rounded-3xl
                                bg-(--color-input-bg)
                                px-4
                                text-md
                                shadow-md
                                outline-none
                                transition
                                placeholder:text-(--color-text-muted)
                                focus:ring-2
                                focus:ring-(--color-primary)/20
                                "
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="
                                h-10 w-full rounded-3xl
                                bg-(--color-input-bg)
                                px-4
                                text-md
                                shadow-md
                                outline-none
                                transition
                                placeholder:text-(--color-text-muted)
                                focus:ring-2
                                focus:ring-(--color-primary)/20
                                "
                        />
                       
                    </div>


                {/*BUTTONS*/}

                    <div className='flex flex-col w-full'>
                        <button
                            onClick={() => router.push('/auth/signup')}
                            disabled={!canRegister}
                            className={`
                                rounded-3xl
                               ${canRegister ? 'bg-linear-to-b from-(--color-primary) to-(--color-hover-btn) shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]' 
                                                 : 'bg-gray-400'} 
                                w-full h-12
                                text-md
                                text-white
                                font-semibold
                                cursor-pointer
                            `}
                        >
                            Entrar
                        </button>

                         <button
                            onClick={() => router.push('/auth/signup')}
                            className="
                                py-3
                                px-5
                                text-sm
                                font-semibold
                                text-(--color-text-primary)
                                cursor-pointer
                            "
                        >
                            Ainda não tem uma conta? Cadastrar
                        </button>
                    </div>

                </div>

                <span className='text-(--color-border)'>
                    ____________________________________________________________________________________
                </span>

                 <button
                        onClick={() => router.push('/')}
                        className="
                            py-2
                            text-sm
                            text-(--color-text-secondary)
                            cursor-pointer
                        "
                    >
                        Continuar usando apenas neste dispositivo
                    </button>
            </div>
        </AppShell>
    )
}
       
    
