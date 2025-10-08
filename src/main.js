import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import i18n from './i18n.js';
import pinia from './pinia.js';

// PrimeVue y tema Material
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';

// Estilos generales
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@primeuix/themes/material';
import './styles/nh-theme.css';

// Estilos Leaflet (solo si usas mapas)
import "leaflet/dist/leaflet.css";

// ✅ Importaciones correctas de PrimeVue (una por una)
import Button from 'primevue/button';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import Avatar from 'primevue/avatar';
import Menubar from 'primevue/menubar';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';

// Servicios
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import ConfirmationService from 'primevue/confirmationservice';

createApp(App)
    .use(PrimeVue, { ripple: true, theme: { preset: Material, options: { darkModeSelector: false }}})
    .use(router)
    .use(i18n)
    .use(pinia)
    .use(ToastService)
    .use(DialogService)
    .use(ConfirmationService)
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-data-table', DataTable)
    .component('pv-column', Column)
    .component('pv-dropdown', Dropdown)
    .component('pv-avatar', Avatar)
    .component('pv-menubar', Menubar)
    .component('pv-toast', Toast)
    .component('pv-confirm-dialog', ConfirmDialog)
    .mount('#app');
