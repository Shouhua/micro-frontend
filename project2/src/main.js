import { createApp } from 'vue'
import App from './App.vue'
import router from './app.router.js'
import '../runtime.js'

const app = createApp(App)

app.use(router)

app.mount('#app')