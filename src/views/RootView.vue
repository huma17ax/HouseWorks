<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

import draggable from 'vuedraggable'

import TaskItem from '@/components/TaskItem.vue'
import EditTask from '@/components/EditTask.vue'

import { useTaskManager } from '@/stores/taskManager'
import type { Task } from '@/types'

const days: Ref<Date[]> = ref([])
const openEditWindow: Ref<boolean> = ref(false)
const task4edit: Ref<Task> = ref({ title: "", date: new Date(), type: "", id: undefined })

const taskManager = useTaskManager()

onMounted(() => {
  const today_datetime = new Date()
  const today_date = new Date(
    today_datetime.getFullYear(),
    today_datetime.getMonth(),
    today_datetime.getDate()
  )
  for (let offset = -31; offset <= 31; offset++) {
    let date = new Date(today_date.getTime())
    date.setDate(date.getDate() + offset)
    days.value.push(date)
  }
})

function openMenu(task: Task) {
  task4edit.value = task
  openEditWindow.value = true
}

function openNewMenu(date: Date) {
  task4edit.value = {
    title: "",
    date: date,
    type: "TASK",
    id: undefined
  }
  openEditWindow.value = true
}
function closeMenu() {
  openEditWindow.value = false
}

function updateTask(task: Task) {
  taskManager.saveTask(task)
}

function onEndDrag(date_to: Date, action: any) {
  if ("removed" in action) {
    // Nothing
  }
  else if ("added" in action) {
    const task: Task = action.added.element
    task.date = date_to
    updateTask(task)
  }
  else if ("moved" in action) {
    const task: Task = action.added.element
    task.date = date_to
    updateTask(task)
  }
}

</script>

<template>
  <div class="page-container">
    <div class="day-container" v-for="(day, idx) in days" :key="idx">
      <span class="day-title">
        {{ day.toLocaleDateString() }}
        <span class="menu-button" @click="openNewMenu(day)"></span>
      </span>
      <draggable :modelValue="taskManager.tasks.filter((task) => task.date.getTime() == day.getTime())" item-key="id"
        group="tasks" :move="() => { return true }" @change="onEndDrag(day, $event)" handle='.handle'>
        <template #item="{ element }">
          <div :class="{ 'handle': element.type == 'TASK' }">
            <TaskItem :task="element" @click-menu="openMenu(element)"></TaskItem>
          </div>
        </template>
      </draggable>
    </div>
    <EditTask v-if="openEditWindow" :init="task4edit" @close="closeMenu" @update="updateTask"></EditTask>
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