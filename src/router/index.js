import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from './user.routes'
import organizerRoutes from './organizer.routes'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...userRoutes,
        ...organizerRoutes,
        { path: '/', redirect: '/org/dashboard' }
    ]
})

export default router
