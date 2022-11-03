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
  currentPosition!: { lat: number, lon: number };
  lat!: number;
  lon!: number;

  error: any;
  favoriteCities: any[] = [];

  compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];


  // weatherDataObserver = {
  //   next: (data: any) => {
  //     this.error = null;
  //     console.log(data);
  //     this.weatherService.addCityToFavorites(data.city.id, data.city.name, data.city.coord);
  //   },
  //   error: (err: Error) => {
  //     console.log(err);
  //     this.error = err;
  //   },
  //   complete: () => { console.log("Done."); }
  // };



  constructor(private weatherService: WeatherService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentPosition = this.activatedRoute.snapshot.data['currentLocation'];
    console.log(this.currentPosition);
    this.currentWeatherData$ = this.weatherService.getCurrentWeatherData();
    this.getWeather();  // when the view subscribes the request is made and the observables resolves
    // keep seperation of concerns
    // this.currentWeatherData$?.subscribe(this.weatherDataObserver);

    this.weatherService.getFavoriteCities().subscribe(cities => {
      this.favoriteCities = cities;
    });
  }

  getWeather(): void {
    this.weatherService.get5Day3HourWeatherDataByCoord(this.currentPosition.lat, this.currentPosition.lon);
    // this.forecastData$?.subscribe(data => {
    //   console.log(data);
    //   this.currentWeatherData = data;
    // });
  }

  handleSubmit(zipcode: string) {
    let zipcodeInt = parseInt(zipcode);
    console.log("++++++++++++++++" + zipcodeInt);
    if (isNaN(zipcodeInt)) {
      this.error = {
        error: { message: "Please enter a valid zipcode" }
      }
      return;
    }
    else this.weatherService.getWeatherDataByZipCode(zipcodeInt);
    // let zipcodeObserver = {
    //   next: (data: any) => {
    //     this.currentWeatherData$?.subscribe(this.weatherDataObserver);

    //   },
    //   error: (err: Error) => { this.error = err; },
    //   complete: () => { "Successfully translated zipcode to coordinates." }
    // };

    //   this.weatherService.getCoordsFromZipCode(zipcodeInt)
    //     .subscribe(zipcodeObserver)
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
    this.weatherService.get5Day3HourWeatherDataByCoord(city.coord.lat, city.coord.lon);
  }

  getWindDirection(angle: number) {
    let index = Math.floor(angle / 22.5);
    return this.compassSector[index];
  }
}