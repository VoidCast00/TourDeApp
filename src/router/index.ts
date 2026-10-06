import { createMemoryHistory, createRouter } from 'vue-router'


import Detail from '../sites/StopDetail.vue'
import App from '../sites/App.vue'
import Stops from '../sites/StopList.vue'


const routes = [
  { path: '/stops', component: Stops },
  { path: '/stops/:id', name: 'Detail', component: Detail },
  { path: '/', component: App },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})