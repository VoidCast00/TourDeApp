import { createMemoryHistory, createRouter } from 'vue-router'

import App from '../sites/App.vue'


const routes = [
  { path: '/stops', component: App },
  { path: '/stops/detail/:id', component: App },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})