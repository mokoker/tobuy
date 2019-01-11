<template>
   <form> 
    <div class="col-sm-6 mx-auto">
      <div class="form-group">
          <label for="exampleInputEmail1">Kategori</label>
          <basecategory v-model = "categories" v-bind:isleft="false"/>
      </div>
            
      <div class="form-group">
        <label for="inputBaslik">Ilan Basligi</label>
        <input  class="form-control" id="inputBaslik" v-model="itemToAdd.baslik"  aria-describedby="baslikHelp" placeholder="Ilan Basligi">
        <!-- <small id="baslikHelp" class="form-text text-muted">Ilan Basligi Ne Olsun</small> -->
      </div>
      <div class="form-group">
        <label for="inputMetin">Ilan Metni</label>
        <textarea  class="form-control" id="inputMetin" v-model="itemToAdd.metin"  cols="40" rows="5"  placeholder="Ilan Metni"></textarea>
      </div>
        <button type="button" class="btn btn-primary" v-on:click="addItem">Ekle</button>
    </div>
 </form>
</template>
<script>
import basecategory from './BaseCategory'
export default {

      props: {
        categories :{},
        value: [Object],
        isleft : {
          type: Boolean,
          default: true
        }

      },
    name: 'newitem',
    components:{
    basecategory,
   },
         data: function () {
        return {
        itemToAdd :{baslik : "",metin:""}
        }
      },
   methods: {
        addItem: function () {
            console.log(this.itemToAdd);
        },
      
     }

}


</script>