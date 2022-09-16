import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.css']
})
export class HourlyWeatherComponent implements OnInit {

  @Input() weatherData: any;
  compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
  constructor(private weatherService: WeatherService) { }
  getWindDirection(angle: number) {
    let index = Math.floor(angle / 22.5);
    return this.compassSector[index];
  }
  ngOnInit(): void {
  }

}
