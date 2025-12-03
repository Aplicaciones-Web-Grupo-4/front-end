const StandsList = () => import('./views/stands-list.vue');
const StandForm  = () => import('./views/stand-form.vue');

export default [
    { 
      path: '/org/stands',         
      name: 'org-stands-list', 
      component: StandsList 
    },

    { 
      path: '/org/stands/:eventId/new',     
      name: 'org-stand-new',   
      component: StandForm  
    },

    { 
      path: '/org/stands/:eventId/:id/edit',
      name: 'org-stand-edit',  
      component: StandForm  
    }
];



