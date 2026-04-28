'use client'

import { useState } from 'react'
import { useTasks } from '@/store/useTasks'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'

import { Calendar, Clock } from "lucide-react"


export default function NewTask() {

  const router = useRouter()

  const { addTask } = useTasks()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')


  function handleAdd() {
    if (!title.trim()) return

    addTask({
      title,
      date,
      time,
      notes,
    })

    // limpa campos
    setTitle('')
    setDate('')
    setTime('')
    setNotes('')
    
    router.push('/')
  }

  return (
   
    
     <div className="flex flex-col h-screen w-full bg-(--color-bg-body) overflow-hidden"> 
       
        <Header 
            title={"Nova tarefa"}
            subtitle={"Adicione uma nova tarefa à sua lista"}
        />

        <div className="w-full bg-(--color-bg-body) rounded-t-3xl flex-1
                        overflow-y-auto scroll-smooth pb-50 -mt-5 z-50">

            <div className="p-5 flex flex-col gap-3">

                <div className='border-b border-(--color-border) pb-8 mt-8'>
                    <input
                        type="text"
                        placeholder="Título da tarefa"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                        className="w-full p-3 rounded-xl bg-(--color-input-bg) text-(--color-text-primary) outline-none shadow-md"
                        onKeyDown={(e) => {
                        if (e.key === 'Enter') 
                        handleAdd()
                        }}
                    />
                </div>

                <div className='border-b border-(--color-border) pb-8 mt-5 gap-4 flex-col flex'>
                    
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2 text-xl '>
                            <Calendar size={32}/>
                            <h1>Data</h1>
                        </div>
                        <div className=''>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-60 p-3 rounded-xl bg-(--color-input-bg) text-(--color-text-primary) outline-none shadow-md"
                            />
                             <span className='text-(--color-text-muted) ml-5'>opcional</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2 text-xl '>
                            <Clock size={32}/>
                            <h1>Hora</h1>
                        </div>
                        <div className=''>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-60 p-3 rounded-xl bg-(--color-input-bg) text-(--color-text-primary) outline-none shadow-md"
                            />
                            <span  className='text-(--color-text-muted) ml-5'>opcional</span>
                        </div>
                    </div>
                    

                
                   
                </div>
        
                <textarea
                    placeholder="Observações (opcional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 rounded-xl bg-(--color-input-bg) text-(--color-text-primary) outline-none 
                                resize-none shadow-md mt-5"
                    rows={3}
                />
            </div>
        </div>

      
        <div className="fixed bottom-0 left-0 w-full bg-(--color-bg-body) z-50">
            <button
                onClick={handleAdd}
                className="w-full bg-(--color-primary) text-white text-xl font-bold h-16
                        active:scale-[0.98] transition"
            >
                Salvar tarefa
            </button>
        </div>

    </div>
  )
}