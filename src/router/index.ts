import { createRouter, createWebHistory } from 'vue-router'
import TaskView from '../views/TaskView.vue'
import PeriodicView from '../views/PeriodicView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/task'
    },
    {
      path: '/task',
      name: 'task',
      component: TaskView
    },
    {
      path: '/event',
      name: 'event',
      component: PeriodicView
    }
  ]
})

export default router
