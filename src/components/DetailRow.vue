 <template>
  <div class="row" @click="onClick">
    <div class="col-xs-12 col-sm-12 col-lg-8">
      <div class="inline field">
        <label>Ilan Basligi:</label>
        <span>{{buysell}}  {{rowData.title}}</span>
      </div>
      <div class="inline field">
        <label>Ilan Detayi:</label>
        <span class="breaker">{{rowData.message}}</span>
      </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-lg-4">
      <div class="inline field">
        <label>Sehir:</label>
        <span>{{rowData.cityName}}</span>
      </div>
      <div class="inline field">
        <label>Fiyat:</label>
        <span>{{formatMoney(rowData.price)}}</span>
      </div>
      <div class="inline field">
        <label>Gonderim Zamani:</label>
        <span>{{formatDate(rowData.postDate)}}</span>
      </div>
      <div class="inline field">
        <label>Ilan Url:</label>
        <a v-bind:href="getDetailUrl()">{{getDetailUrl()}}</a>
      </div>
      <div class="inline field">
        <label>Nickname:</label>
        <span>{{rowData.posterName}}</span>
        <button
          type="button"
          class="btn-xs btn-info"
          v-show="this.sendMessageButtonVisible()"
          v-on:click="sendMessageClicked"
        >MesajGonder</button>
      </div>
      <newmessage
        v-bind:receivername="rowData.posterName"
        v-bind:receiverid="rowData.posterId"
        v-show="this.sendMessageVisible"
        v-on:messageSent="this.messageSent"
      />
    </div>
  </div>
</template>

  <script>
import newmessage from "./NewMessage";
import Vue from "vue";
import moment from "moment";
export default {
  name: "detailrow",
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  components: {
    newmessage
  },
  computed:{
    id() {
      return this.$store.getters.id;
    },
    buysell(){
      return this.rowData.toSell ? "Satilik":"Alinik";
    }
  },
  data: function() {
    return {
      sendMessageVisible: false
    };
  },
  methods: {
       formatMoney(value) {
      return value + " TL";
    },
      formatDate(value) {
      return moment(String(value)).format("MM/DD/YY hh:mm");
    },
    sendMessageButtonVisible(){
      return  this.rowData.posterId != this.id;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    onClick(event) {},
    getDetailUrl() {
      return Vue.store.baseUrl + "/#/d?id=" + this.rowData.id;
    },

    messageSent(){
      this.sendMessageVisible= false;
    },
    sendMessageClicked(){
      if(this.isLoggedIn())
      {
        sendMessageVisible =!sendMessageVisible;
      }
      else
      {
         this.$notify({
          type: "info",
          group: "foo",
          title: "Mesaj gonderebilmek icin giris yapmalisin",
          text: "Mesaj gonderebilmek icin giris yapmalisin, bir hesabin yoksa 10s de yeni bir hesap acabilirsin."
        });
         this.$router.push("/signin");
      }
    }

  }
};
</script>
<style scoped>
label {
  font-weight: bold;
}

.breaker {
  word-break: break-all;
}

a {
  color: blue;
}

a:hover {
  cursor: pointer;
}

</style>