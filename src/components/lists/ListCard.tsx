import { List } from "@/types/lists"

type PropsListCard = {
    list: List
}


export default function ListCard({list}: PropsListCard) {
    return (
        <div className="flex flex-col w-full h-80 bg-(--color-bg-task) rounded-3xl shadow-md 
                            transition-all active:scale-[0.95] cursor-pointer px-3 py-1">
           
           <div className="flex w-full h-16 justify-center items-center
                            border-b border-(--color-border) px-2">
                 <span className="text-sm font-medium text-center line-clamp-2 leading-5">
                    {list.title}
                 </span> 
           </div>

           <div className="flex flex-col pt-2 w-full h-full">
                <span>item 01</span>
                <span>item 01</span>
                <span>item 01</span>
                <span>item 01</span>
                <span>item 01</span>
                <span>item 01</span>
                <span>item 01</span>
           </div>
           
        </div>
    )
}