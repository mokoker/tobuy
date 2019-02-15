import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    cats: localStorage.getItem('cats'),
    status: '',
    id:localStorage.getItem('id') || 0,
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || {}
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, response) {
      state.status = 'success'
      state.token = response.token
      state.user = response.userName
      state.id = response.id
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', response.userName)
      localStorage.setItem('id', response.id)
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.user = ''
      localStorage.setItem('token', '')
      localStorage.setItem('user', '')
      localStorage.setItem('id', '')
    },
    setcats(state, categories) {
      state.cats =  JSON.stringify(categories);
      localStorage.setItem('cats', state.cats);
    }
  },
  actions: {
  
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    name: state => state.user,
    id: state => state.id,
    categories: state =>{ 
      console.log(state.cats)
      try{
        if(state.cats != undefined)
        {
      return JSON.parse(state.cats);
      }
      else
      {
        return null;
      }
    }
      catch(err){
        console.log(err)
        return null;
      }
    }
  }

})