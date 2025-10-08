import { createRouter, createWebHistory } from 'vue-router'

// Importación directa de vistas
import Home from '../views/Home.vue'
import Events from '../views/Events.vue'
import Search from '../views/Search.vue'
import SignUp from '../views/SignUp.vue'

const routes = [
    // Redirección por defecto
    { path: '/', redirect: '/user/home' },

    // Rutas del panel de usuario
    { path: '/user/home', name: 'user-home', component: Home },
    { path: '/user/events', name: 'user-events', component: Events },
    { path: '/user/search', name: 'user-search', component: Search },
    { path: '/user/signup', name: 'user-signup', component: SignUp }
]

// Exportamos SOLO el arreglo de rutas (no el router completo)
export default routes
