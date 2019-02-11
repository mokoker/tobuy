<template>
  <div class="col-sm-6 mx-auto">
    <div class="form-group">
      <label for="inputEmail">Email</label>
      <input class="form-control" type="email" id="inputEmail" v-model="email" placeholder="Email">
    </div>
       <button type="button" class="btn btn-primary" v-on:click="forgotPass">Sifremi Unuttum</button>
    <div v-show="this.errorMessage != ''" class="alert alert-warning" role="alert">{{errorMessage}}</div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      email :"",
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
  name: "forgotpass",
  methods: {
    forgotPass: function() {
      this.$axios
        .post("/User/ForgotPassword/"+ this.email)
        .then(response => {
          console.log(response);     
          this.$router.push("/");
        })
        .catch(error => {
          switch (error.response.status) {
            case 401: {
              this.errorMessage = "hata olustu";
            }
          }
        });
    }
  }
};
</script>

</script>