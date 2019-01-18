<template>
  <div id="app">
    <div class="ad">
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand  d-none d-md-block  col-sm-3 col-md-2 mr-0" to="/">karasayfa.com</router-link>
        <input class="form-control form-control-dark w-100" type="text" placeholder="Search"  v-model="searchText" v-on:keyup.enter="checkEnter()" aria-label="Search">
      <div id="navigation" class=" col-lg-1 col-md-2 text-nowrap">
        <ul class="navbar-nav">
            <li class="nav-item" v-show="!isLoggedIn">
              <router-link class="navbar-login text-white" to="signin">Sign In</router-link>
              <router-link class="navbar-login text-white" to="signup">Sign Up</router-link>
            </li>
             
        </ul>
         <a class="text-white" v-show="isLoggedIn"  v-on:click="signOut()">Cikis yap {{name}} </a>
         </div>
    </nav>
    <div class="container-fluid">
        <div class="row">
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">     
   
                      <basecategory v-bind:cats = "cats"/>
                      
                </div>
            </nav>
   
        </div>
    </div>
          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <router-view/>
          </main>
</div>

  </div>
</template>

<script>
import basecategory from './components/BaseCategory'
export default {
  name: 'App',
    data () {
    return {
        searchText :'',
      }
  },
   components:{
    basecategory,

  },
  computed:{
    isLoggedIn(){
      return  this.$store.getters.isLoggedIn
    },
    name(){
       return  this.$store.getters.name
    },
    cats(){
             return  this.$store.getters.categories
    }
  },
  methods:{
       checkEnter()
       {
             this.$root.$emit('search',this.searchText);
       },
        signOut()
        {
           this.$store.commit('logout');
        },
  },
    created :function()
       {

        fetch('http://localhost:63419/api/Categories/1')
        .then((res) => res.json())
        .then((data) => {
          console.log(data.children);
          this.$store.commit('setcats', data.children);
        });
         this.$root.$emit('change',1);
         var token = localStorage.getItem('token');
         if(token != '')
         {
         this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
         }
  }
}
</script>

<style>
 /*
   * Sidebar
   */
  
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 48px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  }
  
  .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }
  
  @supports ((position: -webkit-sticky) or (position: sticky)) {
    .sidebar-sticky {
      position: -webkit-sticky;
      position: sticky;
    }
  }
  
  .sidebar .nav-link {
    color: #333;
  }
  
  .sidebar .nav-link .feather {
    margin-right: 4px;
    color: #999;
  }
  
  .sidebar .nav-link.active {
    color: #007bff;
  }
  
  .sidebar .nav-link:hover .feather,
  .sidebar .nav-link.active .feather {
    color: inherit;
  }
  
  .sidebar-heading {
    font-size: .75rem;
    text-transform: uppercase;
  }
  .navbar-login{
    color:white;
  }
a { color: white; }

a:hover {
 cursor:pointer;
}

a+a { border-left: 1px solid #999 ;padding-left: 2px }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
