import { createRouter, createWebHistory } from 'vue-router'

// Importación directa de vistas
import Home from '../views/Home.vue'
import Events from '../views/Events.vue'
import Search from '../views/Search.vue'
import SignUp from '../views/SignUp.vue'
import Publishment from '../views/Publishment.vue'
import Tickets from '../views/Tickets.vue'

const routes = [
    // Redirección por defecto
    { path: '/', redirect: '/user/home' },

    // Rutas del panel de usuario
    { path: '/user/home', name: 'user-home', component: Home },
    { path: '/user/events', name: 'user-events', component: Events },
    { path: '/user/tickets', name: 'user-tickets', component: Tickets },
    { path: '/user/search', name: 'user-search', component: Search },
    { path: '/signup', name: 'user-signup', component: SignUp },
    { path: '/user/publishment/:id', name: 'user-publishment', component: Publishment, props: true}
]

// Exportamos SOLO el arreglo de rutas (no el router completo)
export default routes
