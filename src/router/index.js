import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import signin from '@/components/Signin'
import signup from '@/components/Signup'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/signin',
      name: 'Signin',
      component: signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: signup
    },

  ]
})
