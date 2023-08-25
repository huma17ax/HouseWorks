<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

import draggable from 'vuedraggable'

import TaskItem from '@/components/TaskItem.vue'
import EditTask from '@/components/EditTask.vue'

import { usePeriodicManager } from '@/stores/periodicManager'
import type { ApparentItem, Dow, Periodic } from '@/types'

const dows: Dow[] = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

const openEditWindow: Ref<boolean> = ref(false)
const periodic4edit: Ref<Periodic> = ref({ title: "", dow: 'Sunday', type: "TASK", memo: "", id: undefined })

const periodicManager = usePeriodicManager()

function openMenu(periodic: Periodic) {
  periodic4edit.value = periodic
  openEditWindow.value = true
}

function openNewMenu(dow: Dow) {
  periodic4edit.value = {
    title: "",
    dow: dow,
    type: "TASK",
    memo: "",
    id: undefined
  }
  openEditWindow.value = true
}
function closeMenu() {
  openEditWindow.value = false
}

function updateTask(periodic: ApparentItem) {
  periodicManager.savePeriodic(periodic as Periodic)
}

function deleteTask() {
  periodicManager.deletePeriodic(periodic4edit.value)
}

function onEndDrag(dow_to: Dow, action: any) {
  if ("removed" in action) {
    // Nothing
  }
  else if ("added" in action) {
    const periodic: Periodic = action.added.element
    periodic.dow = dow_to
    updateTask(periodic)
  }
  else if ("moved" in action) {
    const periodic: Periodic = action.moved.element
    periodic.dow = dow_to
    updateTask(periodic)
  }
}

</script>

<template>
  <div class="page-container">
    <div class="day-container" v-for="(dow, idx) in dows" :key="idx">
      <span class="day-title">
        {{ dow }}
        <span class="menu-button" @click="openNewMenu(dow)"></span>
      </span>
      <div v-for="(elem, idx) in periodicManager.periodics.filter((per) => per.dow == dow && per.type == 'EVENT')"
        :key="idx">
        <TaskItem :task="elem" @click-menu="openMenu(elem)"></TaskItem>
      </div>
      <draggable :modelValue="periodicManager.periodics.filter((per) => per.dow == dow && per.type == 'TASK')"
        item-key="id" group="tasks" :move="() => { return true }" @change="onEndDrag(dow, $event)" handle='.handle'>
        <template #item="{ element }">
          <div :class="{ 'handle': element.type == 'TASK' }">
            <TaskItem :task="element" @click-menu="openMenu(element)"></TaskItem>
          </div>
        </template>
      </draggable>
    </div>
    <EditTask v-if="openEditWindow" :init="periodic4edit" @close="closeMenu" @update="updateTask" @delete="deleteTask">
    </EditTask>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  max-width: 36rem;
  margin: 0 auto;
}

.day-container {
  display: flex;
  flex-direction: column;
  max-width: 36rem;
  border-width: 1px;
  margin-top: 0.25rem;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
}

.day-title {
  display: flex;
  user-select: none;
}

.menu-button {
  position: relative;
  margin-left: auto;
  border-radius: 9999px;
  background: black;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}
</style>