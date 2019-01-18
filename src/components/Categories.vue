<template>
    <li class="nav-item">
      <div
        :class="{bold: isFolder,selected: isSelected}">
        <a class="nav-link" v-on:click="getAds(model.id)">{{ model.name }}  <span  @click="toggle" v-if="isFolder">[{{ open ? '-' : '+' }}]</span></a>
      </div>
      <ul v-show="open" v-if="isFolder">
        <categories
          class="item"
          v-for="(model, index) in model.children"
          :key="index"
          :isleft="isleft"
          v-on:myevent="doSomething"
          :model="model">
        </categories>
      </ul>
    </li>
</template>
<script>
import Vue from 'vue'
  export default {
    name: 'categories',
   props: {
        model: [Object],
        isleft : {
          type: Boolean,
          default: true
        },
        selectedId :{}
      },
      created() {
        this.$root.$on('selected', (id) => {
          this.selected =false;
        });
      },
      data: function () {
        return {
          open: false,
          selected :false,
        }
      },
      computed: {
        isFolder: function () {
          if(this.model === undefined)
          {return false}
            return  this.model.children &&  this.model.children.length
        },
        isSelected: function(){
          return this.selected;
        }
      },
      methods: {
        toggle: function () {
          if (this.isFolder) {
            this.open = !this.open
          }
        },
         doSomething: function (id) {
           console.log('child');
             this.$emit('myevent',id);
        },
        getAds(id) {
          this.$root.$emit('selected',id);
          this.selected = true;
          this.$emit('myevent',id)
          if(this.isleft)
          {
            this.$root.$emit('change',id);
          }
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