import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { AddrPicked, UserService } from '../_services/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
// export class MapComponent implements AfterViewInit, OnChanges {
export class MapComponent implements OnInit, OnChanges {

  @Input() locSelected: AddrPicked

  map;

  constructor(private userService: UserService) { }

  // ngAfterViewInit(): void {
  ngOnInit(): void {
    // console.log('OnInit lat', this.locSelected)
    this.initMap()
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

  }

  ngOnChanges(): void {
    // console.log('onChange locSelected', this.locSelected.lat)
    this.map?.setView(new L.LatLng(this.locSelected.lat, this.locSelected.lng),17);
  }

  initMap(): void {
    // console.log('map lat', this.locSelected.lat)
    this.map = L.map('map', {
      center: [this.locSelected.lat, this.locSelected.lng],
      zoom: 18
    });
  }

}
