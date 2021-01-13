import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  // lat: number
  // lng: number

  private map;

  constructor(private userService: UserService) { }

  ngAfterViewInit(): void {
   
    // this.lat = this.userService.lat
    // this.lng = this.userService.lng
    // console.log('lat', this.lat)
    this.initMap()
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  initMap(): void {

    this.map = L.map('map', {
      center: [this.userService.lat, this.userService.lng],
      zoom:18
    });
  }

}
