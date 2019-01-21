  <template>
  <div>
    <label>{{name}} icin gelen mesajlar</label>
    <li
      v-for="item in messages"
    >{{item.sender}} => {{item.receiver}} => {{formatDate(item.sentDate)}} => {{ item.text }}</li>
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
</style>
