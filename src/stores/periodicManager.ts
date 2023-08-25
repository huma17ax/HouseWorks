import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

import type { Periodic } from '@/types'

import {
  setDoc,
  addDoc,
  doc,
  getFirestore,
  collection,
  deleteDoc,
  getDocs
} from 'firebase/firestore'

export const usePeriodicManager = defineStore('periodicManager', () => {
  const periodics: Ref<Periodic[]> = ref([])

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
      })
    } else {
      // create periodic

      const item: any = { ...periodic }
      delete item.id
      addDoc(collection(database, 'periodics'), item).then((docRef) => {
        periodic.id = docRef.id
        periodics.value.push(periodic)
      })
    }
  }

  function deletePeriodic(periodic: Periodic) {
    if (periodic.id) {
      deleteDoc(doc(database, 'periodics', periodic.id)).then(() => {
        const idx = periodics.value.findIndex((elem) => elem.id == periodic.id)
        delete periodics.value[idx]
      })
    }
  }

  return { periodics, savePeriodic, deletePeriodic }
})
