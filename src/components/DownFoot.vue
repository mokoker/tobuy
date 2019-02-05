<template>
  <footer class="footer">
    <div class="container">
      <button
        type="button"
        class="btn-sm btn-secondary"
        v-show="isLoggedIn"
        v-on:click="newPost"
      >Yeni Ilan Gonder</button>
      <button
        type="button"
        class="btn-sm btn-dark"
        v-show="isLoggedIn"
        v-on:click="mymessages"
      >Mesajlarim</button>
      <button
        type="button"
        class="btn-sm btn-dark"
        v-show="!isLoggedIn"
        v-on:click="login"
      >Giris Yap</button>
      <button
        type="button"
        class="btn-sm btn-dark"
        v-show="isLoggedIn"
        v-on:click="myposts"
      >Ilanlarim</button>
    </div>
  </footer>
</template>
<script>
export default {
  name: "downfoot",
  methods: {
    newPost() {
      this.$router.push("new");
    },
    login() {
      this.$router.push("signin");
    },
    mymessages() {
      this.$router.push("messages");
    },
    myposts() {
      this.$router.push("my");
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>

<style scoped>

footer {
  
    width: 100%;
  position: fixed;
bottom: 0px;
left:0px;
  height: 35px; /* Set the fixed height of the footer here */
  line-height: 35px; /* Vertically center the text there */
  background-color: #f5f5f5;
}

</style>