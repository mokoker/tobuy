 <template>
  <div class="row" @click="onClick">
    <div class="col-xs-12 col-sm-12 col-lg-8">
      <div class="inline field">
        <label>Ilan Basligi:</label>
        <span>{{rowData.title}}</span>
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
        <span>{{rowData.price}}</span>
      </div>
      <div class="inline field">
        <label>Gonderim Zamani:</label>
        <span>{{rowData.postDate}}</span>
      </div>
      <div class="inline field">
        <label>Nickname:</label>
        <span>{{rowData.posterName}}</span>
        <button type="button" class="btn-xs btn-primary" v-on:click="sendMessageVisible =!sendMessageVisible">MesajGonder</button>
      </div>
      <newmessage  v-bind:receivername="rowData.posterName" v-bind:receiverid="rowData.posterId" v-show="this.sendMessageVisible"/>
    </div>
  </div>
</template>

  <script>
import newmessage from "./NewMessage";
export default {
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
   components: {
    newmessage
  },
  data: function() {
    return {
      sendMessageVisible :false,
    };
  },
  methods: {
    onClick(event) {
      console.log(this.rowData);
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
</style>