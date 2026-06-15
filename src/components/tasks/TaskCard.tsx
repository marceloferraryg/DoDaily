'use client'

import { Check } from 'lucide-react'

import { Task } from '@/types/tasks'

import { taskCategoriesMap } from '@/maps/TaskCategoryMap'
import { taskPriorityMap } from '@/maps/TaskPriorityMap'

type PropsTaskCard = {
  task: Task
  onShowNotes?: () => void
}

export function TaskCard({ task, onShowNotes }: PropsTaskCard) {

  const category =
    taskCategoriesMap[task.category] ||
    taskCategoriesMap.other

  const {
    color,
    icon: CategoryIcon,
  } = category

  const priority =
    taskPriorityMap[task.priority] ||
    taskPriorityMap.low

  return (
    <div
      className="
        flex items-stretch
        rounded-3xl overflow-hidden
        shadow-md
        active:scale-[0.98]
        transition-transform
      "
    >

      {/* LEFT */}
      <div className="flex shrink-0">

        <div
          className="
            flex w-6
            items-center justify-center
          "
          style={{
            backgroundColor: color,
          }}
        >
          <CategoryIcon
            size={18}
            color="white"
            style={{marginLeft: 3}}
          />
        </div>

        <div
          className="
            flex items-center justify-center
            px-3
            bg-(--color-bg-task)
          "
        >
          <div
            className={`
              flex h-6 w-6
              items-center justify-center
              rounded-full
             
              transition-colors
              ${
                task.done
                  ? ''
                  : 'border border-(--color-border)'
              }
            `}
          >
            {task.done && (
              <Check
                size={24}
                strokeWidth={3}
                className="text-(--color-success)"
              />
            )}
          </div>
        </div>
      </div>

      {/* CENTER */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onShowNotes?.()
        }}
        className="
          flex flex-1 min-w-0
          items-center
          bg-(--color-bg-task)
          py-3
          text-left
        "
      >
        <p
          className={`
            truncate
            text-sm
            leading-5
            ${
              task.done
                ? 'line-through text-(--color-text-muted)'
                : 'font-medium text-(--color-text-primary)'
            }
          `}
        >
          {task.title}
        </p>
      </button>

      {/* RIGHT */}
      <div
        className="
          flex shrink-0 items-center gap-2
          bg-(--color-bg-task)
          pl-2 pr-3
        "
      >

        {/* TIME */}
        <div className="w-11 text-right">
          {task.time && (
            <span
              className="
                text-sm
                text-(--color-text-muted)
              "
            >
              {task.time}
            </span>
          )}
        </div>

        {/* PRIORITY */}
        <div
          className="
            flex w-5
            justify-center
          "
        >
          <span
            className="
              text-lg font-bold
              text-(--color-text-primary)
            "
          >
            {priority.icon}
          </span>
        </div>
      </div>
    </div>
  )
}