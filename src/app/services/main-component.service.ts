import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAction } from '../classes/action.model';

@Injectable({
  providedIn: 'root'
})
export class MainComponentService {
  mainComponentMethods$?: Observable<IAction[]>;  // link to activated route observable

  constructor() { }

  trackMainComponentMethods() { }
  getMainComponentMethods() { }

}