<template>
    <div >
        <vuetable id="tableContainer" ref="vuetable"
             detail-row-component="my-detail-row"   
           
            api-url="http://localhost:63419/api/X/SearchX"
            :fields="['title','posterName','cityName','price','postDate']"
            pagination-path=""
            :per-page="20"
            @vuetable:pagination-data="onPaginationData"
            @vuetable:row-clicked="onCellClicked" 
            :append-params="moreParams" 
        ></vuetable>
        <vuetablePagination ref="pagination" 
            :css="css.pagination"
            @vuetable-pagination:change-page="onChangePage"
        ></vuetablePagination>
                                        
    </div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2'
import {VuetablePagination, VuetablePaginationInfo} from 'vuetable-2'
import DetailRow from './DetailRow'
Vue.component('my-detail-row', DetailRow)
export default {
    name: 'megatable',
    components:{
        Vuetable,
        VuetablePagination
    },
    data: function (){
        return {
        fields: [
        { 
            name: 'name', 
            title: '<span class="orange glyphicon glyphicon-user"></span> Full Name',
            sortField: 'name'
        }, 
        {
            name: 'email',
            title: 'Email',
            sortField: 'email'
        },
        'birthdate','nickname',
        {
            name: 'gender',
            title: 'Gender',
            sortField: 'gender'
        },
        '__slot:actions'
        ],
        sortOrder: [
        { field: 'message', direction: 'asc' }
        ],
        moreParams: {},
        css: {
        table: {
            tableClass: 'table table-striped table-bordered table-hovered',
            loadingClass: 'loading',
            ascendingIcon: 'glyphicon glyphicon-chevron-up',
            descendingIcon: 'glyphicon glyphicon-chevron-down',
            handleIcon: 'glyphicon glyphicon-menu-hamburger',
        },
        pagination: {
            infoClass: 'pull-left',
            wrapperClass: 'vuetable-pagination pull-right',
            activeClass: 'btn-primary',
            disabledClass: 'disabled',
            pageClass: 'btn btn-border',
            linkClass: 'btn btn-border',
            icons: {
            first: '',
            prev: '',
            next: '',
            last: '',
            },
        }
        }
        }
    },
    mounted() {
        this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
        this.$events.$on('category-set', e => this.onCategorySet(e))
    },
    methods:{
        onPaginationData (paginationData) {
            this.$refs.pagination.setPaginationData(paginationData)
        },
        onChangePage (page) {
            this.$refs.vuetable.changePage(page)
        },
        onFilterSet (filterText) {
            console.log('filter-set', filterText)
            this.moreParams = {'filter': filterText};
            Vue.nextTick( () => this.$refs.vuetable.refresh())
        },
        onCategorySet (category) {
            console.log('category-set', category)
            this.moreParams = {'categoryId': category};
            Vue.nextTick( () => this.$refs.vuetable.refresh())
        },
        onCellClicked (data) {
            console.log(data.id)
            this.$refs.vuetable.toggleDetailRow(data.data.id)
        }
    }
}
</script>

<style>
.table td{
 padding: 0.3rem
}
#tableContainer{
     text-align: left;
}

</style>