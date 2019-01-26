<template>
  <div>
    <div v-show="loading" class="overlay flex flex-column items-center justify-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <vuetable
      id="tableContainer"
      ref="vuetable"
      detail-row-component="my-detail-row"
      api-url="http://localhost:63419/api/X/SearchX"
      :fields="fields"
      pagination-path
      :http-options="httpOptions"
      :css="css.table"
      :per-page="20"
      @vuetable:pagination-data="onPaginationData"
      @vuetable:cell-clicked="onCellClicked"
      @vuetable:loading="onLoading"
      @vuetable:loaded="onLoaded"
      :append-params="moreParams"
    >
      <div slot="gender-slot" slot-scope="props">
        <!-- <button class="ui basic button" @click="itemAction('view-item', rowData, rowIndex)">
       <font-awesome-icon icon="coffee" />
        </button>-->
        <button
          @click="itemAction('delete-item', props.rowData, props.rowIndex)"
          data-toggle="tooltip"
          data-placement="right"
          title="Ilani kapat"
        >
          <font-awesome-icon icon="minus-circle"/>
        </button>
      </div>
    </vuetable>
    <vuetable-pagination
      ref="pagination"
      :css="css.pagination"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>
  </div>
</template>

<script>
import moment from "moment";
import Vue from "vue";
import Vuetable from "vuetable-2";
import { VuetablePagination, VuetablePaginationInfo } from "vuetable-2";
import DetailRow from "./DetailRow";

Vue.component("my-detail-row", DetailRow);

export default {
  name: "megatable",
  components: {
    Vuetable,
    "vuetable-pagination": VuetablePagination,
    VuetablePaginationInfo
  },
  props: {
    mymessages: false,
    search: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      pageEverLoaded: false,
      httpOptions: {
        headers: {
          Authorization: this.$axios.defaults.headers.common["Authorization"]
        }
      },
      loading: true,
      fields: [
        {
          name: "title",
          title: "Baslik"
        },
        ,
        {
          name: "posterName",
          title:
            '<span class="orange glyphicon glyphicon-user"></span> Kullanici adi'
        },
        ,
        {
          name: "cityName",
          title: "Sehir"
        },
        {
          name: "price",
          title: "Fiyat"
        },
        {
          name: "postDate",
          title: "Ilan tarihi",
          formatter(value) {
            return moment(String(value)).format("hh:mm DD/MM/YY");
          }
        },
        {
          visible: this.mymessages,
          name: "gender-slot",
          title: "Islem",
          titleClass: "center aligned",
          dataClass: "center aligned",
          width: "8em"
        }
      ],
      sortOrder: [{ field: "postdate", direction: "desc" }],
      moreParams: {},
      css: {
        table: {
          tableClass: "table table-striped table-bordered table-hovered",
          loadingClass: "loading",
          ascendingIcon: "glyphicon glyphicon-chevron-up",
          descendingIcon: "glyphicon glyphicon-chevron-down",
          handleIcon: "glyphicon glyphicon-menu-hamburger"
        },
        pagination: {
          infoClass: "pull-left",
          wrapperClass: "vuetable-pagination pull-right",
          activeClass: "active large",
          disabledClass: "disabled",
          pageClass: "btn btn-border",
          linkClass: "btn btn-border",
          icons: {
            first: "",
            prev: "",
            next: "",
            last: ""
          }
        }
      }
    };
  },
  mounted() {
    // this.$events.$on("filter-set", eventData => this.onFilterSet(eventData));
    // this.$events.$on("category-set", e => this.onCategorySet(e));
  },
  watch: {
    mymessages: {
      immediate: true,
      // watch it
      handler(val, oldVal) {
        this.moreParams = { mymessages: this.mymessages };
      }
    },
    search: {
      immediate: true,
      handler(val, oldVal) {
        if (this.mymessages) return;
        var words = val.split(",");
        var objo = {};
        words.forEach(function(element) {
          var objec = element.split("-");
          objo[objec[0]] = objec[1];
        });
        console.log(objo);
        this.moreParams = objo;
        Vue.nextTick(() => this.$refs.vuetable.refresh());
      }
    }
  },
  methods: {
    formatDate(value) {
      console.log(value);
      return moment(String(value)).format("MM/DD/YY hh:mm");
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    // onFilterSet(filterText) {
    //   console.log("filter-set", filterText);
    //   this.moreParams = { filter: filterText };
    //   //this.$refs.vuetable.refresh();
    //   Vue.nextTick(() => this.$refs.vuetable.refresh());
    // },
    // onCategorySet(e) {
    //   console.log("category-sext", e);
    //   this.moreParams = { categoryId: e.id, tosell: e.tosell };
    //   // this.$refs.vuetable.refresh();
    //   Vue.nextTick(() => this.$refs.vuetable.refresh());
    // },
    onCellClicked(data) {
      this.$refs.vuetable.toggleDetailRow(data.data.id);
    },
    onLoading() {
      console.log("loading");
      this.loading = true;
    },
    onLoaded() {
      this.loading = false;
    },
    itemAction(operation, rowData, rowIndex) {
      switch (operation) {
        case "delete-item":
          console.log(rowData);
          this.$axios.delete("/X/" + rowData.id).then(response => {
            console.log("notifiy");
            this.$notify({
              group: "foo",
              title: "Silindi",
              text: "Ilaniniz silindi!"
            });
          });

          break;
      }
    }
  }
};
</script>

<style>
.orange.glyphicon {
  color: orange;
}

.table td {
  padding: 0.3rem;
}
#tableContainer {
  text-align: left;
}
.overlay {
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  /* bottom: 0%; right: 0%; */
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.03);
  /*dim the background*/
}
.flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.custom-actions button.ui.button {
  padding: 8px 8px;
}
.custom-actions button.ui.button > i.icon {
  margin: auto !important;
}
</style>