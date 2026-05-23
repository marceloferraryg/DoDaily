

import { use } from 'react'

import { useLists } from '@/store/useLists'

interface PageProps {
  params: Promise<{
    id: string
  }>
}


import FormNewList from '@/components/lists/FormNewList'

export default function EditList({ params }: PageProps) {

     const { id } = use(params)

  

    return (
        
            <FormNewList 
                mode="edit" 
                listId={id}
            />  
       
    )
}