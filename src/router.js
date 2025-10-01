import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: { template: '<h1>Home</h1>' } },
    { path: '/org/dashboard', component: { template: '<h1>Dashboard Organizador</h1>' } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
