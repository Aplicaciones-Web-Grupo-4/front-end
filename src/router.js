import { createRouter, createWebHistory } from 'vue-router';

// --- Rutas de Entrepreneur & Stands ---
import Home from './views/Home.vue';
import Entrepreneur from './views/Entrepreneur.vue';
import StandsList from './stands/presentation/views/stands-list.vue';
import StandForm from './stands/presentation/views/stand-form.vue';

// --- Lazy load de Organizer Pages ---
const CreateEvent = () => import('./organizer/pages/create-event.vue');
const Events = () => import('./organizer/pages/events.vue');

const routes = [
    // Rutas generales / home
    { path: '/', name: 'home', component: Home },

    // Sección Emprendedor
    { path: '/entrepreneur', name: 'entrepreneur', component: Entrepreneur },
    { path: '/register-stands', name: 'register-stands', component: StandsList },
    { path: '/register-stands/new', name: 'stand-new', component: StandForm },
    { path: '/register-stands/:id/edit', name: 'stand-edit', component: StandForm },

    // Sección Organizer
    { path: '/dashboard', name: 'dashboard', component: { template: '<h1>Dashboard Organizador</h1>' } },
    { path: '/create-event', name: 'create-event', component: CreateEvent },
    { path: '/events', name: 'events', component: Events },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
