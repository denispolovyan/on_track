import './assets/main.css'

import App from './App.vue'

import VueScrollTo from "vue-scrollto";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.directive("scroll-to", VueScrollTo);
app.use(router)

app.mount('#app')
