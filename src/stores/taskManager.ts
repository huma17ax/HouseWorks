import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

import type { Task } from '../types'

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  deleteDoc
} from 'firebase/firestore/lite'

export const useTaskManager = defineStore('taskManager', () => {
  const tasks: Ref<Task[]> = ref([])

  const database = getFirestore()
  getDocs(collection(database, 'tasks')).then((snapshot) => {
    snapshot.forEach((doc) => {
      tasks.value.push({
        title: doc.data().title,
        date: new Date(doc.data().date),
        type: doc.data().type,
        memo: doc.data().memo,
        id: doc.id,
        refer: doc.data().refer
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

  function deleteTask(task: Task) {
    if (task.id) {
      deleteDoc(doc(database, 'tasks', task.id)).then(() => {
        const idx = tasks.value.findIndex((elem) => elem?.id == task.id)
        delete tasks.value[idx]
      })
    }
  }

  return { tasks, saveTask, deleteTask }
})
