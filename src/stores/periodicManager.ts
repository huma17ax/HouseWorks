import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

import { useTaskManager } from '@/stores/taskManager'
import { Periodic, Task } from '@/types'

import {
  setDoc,
  addDoc,
  doc,
  getFirestore,
  collection,
  deleteDoc,
  getDocs,
  getDoc
} from 'firebase/firestore'

export const usePeriodicManager = defineStore('periodicManager', () => {
  const periodics: Ref<Periodic[]> = ref([])

  const taskManager = useTaskManager()

  const database = getFirestore()
  getDocs(collection(database, 'periodics')).then((snapshot) => {
    snapshot.forEach((doc) => {
      periodics.value.push({
        title: doc.data().title,
        dow: doc.data().dow,
        type: doc.data().type,
        memo: doc.data().memo,
        id: doc.id
      })
    })
  })

  function savePeriodic(periodic: Periodic) {
    if (periodic.id) {
      // update periodic

      const item: any = { ...periodic }
      delete item.id
      setDoc(doc(database, 'periodics', periodic.id), item).then(() => {
        const idx = periodics.value.findIndex((elem) => elem.id == periodic.id)
        periodics.value[idx] = periodic

        const today_datetime = new Date()
        const today_date = new Date(
          today_datetime.getFullYear(),
          today_datetime.getMonth(),
          today_datetime.getDate()
        )
        taskManager.tasks.forEach((task) => {
          if (today_date.getTime() <= task.date.getTime() && task.refer == periodic.id) {
            task.title = periodic.title
            task.type = periodic.type
            task.memo = periodic.memo
            taskManager.saveTask(task)
          }
        })
      })
    } else {
      // create periodic

      const item: any = { ...periodic }
      delete item.id
      addDoc(collection(database, 'periodics'), item).then((docRef) => {
        periodic.id = docRef.id
        periodics.value.push(periodic)

        const today_datetime = new Date()
        const dows = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const today_date = new Date(
          today_datetime.getFullYear(),
          today_datetime.getMonth(),
          today_datetime.getDate()
        )
        for (let offset = 0; offset <= 31; offset++) {
          const date = new Date(today_date.getTime())
          date.setDate(date.getDate() + offset)
          if (dows[date.getDay()] == periodic.dow) {
            const task = new Task()
            task.title = periodic.title
            task.date = date
            task.type = periodic.type
            task.memo = periodic.memo
            task.refer = periodic.id
            taskManager.saveTask(task)
          }
        }
      })
    }
  }

  function deletePeriodic(periodic: Periodic) {
    if (periodic.id) {
      deleteDoc(doc(database, 'periodics', periodic.id)).then(() => {
        const idx = periodics.value.findIndex((elem) => elem?.id == periodic.id)
        delete periodics.value[idx]

        const today_datetime = new Date()
        const today_date = new Date(
          today_datetime.getFullYear(),
          today_datetime.getMonth(),
          today_datetime.getDate()
        )
        taskManager.tasks.forEach((task) => {
          if (today_date.getTime() <= task.date.getTime() && task.refer == periodic.id) {
            taskManager.deleteTask(task)
          }
        })
      })
    }
  }

  function periodicCreateTasks() {
    const today_datetime = new Date()
    const dows = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today_date = new Date(
      today_datetime.getFullYear(),
      today_datetime.getMonth(),
      today_datetime.getDate()
    )

    getDoc(doc(database, 'last_login', 'day')).then((snapshot) => {
      if (snapshot.exists()) {
        const c1 = new Date(snapshot.data().date)
        c1.setDate(c1.getDate() + 32)
        const c2 = new Date(today_date.getTime())
        c2.setDate(c2.getDate() - 31)
        const date = c1 < c2 ? c2 : c1
        const end = new Date(today_date.getTime())
        end.setDate(end.getDate() + 31)

        while (date <= end) {
          periodics.value.forEach((per) => {
            if (dows[date.getDay()] == per.dow) {
              const task = new Task()
              task.title = per.title
              task.date = new Date(date)
              task.type = per.type
              task.memo = per.memo
              task.refer = per.id as string
              taskManager.saveTask(task)
            }
          })

          date.setDate(date.getDate() + 1)
        }

        setDoc(doc(database, 'last_login', 'day'), { date: today_date.toString() })
      }
    })
  }

  return { periodics, savePeriodic, deletePeriodic, periodicCreateTasks }
})
