import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_KEYS } from '../../../api_keys';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';


@Injectable({

  providedIn: 'root'

})


export class WeatherService {

  REST_API = 'https://api.openweathermap.org/data/2.5/weather';

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
  addCityToFavorites(id: number, name: string) {
    //check if city exists, add if not
    if (!this.favoriteCities.some(el => el.id == id)) {
      let city = {
        id,
        name
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
    return this.httpClient.get(this.REST_API, { params });
    // should a service autonomously change its state
    // , or should this action be requested from the component?
    //      + from the component, this action can be called from a non-error state
  }


  getWeatherDataByZipCode(zipcode: number) {
    let params = new HttpParams()
      .set('zip', zipcode)
      .set('units', 'imperial')
      .set('appid', this.API_KEY);
    return this.httpClient.get(this.REST_API, { params });
  }


}