import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import i18 from '~/locale'
import router from '~/router'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App)

app.use(createPinia())
app.use(i18)
app.use(router)
app.use(ArcoVue, {})
app.use(ArcoVueIcon)

app.mount('#app')
