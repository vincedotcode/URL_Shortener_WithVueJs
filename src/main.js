import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import axios from 'axios'


const app = createApp(App);

app.config.globalProperties.$http = axios;

createApp(App).mount('#app')
