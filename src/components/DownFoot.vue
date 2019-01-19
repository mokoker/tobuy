<template>
  <footer class="footer">
      <div class="container">
          <button type="button"  class="btn-sm btn-primary" v-on:click="newPost">Yeni Ilan Gonder</button>
          <button type="button"  class="btn-sm btn-info" v-on:click="newPost">Giris Yap</button>
          <button type="button"  class="btn-sm btn-info" v-on:click="newPost">Yeni Ilan Gonder</button>
          
      </div>
    </footer>
</template>
<script>
export default {
  name: 'downfoot',
  methods :{
        newPost()
        {
          this.$router.push('new');
        },
  },
}
</script>

<style>

  /*
   * Footer
   */
html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 60px; /* Margin bottom by footer height */
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 35px; /* Set the fixed height of the footer here */
  line-height: 35px; /* Vertically center the text there */
  background-color: #f5f5f5;
}
</style>