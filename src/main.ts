import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import vSelect from 'vue-select'

import '@/firebase'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.component('v-select', vSelect)

app.mount('#app')
