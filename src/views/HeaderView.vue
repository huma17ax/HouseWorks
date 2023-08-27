<script setup lang="ts">
import router from '@/router'

function redirectTo(path: string) {
  router.push(path)
}

</script>

<template>
  <div class="container">
    <div class="header-button">
      <span class="text" @click="redirectTo('task')">カレンダー</span>
    </div>
    <div class="header-button">
      <span class="text" @click="redirectTo('event')">定期設定</span>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  max-width: 36rem;
  margin: 0 auto;
}

.header-button {
  width: calc(50% - 0.4rem);
  height: calc(100% - 0.4rem);
  margin: 0.2rem;
  border-radius: 0.5rem;
  background-color: whitesmoke;
  border: 1px solid lightgray;
  cursor: pointer;
}

.text {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>