  <template>
  <div>
    <label class="bold">{{name}} den {{receivername}} ye yeni mesaj</label>
    <textarea
      class="form-control"
      id="inputMessage"
      v-model="itemtoadd.text"
      cols="40"
      rows="5"
      placeholder="Mesajiniz"
    ></textarea>
    <div class="text-center">
      <button type="button" class="btn-sm btn-info center-block" v-on:click="sendMessage">Gonder</button>
    </div>
  </div>
</template>

  <script>
export default {
  name: "newmessage",
  props: {
    receiverid: {
      type: Number,
      default: 1
    },
    receivername: {
      type: String,
      default: "unknown"
    }
  },
  data() {
    return {
      itemtoadd: { text: "", recid: "" }
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
  methods: {
    sendMessage() {
      this.itemtoadd.recid = this.receiverid;
      console.log(this.itemtoadd);
      this.$axios
        .post("/Message", this.itemtoadd)
        .then(response => {
          this.$emit("messageSent");
          this.$notify({
            group: "foo",
            title: "Gonderildi",
            text: "Mesajiniz gonderildi"
          });
          this.itemtoadd.text = "";
          console.log(response);
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

.bold{
  font-weight: bold;
}
</style>
