import { createApp } from 'vue'
import {router} from './router/index.ts'
import App from './sites/StopList.vue'
import './style.css'

createApp(App).use(router).mount('#app')
