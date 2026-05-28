
import { useEffect, useMemo, useState } from "react"

import { User } from "@/types/user"
import { useUser } from "@/store/useUser"


type Props = {
    user: User
}


export default function FormPerfil( { user }: Props ) {

const [name, setName] = useState<string>('')
const [email, setEmail] = useState<string>('')
const [bio, setBio] = useState<string>('')

const [saving, setSaving] = useState(false)
 
const updateUser = useUser((state) => state.updateUser)

useEffect(() => {
    if (!user) return
    
    setName(user.name)
    setEmail(user.email || '')
    setBio(user.bio || '')
    
}, [user])

//-----------------------------------------------
//CAN SAVE
//-----------------------------------------------

const canSave = useMemo(() => {
    return name.trim().length > 0 && !saving
  }, [name, saving])


//-----------------------------------------------
//SUBMIT
//-----------------------------------------------

  async function handleSubmit() {
    if (!canSave) return

    setSaving(true)

    try {
      updateUser({
        name,
        email,
        bio
      }) 
    } finally {
        setSaving(false)
    }
   
  }

    return (
        <div className="flex flex-col w-full p-5  gap-5">
            
            <section>
                
                <span className="text-sm font-semibold text-(--color-text-primary)">
                    Nome
                </span>

                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    type="text"
                    maxLength={20}
                    placeholder="Seu Primeiro nome"
                    className="
                        h-8 w-full rounded-3xl
                        bg-(--color-input-bg)
                        px-4 mt-2
                        text-base
                        shadow-sm
                        outline-none
                        transition
                        placeholder:text-(--color-text-muted)
                        focus:ring-2
                        focus:ring-(--color-primary)/20
                        "
                />
            </section>

            <section>
                
                <span className="text-sm font-semibold text-(--color-text-primary)">
                    Email
                </span>

                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="seu@email.com"
                    className="
                        h-8 w-full rounded-3xl
                        bg-(--color-input-bg)
                        px-4 mt-2
                        text-base
                        shadow-sm
                        outline-none
                        transition
                        placeholder:text-(--color-text-muted)
                        focus:ring-2
                        focus:ring-(--color-primary)/20
                        "
                />
            </section>

            <section>
                
                <span className="text-sm font-semibold text-(--color-text-primary)">
                    Bio
                </span>

                <textarea 
                rows={5}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Sobre você (opcional)"
                    className="
                        w-full resize-none rounded-3xl
                        bg-(--color-input-bg)
                        px-4 py-4 mt-2
                        leading-4
                        shadow-md
                        outline-none
                        transition
                        placeholder:text-(--color-text-muted)
                        focus:ring-2
                        focus:ring-(--color-primary)/20
                        "
                />
            </section>

            <div className="mt-5">
          <button
            onClick={handleSubmit}
            disabled={!canSave}
            className={`
              h-12 w-full
              rounded-3xl
              text-lg font-bold text-white
              transition active:scale-[0.98]
              ${
                canSave
                  ? 'bg-(--color-primary) shadow-[0_10px_30px_rgba(94,45,180,0.35)]'
                  : 'bg-gray-400'
              }
            `}
          >
            Salvar
          </button>
        </div>
            
        </div>
    )
}