import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import nice2cuUI from 'nice2cu-ui';

const app = createApp(App);

app.use(router);
app.use(nice2cuUI);

app.mount('#app');
