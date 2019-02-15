<template>
  <div id="main" class="container-fluid">
    <filter-bar></filter-bar>
    <div class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
          <basecategory v-bind:cats="cats"/>
          <cities/>
        </div>
    </div>
    <main role="main" id="routerContainer" class="col-md-10 ml-sm-auto col-lg-10 px-4">
      <router-view/>
    </main>
    <downfoot/>
    <notifications position="bottom left" group="foo"/>
  </div>
</template>

<script>
import Vue from "vue";
import VueEvents from "vue-events";
import basecategory from "./components/BaseCategory";
import FilterBar from "./components/FilterBar";
import downfoot from "./components/DownFoot";
import cities from "./components/Cities";
Vue.use(VueEvents);
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    basecategory,
    FilterBar,
    downfoot,
    cities
  },
  computed: {
    cats() {
      return this.$store.getters.categories;
    }
  },
  mounted() {
    this.$events.$on("filters-cleared", eventData =>
      this.OnFiltersCleared(eventData)
    );
  },
  methods: {
    OnFiltersCleared(eventData) {
      console.log("app filter clearing");
      this.$root.clearpath();
    }
  },
  created: function() {
    if(this.cats== null)
    {
      console.log('getting cats');
    this.$axios
      .get("/Categories/1")
      .then(response => {
        this.$store.commit("setcats", response.data.children);
      });
    }
    this.$root.$emit("change", 1);
    var token = localStorage.getItem("token");
    if (token != "") {
      this.$axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    
  }
};
</script>

<style scoped>
/*
   * Sidebar
   */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 0; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: 100%;
  padding-top: 0.2rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
.navbar-login {
  color: white;
}
a {
  color: white;
}

a:hover {
  cursor: pointer;
}

a + a {
  border-left: 1px solid #999;
  padding-left: 2px;
}

#main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3rem;
  margin-bottom: 5rem;
}

body {
  font-size: 0.875rem;
}
#routerContainer {
  padding: 20px;
}
html {
  position: relative;
  min-height: 100%;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}
footer {
  padding: 0px;
    width: 100%;
    min-width: 110%;
    position: relative;
    bottom: 0;
  height: 35px; /* Set the fixed height of the footer here */
  line-height: 35px; /* Vertically center the text there */
  background-color: #f5f5f5;
}

.leftItem{
  margin:0 1em 3em 1em;
  
}
</style>
