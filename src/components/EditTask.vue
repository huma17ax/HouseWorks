<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

import type { Task, Periodic, ApparentItem } from '@/types'

const props = defineProps<{
  init: ApparentItem
}>()
const emit = defineEmits<{
  close: [],
  update: [item: ApparentItem]
  delete: []
}>()

const editingItem: Ref<ApparentItem> = ref({ title: "", date: new Date(), dow: "Sunday", type: "TASK", memo: "", id: undefined })

onMounted(() => {
  editingItem.value = Object.assign({}, props.init)
})

function confirmDelete() {
  if (confirm("削除しますか？")) {
    emit('delete')
    emit('close')
  }
}

</script>

<template>
  <div class="whole">
    <div class="background"></div>
    <div class="modal-container">
      <div class="modal-row">
        <span class="modal-row-title">タイトル</span>
        <input class="modal-row-input" v-model="editingItem.title">
      </div>
      <div class="modal-row">
        <span class="modal-row-title">日付</span>
        <input disabled class="modal-row-input" v-if="(editingItem as Task).date" v-model="(editingItem as Task).date">
        <input disabled class="modal-row-input" v-if="(editingItem as Periodic).dow"
          v-model="(editingItem as Periodic).dow">
      </div>
      <v-select :searchable="false" :options="['TASK', 'EVENT']" v-model="editingItem.type"></v-select>
      <textarea class="memo" v-model="editingItem.memo"></textarea>
      <div class="buttons-wrapper">
        <button class="delete-button" @click="confirmDelete()">削除</button>
        <button class="cancel-button" @click="$emit('close')">キャンセル</button>
        <button class="save-button" @click="$emit('update', editingItem), $emit('close')">保存</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.whole {
  position: fixed;
  width: 100%;
  top: 30vh;
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
  height: 20rem;
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

.memo {
  width: calc(100% - 1rem);
  height: 9rem;
  margin: 0.5rem;
  resize: none;
}

.buttons-wrapper {
  position: absolute;
  display: flex;
  width: 100%;
  text-align: end;
  bottom: 0;
  padding: 0.5rem;
}

.delete-button {
  border: 2px solid black;
  border-radius: 0.375rem;
  height: 2rem;
  width: 6rem;
  background-color: red;
  color: white;
  cursor: pointer;
}

.cancel-button {
  border: 2px solid black;
  border-radius: 0.375rem;
  height: 2rem;
  width: 6rem;
  margin-left: auto;
  cursor: pointer;
}

.save-button {
  background-color: rgb(100, 116, 139);
  color: rgb(248 250 252);
  border-radius: 0.375rem;
  height: 2rem;
  width: 6rem;
  margin-left: 0.5rem;
  cursor: pointer;
}
</style>

<style>
@import "vue-select/dist/vue-select.css";
</style>