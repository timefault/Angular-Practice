import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherService } from '../services/weather.service';

@Injectable({
  providedIn: 'root'
})
export class GetCurrentLocationGuard implements Resolve<any>{
  constructor(private weatherService: WeatherService) { }
  resolve() {
    return this.weatherService.getCurrentLocation();
  }
}
