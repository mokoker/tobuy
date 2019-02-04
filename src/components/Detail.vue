<template>
  <div id="detail">
    <detailrow v-bind:rowData="value"/>
  </div>
</template>
<script>
import detailrow from "./DetailRow";
export default {
  name: "detail",
  props: {
    id: {
      type: Number,
      default: 1
    }
  },
  computed: {},
  components: {
    detailrow
  },
  data: function() {
    return {
      value: {},
      errorMessage: "",
      itemToAdd: { title: "", message: "", categoryId: 0}
    };
  },
  created: function() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      this.$axios
        .get("/X/" + this.id)
        .then(response => {
          console.log(response);
          this.value = response.data;
        })
        .catch(error => {
          console.log(error);
          switch (error.response.status) {
            case 401: {
            }
          }
        });
    }
  }
};
</script>
<style scoped>
#detail {
  text-align: left;
}
</style>