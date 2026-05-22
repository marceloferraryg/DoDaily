
import { Trash2 } from "lucide-react"
import { List } from "@/types/lists"
import { useRouter } from "next/navigation"

type PropsListCard = {
    list: List
}


export default function ListCard({list}: PropsListCard) {

    const router = useRouter()
    return (
        <div
            onClick={() => router.push(`/list/${list.id}`)}
            className="
                relative
                flex flex-col
                w-full
                min-h-48
                overflow-hidden
                rounded-3xl
                bg-(--color-bg-task)
                p-3
                shadow-sm
                transition-all
                active:scale-[0.985]
                cursor-pointer
            "
            >
           <div
                className="
                    flex
                    min-h-12
                    items-center
                    justify-center
                    border-b
                    border-(--color-border)
                    px-2
                    pb-2
                "
                >
                 <span className="text-sm font-medium text-center line-clamp-2 leading-4 
                                    text-(--color-text-primary)">
                    {list.title}
                 </span> 
           </div>

           <div className="flex flex-col pt-2 w-full h-full">
                <span className="text-sm text-(--color-text-muted)">item 01</span>
                <span className="text-sm text-(--color-text-muted)">item 01</span>
                <span className="text-sm text-(--color-text-muted)">item 01</span>
                <span className="text-sm text-(--color-text-muted)">item 01</span>
                <span className="text-sm text-(--color-text-muted)">item 01</span>
                <span className="text-sm text-(--color-text-muted)">item 01</span>
                <span className="text-sm text-(--color-text-muted)">item 01</span>
                <span className="text-sm text-(--color-text-muted)">item 01</span>
                <span className="text-sm text-(--color-text-muted)">item 01</span>
                <span className="text-sm text-(--color-text-muted)">item 01</span>
              
           </div>

           
        </div>
    )
}