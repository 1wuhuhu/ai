import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes.js';
import './css/main.css' // 全局样式

const app = createApp(App);
app.use(router);
app.mount('#app');