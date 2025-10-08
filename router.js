import { createRouter, createWebHistory } from 'vue-router'
import Home from "./src/views/Home.vue";
import Events from "./src/views/Events.vue";
import Search from "./src/views/Search.vue";
import SignUp from "./src/views/SignUp.vue";


const routes = [
    { path: '/', redirect: '/home' },
    { path: '/user/home', component: Home },
    { path: '/user/events', component: Events },
    { path: "/user/search", component: Search },
    { path: "/user/signup", component: SignUp },
    {
        path: '/user/events',
        name: 'events',
        component: () => import('./src/views/Events.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;