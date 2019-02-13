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
      :api-url="apiUrl"
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
import * as config from "../config";

Vue.component("my-detail-row", DetailRow);

export default {
  name: "megatable",
  components: {
    Vuetable,
    "vuetable-pagination": VuetablePagination,
    VuetablePaginationInfo
  },
  computed: {
    apiUrl() {
      return config.apiHost + "/X/SearchX";
    }
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
      firstload: true,
      httpOptions: {
        headers: {
          Authorization: this.$axios.defaults.headers.common["Authorization"]  !== undefined ? this.$axios.defaults.headers.common["Authorization"] : ''
        }
      },
      loading: true,
      fields: [
          {
          name: "toSell",
          title: '<i class="fa fa-shower" aria-hidden="true"></i>',
              formatter(value) {
             if(value ==true)return '<b class="tooltipx" style=" color: #47a563;">s<span class="tooltiptext">satilik</span></b>';
            return '<b class="tooltipx" style=" color: #a01e29;">a<span class="tooltiptext">alinik</span></b>';
          }
        },
        {
          name: "title",
          title:'<span class="fa fa-check"><b>Baslik</b></span> '
        },
        ,
        {
          name: "posterName",
          title: '<span class="fa fa-user"><b>Kullanici</b></span> '
        },
        ,
        {
          name: "cityName",
          title:  '<span class="fa fa-map-marker"><b>Sehir</b></span> '
        },
        {
          name: "price",
          title:  '<span class="fa fa-try"><b>Fiyat</b></span> ',
           formatter(value) {
             if(value ==0)return 0;
            return value +"TL";
          }
        },
        {
          name: "postDate",
          title:  '<span class="fa fa-calendar"><b>Tarih</b></span> ',
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
          wrapperClass: "pull-right",
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
        var words = val.split("_");
        var objo = {};
        words.forEach(function(element) {
          var objec = element.split("-");
          objo[objec[0]] = objec[1];
        });
        this.moreParams = objo;
        if (!this.firstload) {
          Vue.nextTick(() => this.$refs.vuetable.refresh());
        } else {
          this.firstload = false;
        }
      }
    }
  },
  methods: {
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    onCellClicked(data) {
      this.$refs.vuetable.toggleDetailRow(data.data.id);
    },
    onLoading() {
      console.log("loading");
      this.loading = true;
    },
    onLoaded() {
      this.$events.fire("search-query-updated", this.moreParams);
      this.loading = false;
    },
    itemAction(operation, rowData, rowIndex) {
      switch (operation) {
        case "delete-item":
          this.$axios.delete("/X/" + rowData.id).then(response => {
            this.$notify({
              group: "foo",
              title: "Silindi",
              text: "Ilaniniz silindi!"
            });
            this.$refs.vuetable.refresh();
          });
          break;
      }
    }
  }
};
</script>
<style>
.table td {
  padding: 0.3rem !important;
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
.table th{
  padding: 0.25em !important;
}
.vuetable-th-gutter{
  visibility: hidden;
}
.active{
  font-weight: bold;
  background-color: lightgrey;
}

.vuetable th#_posterName {
     width: 8em;
}
 
.vuetable th#_cityName {
     width: 6em;
}
 
.vuetable th#_postDate {
     width: 8em;
}
.vuetable th#_price {
     width: 5em;
}
.vuetable th#_toSell {
     width: 1em;
}
b{
  font-weight: bold;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

/* Tooltip text */
.tooltipx .tooltiptext {
  visibility: hidden;
  width: 60px;
  background-color: #6c757d;
  color: rgb(243, 243, 243);
  text-align: center;
  padding: 1px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltipx:hover .tooltiptext {
  visibility: visible;
}
</style>