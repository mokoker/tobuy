// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { store } from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faClock,faMinusCircle,faKeyboard ,faUserCircle, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifications from 'vue-notification'
require('jquery');
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
library.add(faCoffee)
library.add(faMinusCircle)
library.add(faKeyboard)
library.add(faClock);
library.add(faEnvelope);
library.add(faUserCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Notifications)
const axiosConfig = {
  baseURL: 'http://localhost:63419/api',
  timeout: 30000,
};

Vue.prototype.$axios = axios.create(axiosConfig)
Vue.store = Vue.prototype.store = { baseUrl: 'http://localhost:8080' };

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
      console.log(initial);
      var length = Object.keys(this.strs).length
      var count = 0;
      for (var key in this.strs) {
        count++;
        var vali = this.strs[key];
        if (vali == false)
          continue;
        initial = initial + key + '-' + vali;
        if (length > count) initial = initial + ",";
      }
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
