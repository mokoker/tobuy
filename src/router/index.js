import Vue from 'vue'
import Router from 'vue-router'
import Megatable from '@/components/Megatable'
import signin from '@/components/Signin'
import signup from '@/components/Signup'
import newitem from '@/components/NewItem'
import messages from '@/components/Messages'
import myposts from '@/components/MyPosts'
import detail from '@/components/Detail'
import 'font-awesome/css/font-awesome.css';
import 'bootstrap';
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      alias:'/m',
      name: 'Megatable',
      component: Megatable,
      props :(route) =>({search:route.query.s})
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
    {
      path: '/my',
      name: 'myposts',
      component: myposts,
    },
    {
      path: '/d',
      name: 'Detail',
      component: detail,
      props :(route) =>({id:parseInt(route.query.id)})
    },
  ]
})
