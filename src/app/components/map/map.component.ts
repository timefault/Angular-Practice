import { Component, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { API_KEYS } from '../../../../api_keys';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  //  TODO:
  //    - add map service

  map?: Map;
  constructor(private weatherService: WeatherService) { }
  API_KEY = API_KEYS.tomorrow_io;
  TIMESTAMP = (new Date()).toISOString();
  DATA_FIELD = 'precipitationIntensity';

  ngOnInit(): void {
    this.weatherService.getCurrentCoords().subscribe(
      coords => {
        if (this.map)
          this.map.getView().setCenter(fromLonLat(coords));
        else
          this.initMap(coords);
      }
    );
  }

  initMap(coords: number[]) {
    console.log("[!] initialized map");
    console.log("++++++coords" + coords);
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
              url: `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${this.DATA_FIELD}/${this.TIMESTAMP}.png?apikey=${this.API_KEY}`
            })
          })
        ],
        view: new View({
          center:
            fromLonLat(coords)
          ,
          zoom: 7
        })
      });

  }
}