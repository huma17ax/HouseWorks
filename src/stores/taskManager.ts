import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

import type { Task } from '../types'

import { getFirestore, collection, doc, setDoc, addDoc, getDocs } from 'firebase/firestore/lite'

export const useTaskManager = defineStore('taskManager', () => {
  const tasks: Ref<Task[]> = ref([])

  const database = getFirestore()
  getDocs(collection(database, 'tasks')).then((snapshot) => {
    snapshot.forEach((doc) => {
      tasks.value.push({
        title: doc.data().title,
        date: new Date(doc.data().date),
        type: doc.data().type,
        id: doc.id
      })
    })
  })

  function saveTask(task: Task) {
    if (task.id) {
      // update task

      const item: any = { ...task }
      delete item.id
      item.date = item.date.toString()
      setDoc(doc(database, 'tasks', task.id), item).then(() => {
        const idx = tasks.value.findIndex((elem) => elem.id == task.id)
        tasks.value[idx] = task
      })
    } else {
      // create task

      const item: any = { ...task }
      delete item.id
      item.date = item.date.toString()
      addDoc(collection(database, 'tasks'), item).then((docRef) => {
        task.id = docRef.id
        tasks.value.push(task)
      })
    }
  }

  return { tasks, saveTask }
})
