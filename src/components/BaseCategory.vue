<template>
  <div id="leftMenu">
    <div class="dropdown">
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
      <li v-for="x in cats">
        <categories v-bind:isleft="isleft" class="item" :model="x" v-on:myevent="doSomething"></categories>
      </li>
      {{value}}
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
  methods: {
    doSomething: function(id) {
      this.value = id;
      this.toSellChanged();
    },
    toSellChanged: function() {
      this.$emit("update:category", { id: this.value, tosell: this.tosell });
      if (this.isleft) {
        var initial = "";
        var strs = [];
        if (true) {
          strs.push("toSell-" + this.tosell);
        }
        if (this.value != 0) {
          strs.push("categoryId-" + this.value);
        }

        if (strs.length > 0) {
          initial = "/?s=";
        }
        console.log(strs);
        strs.forEach(function(value, i) {
          initial = initial + value;
          if (i != strs.length - 1) initial = initial + ",";
        });

        this.$router.push(initial);

        // this.$events.fire("category-set", {id:this.value,tosell:this.tosell});
      }
    }
  }
};
</script>
<style scoped>
#leftMenu {
  padding: 1em;
}
#categories {
  margin: 10px;
  min-height: 5em;
}
ul {
  list-style-position: outside;
  list-style-type: dot;
  text-transform: capitalize;
  padding-left: 2em;
  cursor: pointer;
}
a {
  text-align: left;
}
.nav-link {
  padding: 0em;
}
/* Second Level */
ul ul {
  padding-left: 1em;
}

/* Third Level */
ul ul ul {
  padding-left: 2em;
}
.bold {
  font-weight: bold;
}
.selected {
  color: blue;
}

.btn-xs {
  font-size: 0.8rem;
  width: 100%;
  text-align: center;
}
</style>