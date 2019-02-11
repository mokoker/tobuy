
<template>
  <div class="col-sm-6 mx-auto">
    <div class="form-group">
      <label for="input">Password</label>
      <input class="form-control" name="email"  type="password" id="inputPassword" v-model="password1" placeholder="Password">
    </div>
        <div class="form-group">
      <label for="input">Password Again</label>
      <input class="form-control" name="email"  type="password" id="inputPassword" v-model="password2" placeholder="Password again">
    </div>
       <button type="button" class="btn btn-primary" v-on:click="changePass">Sifremi Degistir</button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      password1 : "",
      password2 : "",
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
  name: "resetpass",
  props:{
    secret:''
  },

  methods: {
    changePass: function() {
      console.log(this.secret);
      if(this.password1 != this.password2)
      {
         this.$notify({
            type: 'error',
            group: "foo",
            title: "Girilen Sifreler farkli",
            text: "Girdigin sifreler birbirinden farkli tekrar girebilirmisin!"
          });
          this.password1 ="";
          this.password2="";
          return;
      }
       if(this.this.password1.length<5)
      {
        this.$notify({
                    type: 'error',
                    group: "foo",
                    title: "Parola",
                    text: "Parola 5 karakterden kisa olamaz"
        });
       return;
      }
      var resetdto = { secret :this.secret,newpassword:this.password1 };
      this.$axios
        .patch("/User", resetdto)
        .then(response => {
          this.$notify({
            type: 'info',
            group: "foo",
            title: "Sifren basari ile degistirildi",
            text: "Sifren basari ile degistirildi Yenisi ile giris yapabilirsin!"
          });
          this.$router.push("/signin");
        })
        .catch(error => {
          switch (error.response.status) {
            case 401: {
              this.errorMessage = "yanlis kullanici adi yada sifre";
            }
          }
        });
    }
  }
};
</script>

</script>