<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

import type { Task } from '@/types'

const props = defineProps<{
  init: Task
}>()
const emit = defineEmits<{
  close: [],
  update: [task: Task]
}>()

const editingTask: Ref<Task> = ref({ title: "", date: new Date(), type: "", id: undefined })

onMounted(() => {
  editingTask.value = props.init
})

</script>

<template>
  <div class="whole">
    <div class="background"></div>
    <div class="modal-container">
      <div class="modal-row">
        <span class="modal-row-title">タイトル</span>
        <input class="modal-row-input" v-model="editingTask.title">
      </div>
      <div class="modal-row">
        <span class="modal-row-title">日付</span>
        <input disabled class="modal-row-input" v-model="editingTask.date">
      </div>
      <v-select :searchable="false" :options="['TASK']" v-model="editingTask.type" disabled></v-select>
      <div class="buttons-wrapper">
        <button class="cancel-button" @click="$emit('close')">キャンセル</button>
        <button class="save-button" @click="$emit('update', editingTask), $emit('close')">保存</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.whole {
  position: fixed;
  width: 100%;
  top: 40vh;
  max-width: 36rem;
}

.background {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  position: relative;
  width: 100%;
  height: 12rem;
  background-color: white;
  border-color: black;
  border-width: 4px;
}

.modal-row {
  width: 100%;
  padding: 0.5rem;
  display: flex;
}

.modal-row-title {
  flex-grow: 1;
}

.modal-row-input {
  background-color: rgb(226, 232, 240);
  outline: none;
  flex-grow: 1;
  min-width: 80%;
}

.buttons-wrapper {
  position: absolute;
  width: 100%;
  text-align: end;
  bottom: 0;
  padding: 0.5rem;
}

.cancel-button {
  border: 2px solid black;
  border-radius: 0.375rem;
  height: 2rem;
  width: 6rem;
  margin-right: 0.5rem;
  cursor: pointer;
}

.save-button {
  background-color: rgb(100, 116, 139);
  color: rgb(248 250 252);
  border-radius: 0.375rem;
  height: 2rem;
  width: 6rem;
  cursor: pointer;
}
</style>

<style>
@import "vue-select/dist/vue-select.css";
</style>