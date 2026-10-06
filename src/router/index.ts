import { createMemoryHistory, createRouter } from 'vue-router'


import Detail from '../sites/Detail.vue'
import App from '../sites/App.vue'
import Stops from '../sites/Stops.vue'


const routes = [
  { path: '/stops', component: Stops },
  { path: '/stops/:id', name: 'Detail', component: Detail },
  { path: '/', component: App },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})