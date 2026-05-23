
import { useRouter } from 'next/navigation'

import { ArrowLeft, Plus } from "lucide-react"


type propsHeader = {
    title: string
    subtitle: string
    page: string
}

function pushPage(page: string) {
  switch (page) {
    case 'formNewList':
      return '/list'
    case 'listPage':
      return '/'
    case 'tasksPage':      
      return '/'
    case 'formNewTask':
      return '/' 
    default:      return '/'
  } 
}




export default function Header({title, subtitle, page} : propsHeader) {

 const router = useRouter()

 const actualPage = page

   return (
  <header className="shell-top">
    <div className="flex h-26 w-full">
      
      {actualPage === 'tasksPage' || actualPage === 'listPage' ? (
          <div className='w-8 bg-(--color-primary) flex items-center justify-center pb-5' />
      
        ) : (

          <button
            className="w-24 bg-(--color-primary) flex items-center justify-center pb-5"
            onClick={() => router.push(pushPage(page))}
          >
            <ArrowLeft size={28} color="white" />
          </button>
      )}
      
      
      <div className="flex flex-1 flex-col justify-center bg-(--color-primary) pb-6">
        <h2 className="text-xl font-bold text-(--color-text-primary-white)">
          {title}
        </h2>

        <p className="text-sm text-(--color-text-secondary-white)">
          {subtitle}
        </p>
      </div>

      {actualPage === 'listPage' && (
         
       <div className='w-32 bg-(--color-primary) flex items-center justify-center pb-5 pr-8'>  
          <button 
                className='cursor-pointer flex justify-center items-center w-38 h-14 '
                onClick={() => router.push('/list/new')}
          >
                <Plus size={24} color='white' strokeWidth={3}/>
                <span className="ml-1 text-sm text-white">Nova lista</span>
          </button>
       </div>
    )} 
       
    </div>

      

  </header>
)
} 