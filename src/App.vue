<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from './views/HeaderView.vue'
import { onMounted } from 'vue'
import { usePeriodicManager } from './stores/periodicManager'
import { useTaskManager } from './stores/taskManager'

const taskManager = useTaskManager()
const periodicManager = usePeriodicManager()

onMounted(() => {
  periodicManager.periodicCreateTasks()
  taskManager.deleteOldTasks()
})
</script>

<template>
  <HeaderView class="header"></HeaderView>
  <RouterView class="body" />
</template>

<style scoped>
.header {
  height: 3rem;
}

.body {
  height: calc(100vh - 3rem);
  overflow-y: scroll;
}

.body::-webkit-scrollbar {
  display: none;
}
</style>
