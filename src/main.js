import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './styles/global.css';
import { revealDirective } from './directives/reveal.js';

const app = createApp(App);
app.directive('reveal', revealDirective);
app.use(router).mount('#app');
