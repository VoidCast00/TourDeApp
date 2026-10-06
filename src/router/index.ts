import { createWebHistory, createRouter } from 'vue-router'


import StopsList from '../sites/StopsList.vue'
import Detail from '../sites/StopDetail.vue'

const routes = [
  { path: '/', redirect: '/stops' },
  { path: '/stops', component: StopsList },
  { path: '/stops/:id', name: 'Detail', component: Detail },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
