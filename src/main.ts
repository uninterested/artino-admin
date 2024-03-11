import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18 from '~/locale'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(i18)
// app.use(router)

app.mount('#app')
