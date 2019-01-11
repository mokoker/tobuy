<template>
<div>
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"> 
                    <div class="container-fluid">        
                        <datatable v-show="addn"
                                    :data="items"
                                    :columns="gridColumns">
                                  </datatable>        
                          <newitem  v-show="!addn" v-bind:categories = "cats" >
                            
                           </newitem>            
                    </div>
                </div>   
                  <button type="button" v-on:click="addn = !addn">Click Me!</button>
            </div>
</template>

<script>
import categories from './Categories'
import datatable from './DataTable'
import newitem from './NewItem'
import basecategory from './BaseCategory'
export default {
  name: 'Main',
  data () {
    return {
        page:1,
        items: [{name : "x"},{name:"y"},{name:"z"}],
        cats : [{name : "initializing"}],
        searchQuery: '',
        searchText :'',
        addn : false,
        gridColumns: [ 'title','message','posterName','cityName','price','postDate'],

      }
  },
  components:{
    categories,
    basecategory,
    datatable,
    newitem
  },
  methods :{
       getX(page =1,category = 0 )
        {
          fetch(`http://localhost:63419/api/X/SearchX?Page=${page}&CategoryId=${category}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.items = data;
          });
        },
        checkEnter()
        {
          if(this.searchText==="")
            return;
          this.$root.$emit('change');
          fetch(`http://localhost:63419/api/X/DeepSearch?Page=${this.page}&Text=${this.searchText}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.items = data;
          });
        }
  },
    created :function()
       {
          this.$root.$on('change', (id) => {
          console.log(this.addn);
          this.$set(this, 'addn', true);
          this.getX(1,id);
          });
        fetch('http://localhost:63419/api/Categories/1')
        .then((res) => res.json())
        .then((data) => {
          console.log(data.children);
          this.cats = data.children;
        });
        this.getX(this.page);
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
