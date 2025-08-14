import naive from 'naive-ui'
import VueApexCharts from "vue3-apexcharts";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)
app.use(VueApexCharts)

app.mount('#app')
