  <template>
  <div class="container-fluid messagestop">
    <h4>
      <font-awesome-icon icon="user-circle"/>
      {{name}} icin gelen mesajlar
    </h4>
    <hr>
    <div class="row header">
      <div class="col-sm-2">gonderen</div>
      <div class="col-sm-2">alici</div>
      <div class="col-sm-2">gonderim zamani</div>
      <div class="col-sm-6">mesaj</div>
      <div class="col-sm-12">
        <hr>
      </div>
    </div>

    <template v-for="item in messages">
      <messagedetail v-on:messageDeleted="messageDeleted" v-bind:item="item"/>
    </template>
  </div>
</template>

  <script>
import messagedetail from "./MessageDetail";
export default {
  name: "messages",
  props: {},
  data() {
    return {
      messages: []
    };
  },
  components: {
    messagedetail
  },
  computed: {
    name() {
      return this.$store.getters.name;
    }
  },

  created: function() {
    this.getMessages();
  },
  methods: {
    messageDeleted(id) {
      this.messages = this.messages.filter(function(value, index, arr) {
        return value.id !=id;
      });
      console.log(id + "  deleted");
    },
    getMessages() {
      this.$axios
        .get("/Message")
        .then(response => {
          console.log(response);
          this.messages = response.data;
        })
        .catch(error => {
          switch (error.response.status) {
            case 401: {
              console.log(error.response);
            }
          }
        });
    }
  }
};
</script>
<style scoped>
.messagestop {
  text-align: left;
}
.header div {
  font-weight: bold;
}
</style>
