import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import mosaicUI from 'mosaic-ui';

const app = createApp(App);

app.use(router);
app.use(mosaicUI);

app.mount('#app');
