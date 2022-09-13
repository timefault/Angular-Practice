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
  lat = 33.52668453600432;
  lon = -81.83561253589173;
  zipcode: number = 0;


  constructor(public weatherService: WeatherService) { }


  ngOnInit(): void {
    this.getWeather();
    this.getCurrentLocation();
    console.log(`${this.lat}  ${this.lon}`);
  }


  getWeather(): void {
    this.weatherData$ = this.weatherService.getWeatherDataByCoord(this.lat, this.lon);
    this.weatherData$?.subscribe(data => {
      console.log(data);
    });
  }


  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state === 'granted' || result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(position => {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;
            console.log(`${this.lat}  ${this.lon}`);
          });
        }
      });
    }
  }

  handleSubmit() {
    this.weatherData$ = this.weatherService.getWeatherDataByZipCode(this.zipcode);
  }

}