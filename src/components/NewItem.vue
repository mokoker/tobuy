<template>
  <div>
    <div v-if="isLoggedIn" class="col-sm-6 mx-auto">
      <div class="form-group">
        <label for="exampleInputEmail1">Kategori</label>
        <basecategory
          v-bind:value="itemToAdd.categoryId"
          v-on:update:category="updateSelected"
          v-bind:cats="cats"
          v-bind:isleft="false"
        />
      </div>

      <div class="form-group">
        <label for="inputBaslik">Ilan Basligi</label>
        <input
          class="form-control"
          id="inputBaslik"
          v-model="itemToAdd.title"
          placeholder="Ilan Basligi"
        >
      </div>
      <div class="form-group">
        <label for="inputMetin">Ilan Metni</label>
        <textarea
          class="form-control"
          id="inputMetin"
          v-model="itemToAdd.message"
          cols="40"
          rows="5"
          placeholder="Ilan Metni"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="inputBaslik">Fiyat</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">TL</span>
          </div>
          <input type="number" v-model="itemToAdd.price" class="form-control" placeholder="Urun Fiyati">
        </div>
      </div>

      <button type="button" class="btn btn-danger" v-on:click="cancel">Vazgec</button>
      <button type="button" class="btn btn-primary" v-on:click="addItem">Ekle</button>
      <div v-show="this.errorMessage != ''" class="alert alert-danger" role="alert">{{errorMessage}}</div>
    </div>
    <div v-else>
      <div class="alert alert-info" role="alert">Yeni ilan gonderebilmek icin lutfen giris yapiniz.</div>
      <button type="button" class="btn-sm btn-info" v-on:click="routeToLogin">Giris Yap</button>
    </div>
  </div>
</template>
<script>
import basecategory from "./BaseCategory";
export default {
  name: "newitem",
  props: {
    value: [Object],
    isleft: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cats() {
      return this.$store.getters.categories;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  components: {
    basecategory
  },
  data: function() {
    return {
      errorMessage: "",
      itemToAdd: {
        title: "",
        message: "",
        categoryId: 0,
        toSell: false,
        price: 0
      }
    };
  },
  methods: {
    routeToLogin: function() {
      this.$router.push("/signin");
    },
    addItem: function() {
      console.log(this.itemToAdd);
      this.$axios
        .post("/X", this.itemToAdd)
        .then(response => {
          console.log(response);
           this.$notify({
            group: "foo",
            title: "Gonderildi",
            text: "Ilaniniz gonderildi"
          });
          this.$root.clearpath();
        })
        .catch(error => {
          switch (error.response.status) {
            case 401:
              this.errorMessage = "lutfen giris yapiniz";
          }
        });
    },
    cancel: function() {
      this.$router.push("/");
    },
    updateSelected: function(e) {
      console.log(e);
      this.itemToAdd.categoryId = e.id;
      this.itemToAdd.toSell = e.tosell;
    }
  }
};
</script>
<style>
.alert {
  margin-top: 20px;
}
</style>