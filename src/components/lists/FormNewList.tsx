'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'


import { AppShell } from '@/components/AppShell'
import Header from '@/components/headers/Header'

import { useLists } from '@/store/useLists'

import incrementUserActions from '@/hooks/useIncrementUserActions'

type Props = {
  mode: 'create' | 'edit'
  listId?: string
}

export default function FormNewList({ mode, listId }: Props) { 
  const router = useRouter()

  const createList = useLists((state) => state.createList)
  const updateList = useLists((state) => state.updateList)

  const list = useLists((state) =>
    mode === 'edit'
      ? state.lists.find((item) => item.id === listId)
      : undefined
  )

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')
    const [color, setColor] = useState('')

    const [loading, setLoading] = useState(mode === 'edit')
    const [saving, setSaving] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (mode === 'edit') {
      if (!listId) {
        router.push('/list/new')
        setLoading(false)
        return
      }

      if (!list) {
        router.push('/list/new')
        setLoading(false)
        return
      }

        setTitle(list.title)
        setDescription(list.description || '')
        setIcon(list.icon || '')
        setColor(list.color || '')
       
        setLoading(false)
    } else {
      setLoading(false)
    }
  }, [mode, listId, list, router])

  const canSave = useMemo(() => {
    return title.trim().length > 0 && !saving
  }, [title, saving])

  const pageTitle =
    mode === 'edit' ? 'Editar lista' : 'Nova lista'

  const pageSubtitle =
    mode === 'edit'
      ? 'Atualize os dados da lista'
      : 'Adicione uma nova lista à sua coleção'

  const buttonText =
    saving
      ? 'Salvando...'
      : mode === 'edit'
        ? 'Salvar alterações'
        : 'Criar lista'

  function getPayload() {
    return {
        title: title.trim(),
        description: description.trim(),
        icon,
        color,
    }
  }

  async function handleSubmit() {
    if (!canSave) return

    setSaving(true)

    const payload = getPayload()

    try {
      if (mode === 'create') {
        createList(payload)
      } else if (listId) {
        updateList(listId, payload)
      }
      
      incrementUserActions()
      router.push('/list')
    } finally {
      setSaving(false)   
    }
  }

  function handleEnter(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  if (loading) {
    return (
      <AppShell>
        <div className="flex h-screen items-center justify-center">
          <div className="text-(--color-text-secondary)">
            Carregando listas...
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-(--color-bg-body)">


        <Header
          title={pageTitle}
          subtitle={pageSubtitle}
          page='formNewList'
        />

    
        <div
          className="
            z-60
            mt-20
            flex-1
            overflow-y-auto
            rounded-t-3xl
            bg-(--color-bg-body)
            pb-48
            scroll-smooth
          "
        >
          <div className="space-y-4 p-5">

   
            <section className="border-b border-(--color-border) pb-3">
              
              <div className='flex justify-between'>
                  <div className="mb-1 ml-2">
                    <span className="text-sm font-bold tracking-wide text-(--color-text-secondary)">
                      Título da lista
                    </span>
                  </div>

                  <div className="text-right mr-2">
                    <span
                      className={`text-sm ${
                        title.length > 30
                          ? 'text-red-500'
                          : 'text-(--color-text-muted)'
                      }`}
                    >
                      {title.length}/40
                    </span>
                  </div>
              </div>
              <input
                type="text"
                autoFocus
                maxLength={40}
                value={title}
                placeholder="Ex: Comprar no mercado"
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleEnter}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="done"
                className="
                  h-8 w-full rounded-3xl
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

              
            </section>

  
           

  
            <section>

              <div className='flex justify-between'>
                  <div className="mb-1 ml-2 flex items-center gap-2">
                      
                      <span className="text-sm font-bold tracking-wide text-(--color-text-secondary)">
                        Descrição (opcional)
                      </span>
                  </div>

                  <div className="text-right mr-2">
                      <span
                        className={`text-sm ${
                          description.length > 230
                            ? 'text-red-500'
                            : 'text-(--color-text-muted)'
                        }`}
                      >
                        {description.length}/250
                      </span>
                  </div>

              </div>

              <textarea
                rows={5}
                maxLength={250}
                value={description}
                placeholder="Adicione detalhes importantes..."
                onChange={(e) => setDescription(e.target.value)}
                className="
                  w-full resize-none rounded-3xl
                  bg-(--color-input-bg)
                  px-4 py-4
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

          </div>
        </div>

        
        <div className="shell-button">
          <button
            onClick={handleSubmit}
            disabled={!canSave}
            className={`
              h-18 w-full
              rounded-none
              text-lg font-bold text-white
              transition active:scale-[0.98]
              ${
                canSave
                  ? 'bg-linear-to-b from-(--color-primary) to-(--color-hover-btn) shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]'
                  : 'bg-gray-400'
              }
            `}
          >
            {buttonText}
          </button>
        </div>

      </div>
    </AppShell>
  )
}