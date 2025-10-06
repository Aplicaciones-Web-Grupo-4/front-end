import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home.vue';
import Entrepreneur from './views/Entrepreneur.vue';


import StandsList from './stands/presentation/views/stands-list.vue';
import StandForm  from './stands/presentation/views/stand-form.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/',                      name: 'home',             component: Home },
        { path: '/entrepreneur',          name: 'entrepreneur',     component: Entrepreneur },
        { path: '/register-stands',       name: 'register-stands',  component: StandsList },
        { path: '/register-stands/new',   name: 'stand-new',        component: StandForm },
        { path: '/register-stands/:id/edit', name: 'stand-edit',    component: StandForm }


    ]
});

export default router;
