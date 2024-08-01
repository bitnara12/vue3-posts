import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import funcPlugins from './plugins/func';
import objPlugins from './plugins/obj';
import person from './plugins/person';

const app = createApp(App);
app.use(funcPlugins);
app.use(objPlugins, { name: 'bitnara' });
app.use(person);

app.use(router);
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';

// console.log(import.meta.env.MODE);
// console.log(import.meta.env.BASE_URL);
// console.log(import.meta.env.PROD);
// console.log(import.meta.env.DEV);
// console.log(import.meta.env.VITE_APP_API_URL);
