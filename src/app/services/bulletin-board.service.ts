import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BulletinBoardService {

  REST_API = "http://localhost:3000/";
  headers: HttpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  constructor(public httpClient: HttpClient) { }

  getAllPosts(): Observable<any> {
    let endpoint = this.REST_API;

    return this.httpClient.get(endpoint);
  }

}
