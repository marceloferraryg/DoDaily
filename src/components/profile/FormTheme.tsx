

import { themeColorsMap } from '@/maps/ThemeMap'
import { useState } from 'react'


export default function FormTheme(){

    const themes = Object.values(themeColorsMap)

    const [isActive, setIsActive] = useState('lavander')

    const themeMap = [
        {id: 'ligth', name: 'Claro', color: '#ffffff'},
        {id: 'dark', name: 'Escuro', color: '#010101'}, 
    ]


    function handleSubmit(themeId : string) {
        setIsActive(themeId)
    }

    return(
        <div className='flex flex-col w-full p-5 gap-8 items-center'>
             <h1 className="text-md text-(--color-text-primary)">
                    Escolha o tema de cores para o app
             </h1>
            
            <div className="grid grid-cols-2 gap-5 justify-center items-center">
                {themeMap.map((theme) => (
                    <button 
                            key={theme.id}
                            onClick={() => handleSubmit(theme.id)}
                            className={`flex w-36 h-12 rounded-3xl cursor-pointer
                                        justify-center items-center shadow-md
                                        ${isActive === theme.id ?
                                            'border-4 border-black' : ''
                                        }
                                        `}
                             style={{background: theme.color}}
                        >
                            <span className={`font-semibold text-sm
                                                ${theme.id === 'ligth' ? 
                                                    'text-black' : 'text-white'}`}>
                                {theme.name}
                            </span>
                        </button>
                ))}
            </div>

            <h1 className='mt-8'>
                Escolha uma cor
            </h1>
            
            <div className="grid grid-cols-2 gap-5 justify-center items-center">

                {themes.map((theme) => (
                    <button 
                        key={theme.id}
                        onClick={() => handleSubmit(theme.id)}
                        className={`flex w-36 h-12 rounded-3xl cursor-pointer
                                    justify-center items-center shadow-md
                                    ${isActive === theme.id ?
                                        'border-4 border-black' : ''
                                    }
                                    `}
                        style={{background: theme.color}}
                    >
                        <span className='text-white font-semibold text-sm'>
                            {theme.name}
                        </span>
                    </button>
                ))}

            </div>
        </div>
    )
}