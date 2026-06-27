'use client'

import Image from 'next/image'
import { AppShell } from '@/components/AppShell'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { supabase } from '@/lib/supabase'
import { useUser } from '@/store/useUser'
import { useTheme } from '@/store/useTheme'

export default function SignUpPage() {

    const router = useRouter()

    const user = useUser(state => state.user)
    const theme = useTheme(state => state.mode)
    const themeColor = useTheme(state => state.theme)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    function isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        return regex.test(email.trim())
    }

    const canRegister =
            isValidEmail(email) &&
            password.trim().length >= 6 &&
            confirmPassword.trim().length >= 6

    function clearError() {
        if (errorMessage) {
            setErrorMessage('')
        }
    }

    async function handleRegister() {

        if (!isValidEmail(email)) {
            setErrorMessage('Digite um endereço de e-mail válido.')
            return
        }

        if (password.length < 6) {
            setErrorMessage('A senha deve possuir pelo menos 6 caracteres.')
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage('As senhas não coincidem.')
            return
        }

        setErrorMessage('')

       
      const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    local_id: user?.id,
                    name: user?.name,
                    bio: user?.bio ?? "",
                    avatar: user?.avatar ?? "",
                    theme: theme ?? "",
                    theme_color: themeColor ?? "",
                }
            }
        })

        if (error) {
            setErrorMessage(error.message)
            return
        }

        console.log(data) 

        setEmail('')
        setPassword('')
        setConfirmPassword('')
        
        
    }

    return (
        <AppShell>
            <div
                className="
                    flex flex-col
                    items-center
                    justify-center
                    h-svh
                    p-5
                    pb-12
                    bg-(--color-bg-body)
                    overflow-y-auto
                "
            >

                <div
                    className="
                        flex flex-col
                        items-center
                        gap-5
                        w-full
                        rounded-3xl
                        border-4
                        border-(--color-primary)
                        bg-(--color-bg-body)
                        p-5
                    "
                >

                    {/* HEADER */}

                    <Image
                        src="/images/logoDoDaily.png"
                        alt="Logo DoDaily"
                        width={50}
                        height={50}
                        loading="eager"
                    />

                    <h1 className="text-lg font-bold text-center text-(--color-primary)">
                        Crie sua conta DoDaily!
                    </h1>

                    <span className="text-sm text-center text-(--color-text-secondary) mb-8">
                        Seus dados serão sincronizados automaticamente e ficarão disponíveis em qualquer dispositivo.
                    </span>

                    {/* INPUTS */}

                    <div className="flex flex-col w-full gap-5">

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                clearError()
                            }}
                            className="
                                h-10
                                w-full
                                rounded-3xl
                                bg-(--color-input-bg)
                                px-4
                                shadow-md
                                outline-none
                                placeholder:text-(--color-text-muted)
                                focus:ring-2
                                focus:ring-(--color-primary)/20
                            "
                        />

                        <input
                            type="password"
                            placeholder="Senha (mínimo de 6 caracteres)"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                clearError()
                            }}
                            className="
                                h-10
                                w-full
                                rounded-3xl
                                bg-(--color-input-bg)
                                px-4
                                shadow-md
                                outline-none
                                placeholder:text-(--color-text-muted)
                                focus:ring-2
                                focus:ring-(--color-primary)/20
                            "
                        />

                        <input
                            type="password"
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                clearError()
                            }}
                            className="
                                h-10
                                w-full
                                rounded-3xl
                                bg-(--color-input-bg)
                                px-4
                                shadow-md
                                outline-none
                                placeholder:text-(--color-text-muted)
                                focus:ring-2
                                focus:ring-(--color-primary)/20
                            "
                        />

                        {errorMessage && (
                            <span className="text-center text-xs text-red-500">
                                {errorMessage}
                            </span>
                        )}

                    </div>

                    {/* BUTTONS */}

                    <div className="flex flex-col w-full">

                        <button
                            onClick={handleRegister}
                            disabled={!canRegister}
                            className={`
                                w-full
                                h-12
                                rounded-3xl
                                text-white
                                font-semibold
                                cursor-pointer
                                active:scale-97
                                transition
                                ${
                                    canRegister
                                        ? 'bg-linear-to-b from-(--color-primary) to-(--color-hover-btn) shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]'
                                        : 'bg-gray-400'
                                }
                            `}
                        >
                            Criar conta
                        </button>

                        <button
                            onClick={() => router.push('/auth/signin')}
                            className="
                                py-3
                                text-sm
                                font-semibold
                                text-(--color-text-primary)
                                cursor-pointer
                            "
                        >
                            Já possui uma conta? Entrar
                        </button>

                    </div>

                </div>

                <span className="text-(--color-border)">
                    ________________________________________________________________________
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