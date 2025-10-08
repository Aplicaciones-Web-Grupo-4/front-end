import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Saved from '../views/Saved.vue'
import Search from "../views/Search.vue";
import SignUp from "../views/SignUp.vue";
import Events from '../views/Events.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/events', component: Events },
    { path: "/search", component: Search },
    { path: "/signup", component: SignUp },
    {
        path: '/events',
        name: 'events',
        component: () => import('../views/Events.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;