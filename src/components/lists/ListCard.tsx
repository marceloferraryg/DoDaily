import { List } from "@/types/lists"

type PropsListCard = {
    list: List
}


export default function ListCard({list}: PropsListCard) {
    return (
        <div className="w-40 h-80 bg-(--color-bg-task) rounded-3xl mb-4">
            <span>{list.title}</span>
        </div>
    )
}