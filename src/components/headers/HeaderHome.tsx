
import { useRouter } from "next/navigation"
import { useUser } from "@/store/useUser"




export function HeaderHome() {

  const today = new Date().toLocaleDateString('pt-BR', {
  weekday: 'short',
  day: 'numeric',
  month: 'long'
})


const user = useUser((state) => state.user)

  const router = useRouter()
  const Username = user?.name

  

  return (

    <header className="flex justify-between items-center 
                       px-5 pt-4 pb-10 shell-top
                        
                        bg-linear-to-b
                        from-(--color-primary)
                        to-(--color-hover-btn)
                       ">
      
       <div>
          <h2 className="text-3xl font-bold text-white">
            Hoje
          </h2>

          
          <p className="text-white/80 text-sm">
            {today}
          </p>
      </div> 

      <div className="flex flex-col items-center justify-center">
          
          <button 
              onClick={() => router.push('/auth')}
              className="w-10 h-10 rounded-full bg-(--color-bg-body) 
                          flex items-center justify-center cursor-pointer">
                <span className="text-lg text-(--color-primary)">
                  {user?.name[0].toUpperCase() || "Foto"}
                </span>
          </button>

          <div>
            <h1 className="font-bold text-md text-white">
              Olá, {Username}
            </h1>
          </div>
      
      </div>

     
    </header>
  )
}