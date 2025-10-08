const StandsList = () => import('./views/stands-list.vue');
const StandForm  = () => import('./views/stand-form.vue');

export default [
    { path: '/org/stands',         name: 'org-stands-list', component: StandsList, meta: { title: 'Stands' } },
    { path: '/org/stands/new',     name: 'org-stand-new',   component: StandForm,  meta: { title: 'New Stand' } },
    { path: '/org/stands/:id/edit',name: 'org-stand-edit',  component: StandForm,  meta: { title: 'Edit Stand' } }
];
