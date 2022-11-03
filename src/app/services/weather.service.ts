import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_KEYS } from '../../../api_keys';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';


@Injectable({

  providedIn: 'root'

})


export class WeatherService {

  REST_API_WEATHER = 'https://api.openweathermap.org/data/2.5/weather';
  REST_API_FORCAST = 'https://api.openweathermap.org/data/2.5/forecast';
  REST_API_GEOCODE = 'http://api.openweathermap.org/geo/1.0/zip';

  headers = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  // api key
  API_KEY = API_KEYS.open_weather;
  // units
  units = 'imperial';

  _currentWeatherData = new BehaviorSubject<any>(undefined);
  currentWeatherData$: Observable<any> = this._currentWeatherData.asObservable();
  currentWeatherData: any = {};

  _favoriteCities = new BehaviorSubject<any[]>([]);
  favoriteCities$: Observable<any[]> = this._favoriteCities.asObservable();
  favoriteCities: any[] = [];

  _currentCoords = new BehaviorSubject<number[]>([]);
  currentCoords$: Observable<number[]> = this._currentCoords.asObservable();
  currentCoords!: { lat: number, lon: number };



  weatherDataObserver = {
    next: (data: any) => {
      this._currentWeatherData.next(data);
      this.addCityToFavorites(data.city.id, data.city.name, data.city.coord);
      console.log(data);
    },
    error: (err: Error) => {
      console.log(err);
      // this.error = err;
    },
    complete: () => { console.log("Done."); }
  };



  constructor(private httpClient: HttpClient) { }

  getCurrentLocation(cb: any): { lat: number, lon: number } | void {
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state === 'granted' || result.state === 'prompt') {
          return navigator.geolocation.getCurrentPosition(position => {
            let coords: { lat: number, lon: number } =
            {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            }
            cb(coords);
          }
          );
        }
      });
    }
  }

  getCurrentWeatherData() {
    return this.currentWeatherData$;
  }

  getFavoriteCities() {
    return this.favoriteCities$;
  }
  // if city is found, add to favorites array
  addCityToFavorites(id: number/* not city id */, name: string, coord: any) {
    //check if city exists, add if not
    if (!this.favoriteCities.some(el => el.id == id)) {
      let city = {
        id,
        name,
        coord
      };
      this.favoriteCities.push(city);
      this._favoriteCities.next(this.favoriteCities);
    }
    else
      console.log("[!] Debug: city exists");
    console.log("============");
    this.favoriteCities.forEach(a => console.log(`${a.id} ${a.name}`));
  }

  getWeatherDataByCoord(lat: number, lon: number): any {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'imperial')
      .set('appid', this.API_KEY);
    return this.httpClient.get(this.REST_API_WEATHER, { params });
    // should a service autonomously change its state
    // , or should this action be requested from the component?
    //      + from the component, this action can be called from a non-error state
  }


  getWeatherDataByZipCode(zipcode: number | string) {
    let params = new HttpParams()
      .set('zip', zipcode)
      .set('units', 'imperial')
      .set('appid', this.API_KEY);
    this.httpClient.get(this.REST_API_WEATHER, { params }).subscribe(
      this.weatherDataObserver
    );
  }


  getWeatherDataByCityId(id: number) {
    let params = new HttpParams()
      .set('id', id)
      .set('units', 'imperial')
      .set('appid', this.API_KEY);
    return this.httpClient.get(this.REST_API_WEATHER, { params });
  }


  get5Day3HourWeatherDataByCoord(lat: number, lon: number) {
    this.saveCurrentCoords(lat, lon);
    // this._currentCoords.next([lon, lat]);
    console.log(`===========\n coords lat: ${lat}  lon: ${lon}`);
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'imperial')
      .set('cnt', 17)
      .set('appid', this.API_KEY);

    this.httpClient.get(this.REST_API_FORCAST, { params }).subscribe(
      this.weatherDataObserver
    );
  }


  getCoordsFromZipCode(zip: number): any {
    let params = new HttpParams()
      .set('zip', zip)
      .set('appid', this.API_KEY);
    return this.httpClient.get(this.REST_API_GEOCODE, { params });
  }

  saveCurrentCoords(lat: number, lon: number) {
    this.currentCoords = {
      lat: lat,
      lon: lon
    }
    this._currentCoords.next([lon, lat]);

  }
  getCurrentCoords() {
    return this.currentCoords$;
  }
}