 <template>
    <div @click="onClick">
      <div class="inline field">
        <label>Ilan Basligi: </label>
        <span>{{rowData.title}}</span>
      </div>
      <div class="inline field">
        <label>Ilan Detayi: </label>
        <span>{{rowData.message}}</span>
      </div>
      <div class="inline field">
        <label>Nickname: </label>
        <span>{{rowData.posterName}}</span>
      </div>
      <div class="inline field">
        <label>Sehir: </label>
        <span>{{rowData.cityName}}</span>
      </div>
      <div class="inline field">
        <label>Fiyat: </label>
        <span>{{rowData.price}}</span>
      </div>
            <div class="inline field">
        <label>Gonderim Zamani: </label>
        <span>{{rowData.postDate}}</span>
      </div>
    </div>
  </template>

  <script>
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
    methods: {
      onClick (event) {
        console.log('my-detail-row: on-click', event.target)
      }
    },
  }
  </script>