import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/css/index.css'
import 'vant/lib/index.css'
import vant from 'vant'
import mitt from 'mitt'
const pinia = createPinia()
const app = createApp(App)
const bus = mitt()
app.config.globalProperties.$bus = bus
app.use(router).use(vant).use(pinia).mount('#app')
