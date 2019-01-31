<template>
  <div class="row">
    <div class="col-sm-2">
      <font-awesome-icon icon="user-circle"/>
      {{item.sender}}
    </div>
    <div class="col-sm-2">
      <font-awesome-icon icon="user-circle"/>
      {{item.receiver}}
    </div>
    <div class="col-sm-2">
      <font-awesome-icon icon="clock"/>
      {{formatDate(item.sentDate)}}
    </div>
    <div class="col-sm-5">
      <font-awesome-icon icon="envelope"/>
      {{ item.text }}
    </div>
    <div class="col-sm-1">
      <button
        @click="itemAction('reply', item)"
        data-toggle="tooltip"
        data-placement="right"
        title="Cevap yaz"
      >
        <font-awesome-icon icon="reply"/>
      </button>
      <button
        @click="itemAction('delete-item', item)"
        data-toggle="tooltip"
        data-placement="right"
        title="Mesaji sil"
      >
        <font-awesome-icon icon="minus-circle"/>
      </button>
    </div>

      <div v-show="sendMessageVisible" class="offset-sm-6 col-sm-6">
        <newmessage
          v-bind:receivername="item.receiver"
          v-bind:receiverid="item.recId"
          v-on:messageSent="messageSent"
        />
    </div>
    <div class="col-sm-12">
      <hr>
    </div>
  </div>
</template>
 <script>
import moment from "moment";
import newmessage from "./NewMessage";
export default {
  name: "messagedetail",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      sendMessageVisible: false
    };
  },
  components: {
    newmessage
  },
  computed: {},
  methods: {
    messageSent() {
        this.sendMessageVisible = false;
    },
    itemAction(operation, item) {
      switch (operation) {
        case "delete-item":
          this.$axios.delete("/Message/" + item.id).then(response => {
            this.$notify({
              group: "foo",
              title: "Silindi",
              text: "Mesajiniz silindi!"
            });
          });
          break;
        case "reply":
          this.sendMessageVisible = !this.sendMessageVisible;
          console.log("reply");
          break;
      }
    },
    formatDate(value) {
      return moment(String(value)).format("MM/DD/YY hh:mm");
    }
  }
};
</script>
<style>
.messagestop {
  text-align: left;
}
.header div {
  font-weight: bold;
}
</style>
