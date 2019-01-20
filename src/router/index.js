import Vue from 'vue'
import Router from 'vue-router'
import Megatable from '@/components/Megatable'
import signin from '@/components/Signin'
import signup from '@/components/Signup'
import newitem from '@/components/NewItem'
import messages from '@/components/Messages'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Megatable',
      component: Megatable
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
    {
      path: '/new',
      name: 'NewItem',
      component: newitem
    },
    {
      path: '/messages',
      name: 'Messages',
      component: messages
    },
  ]
})
