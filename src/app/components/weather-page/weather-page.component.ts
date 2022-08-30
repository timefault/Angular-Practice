import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})
export class WeatherPageComponent implements OnInit {
  weatherData$?: Observable<any>;
  // weatherData: any;

  lat = 33.52668453600432;
  lon = -81.83561253589173;

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }
  getWeather() {
    this.weatherData$ = this.weatherService.getWeatherDataByCoord(this.lat, this.lon);
    this.weatherData$?.subscribe(data => {
      console.log(data);
    });
  }

}
