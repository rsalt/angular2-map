export class Init{
    load(){
        if(localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined){
            console.log("No marker found");
            var markers = [
                {
                    name: 'Mastek Ltd.',
                    lat: 19.1113472,
                    lng: 73.0156135,
                    draggable: true  
                  },
                  {
                    name: 'Nookar Nation.',
                    lat: 19.1112421,
                    lng: 73.0157436,
                    draggable: true  
                  },
                  {
                    name: 'Domino\'s Pizaa',
                    lat: 19.1112421,
                    lng: 73.0157436,
                    draggable: true
                  }
            ];
            localStorage.setItem('markers', JSON.stringify(markers));
        }else{
            console.log("Loading Markers");
        }
    }
}