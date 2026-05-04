'use client'

import { use } from 'react'
import FormTask from '@/components/FormTask'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditTask({ params }: PageProps) {
  const { id } = use(params)

  return (
    <FormTask
      mode="edit"
      taskId={id}
    />
  )
}
