'use client'

import { use } from 'react'
import ChecklistView from '@/components/lists/ChecklistView'

import { useLists } from '@/store/useLists'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function ListView({ params }: PageProps) { 

    const { id } = use(params)

  const list = useLists((state) =>
    state.lists.find((l) => l.id === id)
  )

  if (!list) {
    return (
      <div>
        Lista não encontrada
      </div>
    )
  }

  return (
    <ChecklistView list={list} />
  )
}