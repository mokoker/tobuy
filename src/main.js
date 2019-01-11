// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { store } from './store/store'
require('jquery');
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');

Vue.config.productionTip = false

const axiosConfig = {
  baseURL: 'http://localhost:63419/api',
  timeout: 30000,
  };
  
Vue.prototype.$axios = axios.create(axiosConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
