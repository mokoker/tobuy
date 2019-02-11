// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { store } from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faClock,faMinusCircle,faKeyboard ,faUserCircle, faEnvelope, faReply} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifications from 'vue-notification'
import * as config from './config'
global.jQuery = require('jquery');
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
library.add(faCoffee)
library.add(faMinusCircle)
library.add(faKeyboard)
library.add(faClock);
library.add(faEnvelope);
library.add(faUserCircle);
library.add(faReply);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Notifications)
const axiosConfig = {
  baseURL: config.apiHost,
  timeout: 30000,
};

Vue.prototype.$axios = axios.create(axiosConfig)
Vue.store = Vue.prototype.store = { baseUrl: config.client };

var $ = global.jQuery;
window.$ = $;
const myMixin = {
  data() {
    return {
      strs: {},
    };
  },
  created() {
    console.log("It works!")
  },
  methods: {
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key))
          return false;
      }
      return true;
    },

    routeme() {
      var initial = "";
      if (!this.isEmpty(this.strs)) {
        console.log('not empy');
        initial = "/?s=";
      }
      console.log(this.strs);
      var length = Object.keys(this.strs).length
      var count = 0;
      for (var key in this.strs) {
        count++;
        var vali = this.strs[key];
        if (vali == false)
          continue;
        initial = initial + key + '-' + vali;
        if (length > count) initial = initial + "_";
      }
      console.log('routing');
      this.$router.push(initial);
    },
    clearpath() {
      this.strs = {};
      this.$router.push('/')
    }
  }
}


new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  mixins: [myMixin]
})
