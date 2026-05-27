
import { useTheme } from "@/store/useTheme"
import { useUser } from "@/store/useUser"


export function HeaderHome() {

  const today = new Date().toLocaleDateString('pt-BR', {
  weekday: 'short',
  day: 'numeric',
  month: 'long'
})


const user = useUser((state) => state.user)

  const Username = user?.name

  


  const setTheme = useTheme(
  (state) => state.setTheme
)

function changeTheme() {
  setTheme('ocean')
}

  return (

    <header className="flex justify-between items-center bg-(--color-bg-primary) px-5 pt-4 pb-10 shell-top">
      
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
          onClick={changeTheme}
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm text-gray-600">foto</span>
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