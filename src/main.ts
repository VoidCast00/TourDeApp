import { createApp } from 'vue'
import {router} from './router/index.ts'
import App from './sites/Stops.vue'
import './style.css'

createApp(App).use(router).mount('#app')
