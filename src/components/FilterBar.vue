  <template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <a
      class="text-white navbar-brand d-none d-md-block col-sm-3 col-md-2 mr-0"
      v-on:click="reset()"
      to="/"
    > karasayfa.com</a>
    <input
      class="form-control form-control-dark w-100"
      type="text"
      placeholder="Search"
      v-model="filterText"
      @keyup.enter="doFilter"
    >
    <div id="navigation" class=" d-none d-md-block col-sm-3 col-md-2 mr-0 text-nowrap">
      <ul class="navbar-nav">
        <li class="nav-item" v-show="!isLoggedIn">
          <router-link class="navbar-login text-white" to="signin">Giris</router-link>
          <router-link class="navbar-login text-white" to="signup">&nbsp;Uye Ol</router-link>
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
    this.$events.$on("search-query-updated", eventData =>
      this.onQueryUpdated(eventData)
    );
  },
  methods: {
    onQueryUpdated(data) {
      if (data["filter"]) {
        this.filterText = data["filter"];
        this.$root.strs["filter"] = this.filterText;
      }
    },
    reset() {
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
      if(this.filterText.length<3 && this.filterText.length >0 )
      {
        this.$notify({
                    type: 'info',
                    group: "foo",
                    title: "arama kriteri",
                    text: "Arama kriteri 3 harf den az olamaz"
        });
       return;
      }
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
