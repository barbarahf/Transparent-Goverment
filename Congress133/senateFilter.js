let objeto = { method: 'GET',
headers: {
    'X-API-Key': "va2DpGEAbXjz1TDTl7uvxFpXxkjkzKArtVdDkfo2"
}
}

fetch('https://api.propublica.org/congress/v1/113/senate/members.json', objeto)
.then(function(response) {
return response.json();
})
.then(function(data) {
// console.log(data);
app.senators = data.results[0].members;
app.allMembers = data.results[0].members;
 
recorrerEstados(data.results[0].members);
})
.catch(err=>console.log())
//-----fetch----------------------------------------fetch------------------------------------//
var app = new Vue({  
    el: '#app',  
    data: {
        allMembers: [],   
        senators: [],
        checkedBox: [],
        SelectValue: "all",
    },
    methods: {
        //   greet: function () {
        //     this.senators =  filtrarPartyVue(this.allMembers, this.checkedBox);
        //   },

        //   filtro: function (){
             
        //     this.senators = this.allMembers.filter(match => match.state === this.SelectValue || this.SelectValue == "all");  
        //  }
        },
        computed:{
          filteredMembers(){
           return this.allMembers.filter(match => {
             let stateFilter = match.state === this.SelectValue || this.SelectValue == "all";
             let partyFilter = this.checkedBox.includes(match.party) || this.checkedBox.length == 0;

             return stateFilter && partyFilter;
           })
          }
        }
  })
  //Function para filtrar los members con checkbox//
//   function filtrarPartyVue(allMembers, checkedBox) {
//     let Membersfiltrados=[];
//       for (var i= 0; i< allMembers.length; i++) {
//           if(checkedBox.length == 0){
//             Membersfiltrados.push(allMembers[i]) 
//             }
//       for (var j= 0; j< checkedBox.length; j++) {
//             if(checkedBox[j] === allMembers[i].party ){
//               Membersfiltrados.push(allMembers[i]) 
//             } 
//         }
//     }
     
// return Membersfiltrados
//   }

  // function que PINTA el dropdown menu con JS//

  function recorrerEstados(TodosStates){
    let tabla = [];
    for (var i = 0; i<TodosStates.length; i++){
      //value states
      if(!tabla.includes(`<option value="${TodosStates[i].state}">${TodosStates[i].state}</option>`)){
        tabla.push(`<option value="${TodosStates[i].state}">${TodosStates[i].state}</option>`);
      }
    }
    tabla.sort();
    tabla.unshift(`<option value="all">All States</option>`)
    document.getElementById("mySelecty").insertAdjacentHTML("beforeend", tabla);

  }
   
  // recorrerEstados(data.results[0].members);
  