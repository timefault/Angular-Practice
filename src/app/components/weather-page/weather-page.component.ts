import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

/*
TODO:
      - refactor from the template an hourly weather component
*/

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
  zipcode: number | string = '';

  error: any;
  favoriteCities: any[] = [];

  constructor(public weatherService: WeatherService) { }


  ngOnInit(): void {
    this.getWeather();
    this.getCurrentLocation();
    console.log(`${this.lat}  ${this.lon}`);
    this.weatherService.getFavoriteCities().subscribe(cities => {
      this.favoriteCities = cities;
    });
  }


  getWeather(): void {
    // this.weatherData$ = this.weatherService.getWeatherDataByCoord(this.lat, this.lon);
    this.weatherData$ = this.weatherService.get5Day3HourWeatherDataByCoord(this.lat, this.lon);
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
    let weatherDataObserver = {
      next: (data: any) => {
        this.error = undefined;
        console.log(data);
        this.weatherService.addCityToFavorites(data.sys.id, data.name, data.coord);
      },
      error: (err: Error) => {
        console.log(err);
        this.error = err;
      },
      complete: () => { console.log("Done."); }
    };
    this.weatherData$ = this.weatherService.getWeatherDataByZipCode(this.zipcode);
    this.weatherData$?.subscribe(weatherDataObserver);
  }

  // if city is found, add to favorites array
  addCityToFavorites(id: number, name: string) {
    //check if city exists, add if not
    if (!this.favoriteCities.some(el => el.id == id)) {
      let city = {
        id,
        name
      };
      this.favoriteCities.push(city);
    }
    else
      console.log("[!] Debug: city exists");
    console.log("============");
    this.favoriteCities.forEach(a => console.log(`${a.id} ${a.name}`));
  }


  handleFavoriteCityClick(city: any) {
    console.log(`clicked and got ${city} `)
    this.weatherData$ = this.weatherService.getWeatherDataByCoord(city.coord.lat, city.coord.lon);
  }
}