import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        cats : [{name : "initializing"}],
        status: '',
        token: localStorage.getItem('token') || '',
        user : localStorage.getItem('user') || {}
      },
      mutations: {
        auth_request(state){
          state.status = 'loading'
        },
        auth_success(state, response){
          state.status = 'success'
          state.token = response.token
          state.user = response.userName
          localStorage.setItem('token',response.token)
          localStorage.setItem('user',response.userName)
        },
        auth_error(state){
          state.status = 'error'
        },
        logout(state){
          state.status = ''
          state.token = ''
          state.user = ''
          localStorage.setItem('token','')
          localStorage.setItem('user','')
        },
        setcats(state,categories){
            state.cats = categories;
        }
      },
      actions: {
    
      },
      getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        name:state => state.user,
        categories:state=>state.cats
      }

})