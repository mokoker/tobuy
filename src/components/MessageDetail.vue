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
        v-show="messageToOther" 
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
        v-bind:receivername="item.sender"
        v-bind:receiverid="item.senId"
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
  computed: {
    userid() {
      return this.$store.getters.id;
    },
    messageToOther(){
      return this.userid != this.item.senId;
    }
  },
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
             this.$emit("messageDeleted",item.id);
          });
          break;
        case "reply":
          this.sendMessageVisible = !this.sendMessageVisible;
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

</style>
