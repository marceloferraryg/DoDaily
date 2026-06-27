'use client'

import {
    CheckCircle2,
    ShieldCheck,
    Cloud,
    Package
} from "lucide-react"

import { AppShell } from '@/components/AppShell'

import { useRouter } from "next/navigation"
import { useUser } from "@/store/useUser"
import { useTasks } from "@/store/useTasks"
import { useLists } from "@/store/useLists"
import { useNotes } from "@/store/useNotes"

export default function AuthPage() {
    const router = useRouter()

    const user = useUser((state) => state.user)
    const tasks = useTasks((state) => state.tasks)
    const lists = useLists((state) => state.lists)
    const notes = useNotes((state) => state.notes)

    const hasData =
        tasks.length > 0 ||
        lists.length > 0 ||
        notes.length > 0

    return (
        <AppShell>
            <div
                className="
                    flex flex-col
                    items-center justify-center
                    w-full h-svh
                    bg-(--color-bg-body)
                    px-8 py-12
                    scroll-smooth
                    overflow-y-auto
                    overflow-hidden

                "
            >
                {/* HEADER */}

                <div className="flex items-center gap-5 mb-5">
                    <ShieldCheck
                    size={52}
                    className="
                        text-(--color-primary)
                    "
                     />
                    <Cloud
                        size={52}
                        className="
                            text-(--color-primary)
                        "
                    />
                </div>

                <h1
                    className="
                        text-(--color-text-primary)
                        text-2xl
                        font-bold
                        text-center
                    "
                >
                    Olá, {user?.name}!
                </h1>

                <h2
                    className="
                        text-(--color-text-primary)
                        text-lg
                        font-semibold
                        text-center
                        mt-1
                    "
                >
                    Proteja seus dados e acesse o DoDaily em qualquer lugar.
                </h2>

                <p
                    className="
                        text-(--color-text-secondary)
                        text-center
                        text-sm
                        mt-5
                        max-w-md
                    "
                >
                    Você pode usar o DoDaily normalmente sem uma conta.
                    <br />
                    <br />
                    Ao criar uma conta gratuita, seus dados ficam seguros
                    na nuvem e podem ser acessados em outros dispositivos.
                </p>

                {/* BENEFÍCIOS */}

                <div
                    className="
                        w-full
                        max-w-md
                        rounded-3xl
                        bg-(--color-bg-summary-card)
                        p-5
                        mt-8
                    "
                >
                    <div className="flex flex-col gap-4">

                        <div className="flex items-center gap-3">
                            <CheckCircle2
                                size={22}
                                className="text-(--color-primary)"
                            />

                            <span
                                className="
                                    text-sm
                                    text-(--color-primary)
                                "
                            >
                                Nunca perca seus dados
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <CheckCircle2
                                size={22}
                                className="text-(--color-primary)"
                            />

                            <span
                                className="
                                    text-sm
                                    text-(--color-primary)
                                "
                            >
                                Backup automático na nuvem
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <CheckCircle2
                                size={22}
                                className="text-(--color-primary)"
                            />

                            <span
                                className="
                                    text-sm
                                    text-(--color-primary)
                                "
                            >
                                Acesse em outro celular ou computador
                            </span>
                        </div>

                    </div>
                </div>

                {/* DADOS ATUAIS */}

                {hasData && (
                    <div
                        className="
                            w-full
                            max-w-md
                            rounded-3xl
                            bg-(--color-bg-summary-card)
                            p-5
                            mt-4
                        "
                    >
                        <div className="flex items-center gap-2 mb-3">

                            <Package
                                size={24}
                                className="text-(--color-primary)"
                            />

                            <span
                                className="
                                    text-sm
                                    font-semibold
                                    text-(--color-primary)
                                "
                            >
                                Seus dados atuais
                            </span>

                        </div>

                        <p
                            className="
                                text-sm text-center
                                text-black/70
                            "
                        >
                            {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'}
                            {' • '}
                            {lists.length} {lists.length === 1 ? 'lista' : 'listas'}
                            {' • '}
                            {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
                        </p>

                        <p
                            className="
                                text-sm
                                text-(--color-primary)
                                mt-3
                            "
                        >
                            Tudo será sincronizado automaticamente ao criar
                            sua conta.
                        </p>

                        <p
                            className="
                                text-xs text-center
                                text-black/70
                                mt-1
                            "
                        >
                            Nenhum dado será perdido.
                        </p>
                    </div>
                )}

                {/* TEXTO AUXILIAR */}

                <p
                    className="
                        text-sm
                        text-center
                        text-(--color-text-secondary)
                        mt-6
                    "
                >
                    Cadastro rápido, gratuito e leva menos de 1 minuto.
                </p>

                {/* BOTÕES */}

                <div
                    className="
                        flex flex-col
                        w-full
                        max-w-md
                        gap-2
                        mt-5
                    "
                >
                    <button
                        onClick={() => router.push('/auth/signup')}
                        className="
                            rounded-3xl
                            bg-linear-to-b from-(--color-primary) to-(--color-hover-btn) shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]
                            py-3
                            px-5
                            text-md
                            text-white
                            font-semibold

                            cursor-pointer
                        "
                    >
                        Criar conta
                    </button>

                    <button
                        onClick={() => router.push('/auth/signin')}
                        className="
                            py-3
                            px-5
                            text-sm
                            font-semibold
                            text-(--color-text-primary)
                            cursor-pointer
                        "
                    >
                        Já possui uma conta? Entrar
                    </button>

                    <button
                        onClick={() => router.push('/')}
                        className="
                            py-2
                            text-xs
                            text-(--color-text-secondary)
                            cursor-pointer
                        "
                    >
                        Agora não
                    </button>
                </div>
            </div>
        </AppShell>
    )
}