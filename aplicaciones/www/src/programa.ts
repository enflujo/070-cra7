import { createApp } from 'vue';
import Aplicacion from './Aplicacion.vue';
import { createPinia } from 'pinia';

const pinia = createPinia();
const aplicacion = createApp(Aplicacion);

aplicacion.use(pinia);

aplicacion.mount('#aplicacion');
