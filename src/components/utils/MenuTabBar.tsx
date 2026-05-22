'use client'

import { usePathname, useRouter } from 'next/navigation'

import { menuTabBarMap, MenuTabBarTypes } from '@/maps/MenuTabBarMap'

export function MenuTabBar() {

  const pathname = usePathname()
  const router = useRouter()

  const currentPath = pathname.split('/')[1]

  const activeTab: MenuTabBarTypes = currentPath in menuTabBarMap
      ? (currentPath as MenuTabBarTypes)
      : 'home'

  const menuTabs = Object.values(menuTabBarMap)

  function handleTabClick( tab: MenuTabBarTypes ) {
    router.push(menuTabBarMap[tab].href)
  }

  return (
    <div
      className="
        absolute bottom-0 left-0 right-0
        z-100
        mx-5 
        mb-[calc(env(safe-area-inset-bottom)+20px)]
        flex items-center justify-around
        rounded-3xl
        bg-(--color-input-bg)/10 backdrop-blur-sm
        p-2
        shadow-[0_3px_10px_rgba(94,45,180,0.35)]
      "
    >
      {menuTabs.map((tab) => {
        const Icon = tab.icon

        const isActive =
          activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() =>
              handleTabClick(tab.id)
            }
            className={`
              flex flex-col
              items-center justify-center
              transition-all
              active:scale-95
              hover:scale-105
              
              ${
                isActive
                  ? 'text-(--color-primary)'
                  : 'text-(--color-text-muted)'
              }
            `}
          >
            <Icon
              size={isActive ? 24 : 20}
              strokeWidth={
                isActive ? 3 : 1.8
              }
              
            />

            <span
              className={`
                text-sm
                ${
                  isActive
                    ? 'font-bold'
                    : 'font-light'
                }
              `}
            >
              {tab.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}