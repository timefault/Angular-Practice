import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IAction } from '../classes/action.model';

@Injectable({
  providedIn: 'root'
})
export class MainComponentService {
  mainComponentMethods$?: Observable<IAction[]>;

  constructor() { }
  subject = new Subject<any>();
  data$ = this.subject.asObservable();
  getMessage() {
    return this.data$;
  }
  sendMessage(data: any) {
    this.subject.next(data);
  }
}