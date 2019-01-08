<template>
 <ul>
                             <li v-for="x in value">
                            <categories v-bind:isleft="isleft"  class="item" :model="x" v-on:myevent="doSomething">
                            </categories>
                        </li>   
                                        {{selectedId}}
                      </ul>
      
</template>
<script>
import categories from './Categories'
export default {
  name: 'basecat',
  data () {
    return {
        selectedId :0
      }
  },
    props: {
        value: {},
        isleft : {
          type: Boolean,
          default: true
        }

      },
  components:{
    categories,
  },
  methods:{
    doSomething: function (id) {
        this.selectedId = id;
        },
  }
}
</script>
<style scoped>

  ul {
    list-style-position: outside;
    list-style-type: dot;
    text-transform: capitalize;
    padding-left: 2em;
    cursor : pointer;
 
  }
a{
    text-align: left;
}
  .nav-link{
    padding: 0em;
    
  }  
  /* Second Level */
  ul ul{
    padding-left: 1em;
  }
  
  /* Third Level */
  ul ul ul{
    padding-left: 2em;
  }
 .bold {
  font-weight: bold;
}
.selected {
  color:blue;
}
</style>