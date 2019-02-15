<template>
  <div class="col-sm-6 mx-auto">
    <div class="form-group">
      <label for="inputEmail">Email</label>
      <input
        class="form-control"
        type="email"
        id="inputEmail"
        v-model="user.email"
        placeholder="Email"
      >
    </div>
    <div class="form-group">
      <label for="input">Password</label>
      <input
        class="form-control"
        name="email"
        type="password"
        id="inputPassword"
        v-model="user.password"
        placeholder="Password"
      >
    </div>
    <button type="button" class="btn btn-primary" v-on:click="addUser">Giris Yap</button>
    <button type="button" class="btn btn-primary" v-on:click="forgotPass">Sifremi Unuttum</button>
    <button type="button" class="btn btn-primary" v-on:click="signup">Uye Ol</button>
    <div v-show="this.errorMessage != ''" class="alert alert-warning" role="alert">{{errorMessage}}</div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      user: { email: "", password: "" },
      errorMessage: ""
    };
  },
  watch: {
    user: {
      handler(newOne, oldOne) {
        this.errorMessage = "";
      },
      deep: true
    }
  },
  name: "signin",
  methods: {
    forgotPass: function() {
      this.$router.push("/forgotpass");
    },
    signup() {
      this.$router.push("signup");
    },
    addUser: function() {
      if (this.user.email.length < 5) {
        this.$notify({
          type: "error",
          group: "foo",
          title: "Email girmedin",
          text: "Email ini girmeden giris yapamazsin"
        });
        return;
      }
      if (this.user.password.length < 3) {
        this.$notify({
          type: "error",
          group: "foo",
          title: "Sifreni girmedin",
          text: "Sifreni girmeden giris yapamazsin"
        });
        return;
      }
      this.$axios
        .post("/User/Login", this.user)
        .then(response => {
          console.log(response);
          this.$store.commit("auth_success", response.data);
          this.$axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.token;
          this.$router.push("/");
        })
        .catch(error => {
          switch (error.response.status) {
            case 401: {
              this.errorMessage = "yanlis kullanici adi yada sifre";
              this.$notify({
                type: "error",
                group: "foo",
                title: "Yanlis sifre",
                text: "Sifren yanlis unuttuysan sifirlayabilirsin!"
              });
            }
          }
        });
    }
  }
};
</script>

</script>