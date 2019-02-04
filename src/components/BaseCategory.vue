<template>
  <div id="leftMenu">
    <div class="dropdown buysell" >
      <button
        class="btn btn-secondary btn-sm btn-xs dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >{{buysell}}</button>
      <div class="dropdown-menu btn-xs" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item btn-xs" v-on:click="tosell = false;toSellChanged();">alinik</a>
        <a class="dropdown-item btn-xs" v-on:click="tosell = true ;toSellChanged();">satilik</a>
      </div>
    </div>
    <ul id="categories">
      <template v-for="x in cats">
        <categories v-bind:isleft="isleft" class="item" :model="x" v-on:myevent="doSomething"></categories>
      </template>
    </ul>
  </div>
</template>
<script>
import categories from "./Categories";
export default {
  name: "basecategory",
  data() {
    return {
      tosell: false,
      value: 0
    };
  },
  computed: {
    buysell: function() {
      if (this.tosell) {
        return "satilik";
      }
      return "alinik";
    }
  },
  props: {
    isleft: {
      type: Boolean,
      default: true
    },
    cats: {}
  },
  components: {
    categories
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
      console.log(data);
      if (data["categoryId"]) {
        this.value = data["categoryId"];
        this.$root.strs["categoryId"] = this.value;
        this.$root.$emit("selected", this.value);
      }
      if (data["toSell"]) {
        this.tosell = true;
        this.$root.strs["toSell"] = this.tosell;
      }
    },
    onFiltersCleared(eventData) {
      this.tosell = false;
      this.value = 0;
      this.$root.$emit("selected", this.value);
    },
    doSomething: function(id) {
      this.value = id;
      this.$emit("update:category", { id: this.value, tosell: this.tosell });
      console.log(this.$root);    
      if (this.isleft) {
        if (this.value != 0) {
          this.$root.strs["categoryId"] = this.value;
        }
        this.$root.routeme();
      }
    },
    toSellChanged: function() {
      this.$emit("update:category", { id: this.value, tosell: this.tosell });
      if (this.isleft) {
        this.$root.strs["toSell"] = this.tosell;
        this.$root.routeme();
      }
    }
  }
};
</script>
<style scoped>
ul {
  list-style-position: outside;
  list-style-type: square;
  text-transform: capitalize;
  padding-left: 2em;
  cursor: pointer;
}

.buysell{
    margin:1em;
}

.btn-xs {
  font-size: 0.8rem;
  width: 100%;
  text-align: center;
}
</style>