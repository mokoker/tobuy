  <template>
  <div class="container-fluid messagestop">
    <h4> <font-awesome-icon icon="user-circle"/> {{name}} icin gelen mesajlar</h4>
    <hr>
      <div class="row header">
      <div class="col-sm-2" >gonderen</div>
      <div class="col-sm-2" >alici </div>
      <div class="col-sm-2" > gonderim zamani</div>
      <div class="col-sm-6" >mesaj</div>
      <div class="col-sm-12" ><hr></div>
     </div>
    <div class="row" v-for="item in messages">
      <div class="col-sm-2" ><font-awesome-icon icon="user-circle"/>{{item.sender}}</div>
      <div class="col-sm-2" ><font-awesome-icon icon="user-circle"/>{{item.receiver}} </div>
      <div class="col-sm-2" ><font-awesome-icon icon="clock"/> {{formatDate(item.sentDate)}}</div>
      <div class="col-sm-6" ><font-awesome-icon icon="envelope"/>{{ item.text }}</div>
     <div class="col-sm-12" ><hr></div>
      <!-- <font-awesome-icon icon="user-circle"/>{{item.sender}} => <font-awesome-icon icon="user-circle"/>{{item.receiver}} =><font-awesome-icon icon="clock"/> {{formatDate(item.sentDate)}} => <font-awesome-icon icon="envelope"/>{{ item.text }}</li> -->
    </div>
  </div>
</template>

  <script>
import moment from "moment";
export default {
  name: "messages",
  props: {},
  data() {
    return {
      messages: []
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    name() {
      return this.$store.getters.name;
    }
  },
  created: function() {
    this.getMessages();
  },
  methods: {
    formatDate(value) {
      return moment(String(value)).format("MM/DD/YY hh:mm");
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
<style>
.messagestop {
   text-align: left;
}
.header div{
  font-weight: bold;
}
</style>
