import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import {MdSidenav, MdDialog, MdDialogConfig} from "@angular/material";
import { MarkerService } from './services/marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkerService]
})
export class AppComponent {
  //Zoom level
  zoom: number = 10;
  //start Position
  lat: number = 19.111661;
  lng: number = 72.946088;
  //Add Marker
  markerName: string;
  markerLat: string;
  markerLng: string;
  markerDraggable: string;
  
  markers: marker[] = [];

  constructor(private _markerService: MarkerService){
    this.markers = this._markerService.getMarkers();
  }
  
  clickedMarker(marker:marker, index:number){
    console.log('Clicked Marker: '+marker.name+' at index '+index);
  }
  mapClicked($event: any){
    console.log('Map Clicked');
    var newMarker = {
      name: "untitled",
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }

    this.markers.push(newMarker);
  }
  markerDragEnd(marker: any, $event: any){
    console.log('markend', marker, $event);
    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }
    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;
    this._markerService.updateMarker(updMarker, newLat, newLng);
  }
  
  addMarker(){
    console.log("addming marker");
    if (this.markerDraggable === "yes") {
      var isDraggable = true;
    } else {
      var isDraggable = false;
    }

    var newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: isDraggable
    }

    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
  }
  removeMarker(marker){
    console.log('Removing Marker...');
    for(var i = 0;i < this.markers.length;i++){
      if(marker.lat == this.markers[i].lat && marker.lng == this.markers[i].lng){
        this.markers.splice(i, 1);
      }
    }
    
    this._markerService.removeMarker(marker);
  }
}
  //Marker Type
  interface marker{
   name?: string;
   lat: number;
   lng: number;
   draggable: boolean; 
  }