<template>
  <div class="col-sm-6 mx-auto">
    <div class="form-group">
      <label for="inputName">Kullanici Adi</label>
      <input
        class="form-control"
        id="inputName"
        v-model="newUser.userName"
        placeholder="Kullanici Adi"
      >
    </div>
    <div class="form-group">
      <label for="inputEmail">Email</label>
      <input class="form-control" id="inputEmail" v-model="newUser.email" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="input">Password</label>
      <input
        class="form-control"
        id="inputPassword"
        v-model="newUser.password"
        placeholder="Password"
      >
    </div>
    <button type="button" class="btn btn-primary" v-on:click="addUser">Kaydol</button>
    <div v-show="this.errorMessage != ''" class="alert alert-warning" role="alert">{{errorMessage}}</div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      newUser: { userName: "", email: "", password: "" },
      errorMessage: ""
    };
  },
  watch: {
    newUser: {
      handler(newOne, oldOne) {
        this.errorMessage = "";
      },
      deep: true
    }
  },
  name: "signup",
  methods: {
    addUser: function() {
      this.$axios
        .post("/User/", this.newUser)
        .then(response => {
          console.log(response);
          this.$store.commit("auth_success", response.data);
          this.$axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.token;
        })
        .catch(error => {
          switch (error.response.status) {
            case 409:
              this.errorMessage = "bu kullanici zaten mevcut";
          }
        });
    }
  }
};
</script>