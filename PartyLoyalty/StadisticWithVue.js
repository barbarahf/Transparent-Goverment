var app = new Vue({  
  el: '#app',  
  created: function(){
    if (
      location.pathname == "/PartyLoyalty/partyloyaltySENATE.html"  
  ) {
      this.getApi('https://api.propublica.org/congress/v1/113/senate/members.json');
  } else if (
      location.pathname == "/PartyLoyalty/partyloyaltyHOUSE.html"
  ) {
      this.getApi('https://api.propublica.org/congress/v1/113/house/members.json');
  }
    
  },
  data: {
      members: [],   
      PorcentajeInd: [],
      PorcentajeD: [],
      PorcentajeR: [],

      theMembersLeats: [],

      tenPctOfLength: [],
      
      leastEngagedArray: [],
      leastLoyal: [],
     
  },
  
  
  methods: {
      /*fetch*/
       getApi(link){
         
          fetch(link, {
              headers: {
                  'X-API-Key': "va2DpGEAbXjz1TDTl7uvxFpXxkjkzKArtVdDkfo2"
              }
          })
          .then(response => response.json())
          .then(data => {
              this.members = data.results[0].members;
              this.filtrarPartidos (this.members, "votes_with_party_pct");
              this.sortMembers(this.members);
              this.tenPctOfLength = ((this.members.length * 10) / 100);
              this.mostMissedVotes(this.members);
 
              this.calcularPorcentajes10least(this.theMembersLeats);
          })
          .catch(error => error);
        },

      /*Filtros*/
        filtrarPartidos () {
          for (var i = 0; i<this.members.length; i++) {
              if (this.members[i].party == "R") {
                      this.PorcentajeR.push(this.members[i]["votes_with_party_pct"]);
                          }
                 else if (this.members[i].party == "D"){
                      this.PorcentajeD.push(this.members[i]["votes_with_party_pct"]);
                                     }
                  else  {  
                    this.PorcentajeInd.push(this.members[i]["votes_with_party_pct"]);
                 }
            }
          },
          /*Funcion calcular %*/
        calcularporcentajes: function (PorcentajesDIR){
          var sum= 0;
              for (var i=0; i<PorcentajesDIR.length; i++){
                  sum+= PorcentajesDIR[i];  
                       }
                  return sum/PorcentajesDIR.length;
                      },
 

       /*Least loyal general*/ 
      sortMembers() {
          app.theMembersLeats = this.members.sort(function (a,b){
             return (b.missed_votes - a.missed_votes); 
                      });
           
  
                  },
                  
      mostMissedVotes: function (){
  
        for (var i = this.members.length - 1; i > this.members.length - this.tenPctOfLength - 1; i--) {
            app.leastEngagedArray.push(app.theMembersLeats[i])  
            }

          },       
    
          calcularPorcentajes10least(){
       
        for(i=0; i< this.theMembersLeats.length/10; i++){
         app.leastLoyal.push(this.members[i]);
         }
      },

    }
  })
   