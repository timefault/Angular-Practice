import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

/*
TODO:
        - cache data, use for favorites list
        - restructure template to make weatherData$ component global
        - solar events show time for east coast time zone
        
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


  constructor(private weatherService: WeatherService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentPosition = this.activatedRoute.snapshot.data['currentLocation'];
    console.log(this.currentPosition);
    this.currentWeatherData$ = this.weatherService.getCurrentWeatherData();
    this.getWeather();

    this.weatherService.getFavoriteCities().subscribe(cities => {
      this.favoriteCities = cities;
    });
  }

  getWeather(): void {
    this.weatherService.get5Day3HourWeatherDataByCoord(this.currentPosition.lat, this.currentPosition.lon);
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
    else {
      this.weatherService.getCoordsFromZipCode(zipcodeInt).subscribe((data: any) => {
        let lat = data.lat;
        let lon = data.lon;
        this.weatherService.get5Day3HourWeatherDataByCoord(lat, lon);
      });
    }
  }


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