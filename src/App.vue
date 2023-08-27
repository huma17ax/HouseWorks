<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from './views/HeaderView.vue'
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
