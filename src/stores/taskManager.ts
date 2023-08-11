import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

import type { Task } from '../types'

export const useTaskManager = defineStore('taskManager', () => {
  const today_datetime = new Date()
  const today_date = new Date(
    today_datetime.getFullYear(),
    today_datetime.getMonth(),
    today_datetime.getDate()
  )

  const tasks: Ref<Task[]> = ref([
    {
      title: 'test',
      date: today_date,
      type: 'TASK',
      id: 'asdlflashdfljh'
    }
  ])

  return { tasks }
})
