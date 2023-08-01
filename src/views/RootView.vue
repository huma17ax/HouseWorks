<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

const days: Ref<Date[]> = ref([])

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
</script>

<template>
  <div class="page-container">
    <div class="day-container" v-for="(day, idx) in days" :key="idx">
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  max-width: 36rem;
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
</style>
