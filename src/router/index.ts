import { createWebHistory, createRouter } from 'vue-router'


import StopsList from '../views/public/StopsList.vue'
import Detail from '../views/public/StopDetail.vue'
import Admin from '../views/admin/Dashboard.vue'

const routes = [
  { path: '/', redirect: '/stops' },
  { path: '/stops', component: StopsList },
  { path: '/stops/:id', name: 'Detail', component: Detail },
  { path: '/admin', component: Admin}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
