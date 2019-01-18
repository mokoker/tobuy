<template>
   <form> 
    <div class="col-sm-6 mx-auto">
      <div class="form-group">
          <label for="exampleInputEmail1">Kategori</label>
          <basecategory  v-bind:value="itemToAdd.categoryId" v-on:update:category="updateSelected" v-bind:cats = "cats" v-bind:isleft="false"/>
      </div>
            
      <div class="form-group">
        <label for="inputBaslik">Ilan Basligi</label>
        <input  class="form-control" id="inputBaslik" v-model="itemToAdd.title"  aria-describedby="baslikHelp" placeholder="Ilan Basligi">
        <!-- <small id="baslikHelp" class="form-text text-muted">Ilan Basligi Ne Olsun</small> -->
      </div>
      <div class="form-group">
        <label for="inputMetin">Ilan Metni</label>
        <textarea  class="form-control" id="inputMetin" v-model="itemToAdd.message"  cols="40" rows="5"  placeholder="Ilan Metni"></textarea>
      </div>
        <button type="button"  class="btn btn-danger" v-on:click="cancel">Vazgec</button>
        <button type="button" class="btn btn-primary" v-on:click="addItem">Ekle</button>
    </div>
 </form>
</template>
<script>
import basecategory from './BaseCategory'
export default {

      props: {
        value: [Object],
        isleft : {
          type: Boolean,
          default: true
        }

      },
      computed:{
            cats(){
             return  this.$store.getters.categories
    }
        },
    name: 'newitem',
    components:{
    basecategory,
   },
         data: function () {
        return {
        itemToAdd :{title : "",message:"",categoryId:0},

        }
      },
   methods: {
        addItem: function () {
            console.log(this.itemToAdd);
            this.$axios
            .post('/X',this.itemToAdd)
            .then(response => {
              console.log(response);
              this.$router.push('/');
      })
        },
        cancel:function(){
          this.$router.push('/');
        },
        updateSelected:function(id){
          this.itemToAdd.categoryId = id;
        }
      
     }

}


</script>