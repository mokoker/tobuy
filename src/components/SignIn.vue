<template>
   <form>
    <div class="col-sm-6 mx-auto">
        <div class="form-group">           
            <label for="inputEmail">Email</label>
            <input  class="form-control" id="inputEmail" v-model="newUser.email"  placeholder="Email">
        </div>
        <div class="form-group">
            <label for="input">Password</label>
            <input  class="form-control" id="inputPassword" v-model="newUser.password"  placeholder="Password">
        </div>
            <button type="button"  class="btn btn-primary" v-on:click="addUser">Giris Yap</button>
        </div>
 </form>
</template>
<script>
export default {

    data: function () {
        return {
        newUser :{userName:"", email : "",password:""}
        }
    },
    name: 'signin',
    methods: {
        addUser: function () {
            this.$axios
      .post('/User/',this.newUser)
      .then(response => {
          this.$store.commit('auth_success', response.data);
      })
            console.log(this.newUser);
        },
    }
}


</script>

</script>