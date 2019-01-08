<template>
 <table>
      <thead>
        <tr>
          <th v-for="(key, index) in columns"
            @click="sortBy(key)"
            v-bind:style="{width :getWidth(index)}"
            :class="{ active: sortKey == key }">
            {{ key | capitalize }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="entry in filteredData">
          <td  v-for="key in columns">
            {{entry[key]}}
          </td>
        </tr>
      </tbody>
       </table>
</template>
<script>
export default {
      name: 'datatable',
      props: {
        data: Array,
        columns: Array,
        filterKey: String
      },
      data: function () {
        var sortOrders = {}
        this.columns.forEach(function (key) {
          sortOrders[key] = 1
        })
        return {
          sortKey: '',
          sortOrders: sortOrders
        }
      },
      computed: {
        filteredData: function () {
          var sortKey = this.sortKey
          var order = this.sortOrders[sortKey] || 1
          var data = this.data
              if (sortKey) {
            data = data.slice().sort(function (a, b) {
              a = a[sortKey]
              b = b[sortKey]
              return (a === b ? 0 : a > b ? 1 : -1) * order
            })
          }
          return data
        }
      },
      filters: {
        capitalize: function (str) {
          return str.charAt(0).toUpperCase() + str.slice(1)
        }
      },
      methods: {
        sortBy: function (key) {
          this.sortKey = key
          this.sortOrders[key] = this.sortOrders[key] * -1
        },
        getWidth: function (key) {
          var  gridWidths= ['15','50','10','10','5','10'];
          return gridWidths[key]+'%';
        }
      }
}
</script>
<style scoped>

  table {
    border: 1px solid rgb(150, 150, 150);
    border-radius: 3px;
    background-color: #999;
    table-layout: fixed;
    width: 100%;
  }
  
  th {
    background-color: #444;
    color: rgba(255,255,255,0.66);
    cursor: auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  td {
    background-color: #f9f9f9;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
  }
  
  th, td {
    min-width: 60px;
    padding: 10px 20px;
  }
  
  th.active {
    color: #fff;
  }
  
  th.active .arrow {
    opacity: 1;
  }
  
  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }
  
  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }
  
  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }

  tbody tr:nth-child(odd)  td{
    background-color: rgb(221, 219, 219);
 }

</style>