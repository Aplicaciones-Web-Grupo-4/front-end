const StandsList = () => import('./views/stands-list.vue');
const StandForm  = () => import('./views/stand-form.vue');

export default [
    { path: 'stands',         name: 'stands-list', component: StandsList, meta: { title: 'Stands' } },
    { path: 'stands/new',     name: 'stand-new',   component: StandForm,  meta: { title: 'New Stand' } },
    { path: 'stands/:id/edit',name: 'stand-edit',  component: StandForm,  meta: { title: 'Edit Stand' } }
];
