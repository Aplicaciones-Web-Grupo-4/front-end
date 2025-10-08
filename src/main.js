import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'

// PrimeVue styles
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

//leaflet styles
import "leaflet/dist/leaflet.css";

// PrimeFlex (para las utilidades de layout)
import 'primeflex/primeflex.css'

import Button from 'primevue/button'
import Avatar from 'primevue/avatar'

const app = createApp(App)

app.use(PrimeVue)
app.use(router)

app.component('Button', Button)
app.component('Avatar', Avatar)
app.component

app.mount('#app')
