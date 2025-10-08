import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: { template: '<h1>Home</h1>' } },
    { path: '/dashboard', component: { template: '<h1>Dashboard Organizador</h1>' } },
    {
        path: '/create-event',
        name: 'create-event',
        component: () => import('./organizer/pages/create-event.vue')
    },
    {
        path: '/events',
        name: 'events',
        component: () => import('./organizer/pages/events.vue')
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
