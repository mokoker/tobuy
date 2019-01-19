<template>
<div> 
 
        <megatable/>



  <button type="button"  class="btn btn-primary" v-on:click="newPost">Ilan Gonder</button>
</div>
</template>

<script>
import datatable from './DataTable'
import newitem from './NewItem'
import megatable from './MegaTable'
export default {
  name: 'Main',
  data () {
    return {
        page:1,
        items: [{name : "x"},{name:"y"},{name:"z"}],
        gridColumns: [ 'title','message','posterName','cityName','price','postDate'],
      }
  },
  components:{
    datatable,
    newitem,
    megatable
  },
  methods :{
       getX(page =1,category = 0 )
        {
           this.$router.push('/');
          fetch(`http://localhost:63419/api/X/SearchX?Page=${page}&CategoryId=${category}`)
          .then((res) => res.json())
          .then((data) => {
            console.log('getx'+category);
            this.items = data;
          });
        },
        search(searchText)
        {
          if(searchText==="")
            return;
          this.$router.push('/');
          fetch(`http://localhost:63419/api/X/DeepSearch?Page=${this.page}&Text=${this.searchText}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.items = data;
          });
        },
        newPost()
        {
          this.$router.push('new');
        },
  },
      created :function()
       {
          this.$root.$on('change', (id) => {
            this.getX(1,id);
          });
           this.$root.$on('search', (searchText) => {
            this.search(searchText);
          });
       }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    font-size: .875rem;
  }
  
  .feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
  }
  
 
  
  /*
   * Content
   */
  
  [role="main"] {
    padding-top: 48px; /* Space for fixed navbar */
  }
  
  /*
   * Navbar
   */
  
  .navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, .25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
  }
  
  .navbar .form-control {
    padding: .75rem 1rem;
    border-width: 0;
    border-radius: 0;
  }
  
  .form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, .1);
    border-color: rgba(255, 255, 255, .1);
  }
  
  .form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
  }



  
</style>
