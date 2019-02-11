<template>
  <div class="col-sm-6 mx-auto">
    <div class="form-group">
      <label for="inputName">Kullanici Adi</label>
      <input
        name="fullname"
        class="form-control"
        id="inputName"
        v-model="newUser.userName"
        placeholder="Kullanici Adi"
      >
    </div>
    <div class="form-group">
      <label for="inputEmail">Email</label>
      <input
        class="form-control"
        type="email"
        id="inputEmail"
        name="email"
        v-model="newUser.email"
        placeholder="Email"
      >
    </div>
    <div class="form-group">
      <label for="input">Password</label>
      <input
        class="form-control"
        id="inputPassword"
        type="password"
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
    validateMail: function(mail) {
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(mail).toLowerCase());
    },
    addUser: function() {
      if(!this.validateMail(this.newUser.email))
      {
        this.$notify({
                    type: 'error',
                    group: "foo",
                    title: "Yanlis mail adresi",
                    text: "Mail adresi yanlis"
        });
       return;
      }
      if(this.newUser.userName.length<5)
      {
        this.$notify({
                    type: 'error',
                    group: "foo",
                    title: "Kullanici adi",
                    text: "Kullanici adi 5 karakterden kisa olamaz"
        });
       return;
      }
       if(this.newUser.password.length<5)
      {
        this.$notify({
                    type: 'error',
                    group: "foo",
                    title: "Parola",
                    text: "Parola 5 karakterden kisa olamaz"
        });
       return;
      }
      this.$axios
        .post("/User/", this.newUser)
        .then(response => {
          console.log(response);
          this.$store.commit("auth_success", response.data);
          this.$axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.token;
          this.$router.push("/");
        })
        .catch(error => {
          switch (error.response.status) {
            case 409:
              this.errorMessage = "bu kullanici zaten mevcut";
                 this.$notify({
                    type: 'error',
                    group: "foo",
                    title: "Kullanici zaten mevcut",
                    text: "Email veya kullanici adi kullaniliyor"
        });
          }
        });
    }
  }
};
</script>