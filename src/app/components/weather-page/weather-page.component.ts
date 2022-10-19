import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

/*
TODO:
        - cache data, use for favorites list
        - restructure template to make weatherData$ component global
        
*/

@Component({

  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']

})

export class WeatherPageComponent implements OnInit {

  forecastData$?: Observable<any>;
  currentWeatherData$?: Observable<any>;
  // weatherData: any;
  currentPosition!: { lat: number, lon: number };
  lat!: number;
  lon!: number;
  // zipcode: number;

  error: any;
  favoriteCities: any[] = [];

  compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];

  constructor(private weatherService: WeatherService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    // this.lat = 33.52668453600432;
    // this.lon = -81.83561253589173;
    this.currentPosition = this.activatedRoute.snapshot.data['currentLocation'];
    console.log(this.currentPosition);
    // get current coordinates from service

    this.getWeather();
    // console.log(`${this.lat}  ${this.lon}`);
    this.weatherService.getFavoriteCities().subscribe(cities => {
      this.favoriteCities = cities;
    });
  }


  getWeather(): void {
    // this.weatherData$ = this.weatherService.getWeatherDataByCoord(this.lat, this.lon);
    this.forecastData$ = this.weatherService.get5Day3HourWeatherDataByCoord(this.currentPosition.lat, this.currentPosition.lon);
    this.forecastData$?.subscribe(data => {
      console.log(data);
    });
  }


  // getCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.permissions.query({ name: 'geolocation' }).then(result => {
  //       if (result.state === 'granted' || result.state === 'prompt') {
  //         navigator.geolocation.getCurrentPosition(position => {
  //           console.log('setting current position');
  //           this.lat = position.coords.latitude;
  //           this.lon = position.coords.longitude;
  //           console.log(`${this.lat}  ${this.lon}`);
  //         });
  //       }
  //     });
  //   }
  // }

  handleSubmit(zipcode: string) {
    let zipcodeInt = parseInt(zipcode);
    console.log("++++++++++++++++" + zipcodeInt);
    if (isNaN(zipcodeInt)) {
      this.error = {
        error: { message: "Please enter a valid zipcode" }
      }
      return;
    }
    let zipcodeObserver = {
      next: (data: any) => {
        this.forecastData$ = this.weatherService.get5Day3HourWeatherDataByCoord(data.lat, data.lon)
        this.forecastData$.subscribe(weatherDataObserver);

      },
      error: (err: Error) => { this.error = err; },
      complete: () => { "Successfully translated zipcode to coordinates." }
    };

    let weatherDataObserver = {
      next: (data: any) => {
        this.error = undefined;
        console.log(data);
        this.weatherService.addCityToFavorites(data.city.id, data.city.name, data.city.coord);
      },
      error: (err: Error) => {
        console.log(err);
        this.error = err;
      },
      complete: () => { console.log("Done."); }
    };
    this.weatherService.getCoordsFromZipCode(zipcodeInt)
      .subscribe(zipcodeObserver)
    // .subscribe(weatherDataObserver)
  };


  // if city is found, add to favorites array
  addCityToFavorites(id: number, name: string, coord: any) {
    //check if city exists, add if not
    if (!this.favoriteCities.some(el => el.id == id)) {
      let city = {
        id,
        name,
        coord
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
    this.forecastData$ = this.weatherService.get5Day3HourWeatherDataByCoord(city.coord.lat, city.coord.lon);
  }

  getWindDirection(angle: number) {
    let index = Math.floor(angle / 22.5);
    return this.compassSector[index];
  }
}