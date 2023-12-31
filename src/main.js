import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from '../src/axios'
import testaxios from '../src/axios'
import VueCookies from 'vue-cookies'


createApp(App).use(store).use(router).mount('#app')
