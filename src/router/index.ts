import { createWebHistory, createRouter } from 'vue-router'

<<<<<<< HEAD
import Detail from '../sites/StopDetail.vue'
import App from '../sites/App.vue'
import Stops from '../sites/StopList.vue'

=======
import StopsList from '../sites/StopsList.vue'
import Detail from '../sites/Detail.vue'
>>>>>>> 70f3f281848d9982beaea1eba756131523535f7b

const routes = [
  { path: '/', redirect: '/stops' },
  { path: '/stops', component: StopsList },
  { path: '/stops/:id', name: 'Detail', component: Detail },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
