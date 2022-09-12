import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API_KEYS } from '../../../api_keys';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  REST_API = 'https://api.openweathermap.org/data/2.5/weather';
  headers = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  // geo data
  // api key
  API_KEY = API_KEYS.weather;

  // units
  units = 'imperial';
  constructor(public httpClient: HttpClient) { }

  getWeatherDataByCoord(lat: number, lon: number): any {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'imperial')
      .set('appid', this.API_KEY);

    return this.httpClient.get(this.REST_API, { params });
  }
}
