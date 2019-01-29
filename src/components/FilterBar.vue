  <template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <a
      class="text-white navbar-brand d-none d-md-block col-sm-3 col-md-2 mr-0"
      v-on:click="reset()"
      to="/"
    >karasayfa.com</a>
    <input
      class="form-control form-control-dark w-100"
      type="text"
      placeholder="Search"
      v-model="filterText"
      @keyup.enter="doFilter"
    >
    <div id="navigation" class="col-lg-1 col-md-2 text-nowrap">
      <ul class="navbar-nav">
        <li class="nav-item" v-show="!isLoggedIn">
          <router-link class="navbar-login text-white" to="signin">Giris</router-link>
          <router-link class="navbar-login text-white" to="signup">Uye Ol</router-link>
        </li>
      </ul>
      <a class="text-white" v-show="isLoggedIn" v-on:click="signOut()">Cikis yap {{name}}</a>
    </div>
  </nav>
</template>

  <script>
export default {
  data() {
    return {
      filterText: ""
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    name() {
      return this.$store.getters.name;
    }
  },
  mounted() {
    this.$events.$on("filters-cleared", eventData =>
      this.onFiltersCleared(eventData)
    );
  },
  methods: {
    reset() {
      console.log("1");
      this.$events.fire("filters-cleared");
    },
    onFiltersCleared(eventData) {
      this.filterText = "";
    },
    signOut() {
      this.$store.commit("logout");
      this.$axios.defaults.headers.common["Authorization"] = "";
      this.$router.push("/");
    },
    doFilter() {
      this.$root.strs["filter"] = this.filterText;
      this.$root.routeme();
      // console.log("doFilter:", this.filterText);
      // this.$router.push("/?s=filter-"+this.filterText);
      // // this.$events.fire("filter-set", this.filterText);
    }
  }
};
</script>
<style scoped>
.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
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
</style>
