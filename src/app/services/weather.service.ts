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

  headers = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  // api key
  API_KEY = API_KEYS.open_weather;
  // units
  units = 'imperial';

  _favoriteCities = new BehaviorSubject<any[]>([]);
  favoriteCities$: Observable<any[]> = this._favoriteCities.asObservable();
  favoriteCities: any[] = [];

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


  constructor(public httpClient: HttpClient) { }


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
    return this.httpClient.get(this.REST_API_WEATHER, { params });
  }


  getWeatherDataByCityId(id: number) {
    let params = new HttpParams()
      .set('id', id)
      .set('units', 'imperial')
      .set('appid', this.API_KEY);
    return this.httpClient.get(this.REST_API_WEATHER, { params });
  }


  get5Day3HourWeatherDataByCoord(lat: number, lon: number) {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'imperial')
      .set('appid', this.API_KEY);
    return this.httpClient.get(this.REST_API_FORCAST, { params });
  }
}