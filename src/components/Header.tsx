import { useRouter } from 'next/navigation'

import { ArrowLeft } from "lucide-react"

type propsHeader = {
    title: string
    subtitle: string
}

export default function Header({title, subtitle} : propsHeader) {

 const router = useRouter()

    return(
        <div className='flex  w-full top-0 left-0 z-20 h-30'>
            <div 
                className='bg-(--color-primary) w-24 flex items-center justify-center -mt-5'
                onClick={() => router.push('/')}
            >
              <ArrowLeft size={32} color="white"/>
            </div>
            <div className="flex-col flex-1 bg-(--color-primary) py-5">
                <h2 className="text-3xl font-bold text-(--color-text-primary-white)">
                    {title}
                </h2>
                <p className="text-sm text-(--color-text-secondary-white)">
                    {subtitle}
                </p>
            </div>
        </div>
    )
} 