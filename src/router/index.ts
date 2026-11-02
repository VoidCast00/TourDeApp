import { createWebHistory, createRouter } from 'vue-router'


import StopsList from '../views/public/StopsList.vue'
import Detail from '../views/public/StopDetail.vue'
import Admin from '../views/admin/Dashboard.vue'
import CRUDstops from '@/views/admin/CRUDstops.vue'
import Create from '@/views/admin/CreateStop.vue'
import EditStop from '@/views/admin/EditStop.vue'
import Login from '@/views/Login.vue'

const routes = [
  { path: '/', redirect: '/stops' },
  { path: '/stops', component: StopsList },
  { path: '/stops/:id', name: 'Detail', component: Detail },
  { path: '/admin', component: Admin},
  { path: '/admin/stops', component: CRUDstops},
  { path: '/admin/stops/:id/edit', name: 'Edit', component: EditStop },
  { path: '/admin/create', component: Create},
  { path: '/login', component: Login },

]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
