<script setup lang="ts">

import type { ApparentItem } from '@/types'

const props = defineProps<{
  task: ApparentItem
}>()

const emit = defineEmits<{
  clickMenu: []
}>()

</script>

<template>
  <div class="common-container task-container" v-if="task.type == 'TASK'">
    <span class="title-task">{{ task.title }}</span>
    <div class="menu-button menu-button-task" @click="$emit('clickMenu')"></div>
  </div>
  <div class="common-container event-container" v-if="task.type == 'EVENT'">
    <span class="title-event">{{ task.title }}</span>
    <div class="menu-button menu-button-event" @click="$emit('clickMenu')"></div>
  </div>
</template>

<style scoped>
.common-container {
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
  user-select: none;
  border-radius: 0.375rem;
}

.task-container {
  height: 3rem;
  background-color: rgb(241 245 249);
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
}

.event-container {
  height: 1.75rem;
  background-color: rgb(100 116 139);
}

.title-task {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.title-event {
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: rgb(248 250 252);
}

.menu-button {
  border-radius: 9999px;
  width: 1rem;
  height: 1rem;
  position: absolute;
  right: 0.75rem;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  cursor: pointer;
}

.menu-button-task {
  background-color: rgb(100 116 139);
}

.menu-button-event {
  background-color: white;
}
</style>