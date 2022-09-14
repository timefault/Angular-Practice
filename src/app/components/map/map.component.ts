import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { API_KEYS } from '../../../../api_keys';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  //  TODO:
  //    - add map service

  map?: Map;
  constructor() { }
  API_KEY = API_KEYS.tomorrow_io;
  TIMESTAMP = (new Date()).toISOString();
  DATA_FIELD = 'precipitationIntensity';

  getTiles(latitude: number, longitude: number, tileSize: number, zoom: number) {
    var sinLatitude = Math.sin(latitude * Math.PI / 180);
    var pixelX = ((longitude + 180) / 360) * tileSize * Math.pow(2, zoom);
    var pixelY = (0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI)) * tileSize * Math.pow(2, zoom);
    var tileX = Math.floor(pixelX / tileSize);
    var tileY = Math.floor(pixelY / tileSize);
    return [tileX, tileY];
  }

  ngOnInit(): void {
    this.initMap();
  }
  initMap() {
    this.map =
      new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
          }),
          new TileLayer({
            source: new XYZ({
              // url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${this.API_KEY}`
              url: `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${this.DATA_FIELD}/${this.TIMESTAMP}.png?apikey=${this.API_KEY}`
            })
          })
        ],
        view: new View({
          // center: [0, 0],
          center:

            fromLonLat([-81.83672833499388, 33.5282228671408])
          ,
          zoom: 7
        })
      });

  }
}