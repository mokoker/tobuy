// <template>
// <div> 
//   <megatable/>
// </div>
// </template>

// <script>
// import datatable from './DataTable'
// import newitem from './NewItem'
// import megatable from './MegaTable'
// export default {
//   name: 'Main',
//   data () {
//     return {
//         page:1,
//         items: [{name : "x"},{name:"y"},{name:"z"}],
//         gridColumns: [ 'title','message','posterName','cityName','price','postDate'],
//       }
//   },
//   components:{
//     datatable,
//     newitem,
//     megatable
//   },
//   methods :{
//        getX(page =1,category = 0 )
//         {
//            this.$router.push('/');
//           fetch(`http://localhost:63419/api/X/SearchX?Page=${page}&CategoryId=${category}`)
//           .then((res) => res.json())
//           .then((data) => {
//             console.log('getx'+category);
//             this.items = data;
//           });
//         },
//         search(searchText)
//         {
//           if(searchText==="")
//             return;
//           this.$router.push('/');
//           fetch(`http://localhost:63419/api/X/DeepSearch?Page=${this.page}&Text=${this.searchText}`)
//           .then((res) => res.json())
//           .then((data) => {
//             console.log(data);
//             this.items = data;
//           });
//         },
//   },
//       created :function()
//        {
//           this.$root.$on('change', (id) => {
//             this.getX(1,id);
//           });
//            this.$root.$on('search', (searchText) => {
//             this.search(searchText);
//           });
//        }
// }
// </script>

// <!-- Add "scoped" attribute to limit CSS to this component only -->
// <style >
// body {
//     font-size: .875rem;
//   }
  
//   .feather {
//     width: 16px;
//     height: 16px;
//     vertical-align: text-bottom;
//   }
  
 
  



  
// </style>
