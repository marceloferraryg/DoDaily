import  FilterPeriod  from './FilterPeriod'
import  FilterCategory  from './FilterCategory'

type Props = {
  period: string
  category: string
  setPeriod: (value: string) => void
  setCategory: (value: string) => void
}

export default function TaskFilters() {
  return (
    <div className="flex flex-col w-full p-5 gap-5">

      <section className=''>
        <h3 className="mb-2 text-lg font-bold text-(--color-text-primary)">
          Período
        </h3>

        <FilterPeriod />
      </section>

      <section className=''>
        <h3 className="mb-2 text-lg font-bold text-(--color-text-primary)">
          Categoria
        </h3>

        <FilterCategory />
      </section>

    </div>
  )
}