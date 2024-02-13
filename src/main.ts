
import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import createPinia from "./plugin/createPinia"

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

// vue会自动调用install方法 注入app的
// const pinia = createPinia()
console.log(pinia)
// app.use(pinia)
app.use(router)

app.mount('#app')
