// --- Rutas de Organizer / Emprendedor ---
import Home from '../views/Home.vue'
import Entrepreneur from '../metrics/presentation/entrepreneur-metrics.vue'
import StandsList from '../stands/presentation/views/stands-list.vue'
import StandForm from '../stands/presentation/views/stand-form.vue'

// --- Lazy load de Organizer Pages ---
const CreateEvent = () => import('../organizer/pages/create-event.vue')
const Events = () => import('../organizer/pages/events.vue')

export default [
    // Sección Emprendedor
    { path: '/org/entrepreneur', name: 'org-entrepreneur', component: Entrepreneur },
    { path: '/org/register-stands', name: 'org-register-stands', component: StandsList },
    { path: '/org/register-stands/new', name: 'org-stand-new', component: StandForm },
    { path: '/org/register-stands/:id/edit', name: 'org-stand-edit', component: StandForm },

    // Sección Organizer
    { path: '/org/dashboard', name: 'org-dashboard', component: { template: '<h1>Dashboard Organizador</h1>' } },
    { path: '/org/create-event', name: 'org-create-event', component: CreateEvent },
    { path: '/org/events', name: 'org-events', component: Events }
]
