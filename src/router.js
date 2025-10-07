import { createRouter, createWebHistory } from 'vue-router'


import Home from '@/views/Home.vue'
import Entrepreneur from '@/views/Entrepreneur.vue'


import StandsList from '@/stands/presentation/views/stands-list.vue'
import StandForm from '@/stands/presentation/views/stand-form.vue'


// ✅ Lazy-loaded Event Detail
const EventDetail = () => import('@/events/presentation/views/event-detail.vue')


export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/entrepreneur', name: 'entrepreneur', component: Entrepreneur },


// Stands
        { path: '/register-stands', name: 'register-stands', component: StandsList },
        { path: '/register-stands/new', name: 'stand-new', component: StandForm },
        { path: '/register-stands/:id/edit', name: 'stand-edit', component: StandForm },


// Events (slug optional)
        { path: '/events/:slug?', name: 'events', component: () => import('@/events/presentation/views/event-detail.vue') },


// 404 fallback (optional)
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
})