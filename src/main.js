// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { store } from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifications from 'vue-notification'
require('jquery');
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
library.add(faCoffee)
library.add(faMinusCircle)
library.add(faKeyboard)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Notifications)
const axiosConfig = {
  baseURL: 'http://localhost:63419/api',
  timeout: 30000,
  };
  
Vue.prototype.$axios = axios.create(axiosConfig)
Vue.store= Vue.prototype.store = {baseUrl : 'http://localhost:8080' };

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
