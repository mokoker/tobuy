<template>
  <div class="leftItem">
    <multiselect
      class='multisel'
      v-model="value"
      :options="options"
      :multiple="multiple"
      :searchable="false"
      :close-on-select="false"
      :show-labels="false"
      label="name"
      track-by="name"
      placeholder="Sehir seciniz"
      @close="Closed"
      @remove="Removed"
    ></multiselect>
  </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  name: "cities",
  components: {
    Multiselect
  },
  data() {
    return {
      value: "",
      options: [
        { name: "Adana", id: 1 },
        { name: "Adıyaman", id: 2 },
        { name: "Afyon", id: 3 },
        { name: "Ağrı", id: 4 },
        { name: "Amasya", id: 5 },
        { name: "Ankara", id: 6 },
        { name: "Antalya", id: 7 },
        { name: "Artvin", id: 8 },
        { name: "Aydın", id: 9 },
        { name: "Balıkesir", id: 10 },
        { name: "Bilecik", id: 11 },
        { name: "Bingöl", id: 12 },
        { name: "Bitlis", id: 13 },
        { name: "Bolu", id: 14 },
        { name: "Burdur", id: 15 },
        { name: "Bursa", id: 16 },
        { name: "Çanakkale", id: 17 },
        { name: "Çankırı", id: 18 },
        { name: "Çorum", id: 19 },
        { name: "Denizli", id: 20 },
        { name: "Diyarbakır", id: 21 },
        { name: "Edirne", id: 22 },
        { name: "Elazığ", id: 23 },
        { name: "Erzincan", id: 24 },
        { name: "Erzurum", id: 25 },
        { name: "Eskişehir", id: 26 },
        { name: "Gaziantep", id: 27 },
        { name: "Giresun", id: 28 },
        { name: "Gümüşhane", id: 29 },
        { name: "Hakkari", id: 30 },
        { name: "Hatay", id: 31 },
        { name: "Isparta", id: 32 },
        { name: "İçel", id: 33 },
        { name: "İstanbul", id: 34 },
        { name: "İzmir", id: 35 },
        { name: "Kars", id: 36 },
        { name: "Kastamonu", id: 37 },
        { name: "Kayseri", id: 38 },
        { name: "Kırklareli", id: 39 },
        { name: "Kırşehir", id: 40 },
        { name: "Kocaeli", id: 41 },
        { name: "Konya", id: 42 },
        { name: "Kütahya", id: 43 },
        { name: "Malatya", id: 44 },
        { name: "Manisa", id: 45 },
        { name: "Kmaraş", id: 46 },
        { name: "Mardin", id: 47 },
        { name: "Muğla", id: 48 },
        { name: "Muş", id: 49 },
        { name: "Nevşehir", id: 50 },
        { name: "Niğde", id: 51 },
        { name: "Ordu", id: 52 },
        { name: "Rize", id: 53 },
        { name: "Sakarya", id: 54 },
        { name: "Samsun", id: 55 },
        { name: "Siirt", id: 56 },
        { name: "Sinop", id: 57 },
        { name: "Sivas", id: 58 },
        { name: "Tekirdağ", id: 59 },
        { name: "Tokat", id: 60 },
        { name: "Trabzon", id: 61 },
        { name: "Tunceli", id: 62 },
        { name: "Şanlıurfa", id: 63 },
        { name: "Uşak", id: 64 },
        { name: "Van", id: 65 },
        { name: "Yozgat", id: 66 },
        { name: "Zonguldak", id: 67 },
        { name: "Aksaray", id: 68 },
        { name: "Bayburt", id: 69 },
        { name: "Karaman", id: 70 },
        { name: "Kırıkkale", id: 71 },
        { name: "Batman", id: 72 },
        { name: "Şırnak", id: 73 },
        { name: "Bartın", id: 74 },
        { name: "Ardahan", id: 75 },
        { name: "Iğdır", id: 76 },
        { name: "Yalova", id: 77 },
        { name: "Karabük", id: 78 },
        { name: "Kilis", id: 79 },
        { name: "Osmaniye", id: 80 },
        { name: "Düzce", id: 81 }
      ]
    };
  },
  props: {
    isleft: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.$events.$on("filters-cleared", eventData =>
      this.onFiltersCleared(eventData)
    );
    this.$events.$on("search-query-updated", eventData =>
      this.onQueryUpdated(eventData)
    );
  },
  methods: {
    onQueryUpdated(data) {
      if (data["cities"] && this.isleft) {
        this.value = [];
        data["cities"]
          .split(",")
          .forEach(x => this.value.push(this.options.find(a => a.id == x)));
        this.$root.strs["cities"] = data["cities"];
      }
    },
    onFiltersCleared(eventData) {
      this.value = "";
    },
    Closed() {
      this.$emit("update:city", this.value);
      if (this.isleft && this.value.length > 0) {
        var selectedCities = [];
        this.value.forEach(x => selectedCities.push(x.id));
        this.$root.strs["cities"] = selectedCities;
        this.$root.routeme();
      }
    },
    Removed(rem) {
      if (this.isleft && this.value.length > 0) {
        var selectedCities = [];
        this.value.forEach(x =>
          x.id != rem.id ? selectedCities.push(x.id) : console.log("removed")
        );
        console.log(selectedCities);
        this.$root.strs["cities"] = selectedCities;
        this.$root.routeme();
      }
    }
  }
};
</script>
<style scoped >
.leftItem{
  margin:0 1em 3em 1em;
  
}
</style>