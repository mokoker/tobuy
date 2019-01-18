<template>
 <ul>
                             <li v-for="x in cats">
                            <categories v-bind:isleft="isleft"  class="item" :model="x" v-on:myevent="doSomething">
                            </categories>
                        </li>   
                                        {{value}}
                      </ul>
      
</template>
<script>
import categories from './Categories'
export default {
  name: 'basecategory',
  data () {
    return {
        value :0
      }
  },
    props: {
        isleft : {
          type: Boolean,
          default: true
        },
        cats:{}

      },
  components:{
    categories,
  },
  methods:{
    doSomething: function (id) {
        this.value = id;
        this.$emit('update:category', id)
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