import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  REST_API = 'https://api.openweathermap.org/data/3.0/onecall';
  headers = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  // geo data
  lat = 33.52668453600432;
  lon = -81.83561253589173;
  // api key
  API_KEY = 'bf4d44fa559cfb3b741788bdce242c8d';
  // units
  units = 'imperial';
  constructor(public httpClient: HttpClient) { }

  getWeather() {
    return this.httpClient.get(`${this.REST_API}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}`);
  }
}
