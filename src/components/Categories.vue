<template>
  <li class="nav-item">
    <div :class="{bold: isFolder,selected: isSelected}">
      <a class="nav-link"  @click="toggle">
        <i v-show="isSelected" class="arrow right"></i>
        <span v-on:click="getAds(model.id)">{{ model.name }}</span>
        <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
      </a>
    </div>
    <ul v-show="open" v-if="isFolder">
      <categories
        class="item"
        v-for="(model, index) in model.children"
        :key="index"
        :isleft="isleft"
        v-on:myevent="doSomething"
        v-on:parentOpen="openx"
        :model="model"
      ></categories>
    </ul>
  </li>
</template>
<script>
export default {
  name: "categories",
  props: {
    model: [Object],
    isleft: {
      type: Boolean,
      default: true
    },
    selectedId: {}
  },
  created() {
    this.$root.$on("selected", id => {
      if (id == this.model.id) {
        this.$emit("parentOpen");
        this.selected = true;
      } else {
        this.selected = false;
      }
    });
  },
  data: function() {
    return {
      open: false,
      selected: false
    };
  },
  computed: {
    isFolder: function() {
      if (this.model === undefined) {
        return false;
      }
      return this.model.children && this.model.children.length;
    },
    isSelected: function() {
      return this.selected;
    }
  },
  methods: {
    openx: function() {
      if (this.isFolder) {
        this.open = true;
        this.$emit("parentOpen");
      }
    },
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    doSomething: function(id) {
      this.$emit("myevent", id);
    },
    getAds(id) {
      this.$root.$emit("selected", id); // so that others can become onselected
      this.selected = true;
      this.$emit("myevent", id);
    }
  }
};
</script>
<style scoped>
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
i {
  border: solid blue;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}
li{
    font-size: 0.7rem;
}
.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
</style>