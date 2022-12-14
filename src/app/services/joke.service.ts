import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  // TODO:
  //    - add sticky settings

  REST_API = 'https://v2.jokeapi.dev/joke/';
  HEADERS = new HttpHeaders().set(  // not used
    'Content-Type',
    'application/json'
  );
  constructor(public httpClient: HttpClient) { }

  getJoke(
    categories: any[]
  ): Observable<any> {
    let endpoint = this.REST_API;
    let delimiterCount = categories.reduce((prev, curr) => { if (curr.isChecked) return prev + 1; return prev; }, 0);
    let currentDelimiter = 1;
    if (delimiterCount == 1) endpoint += categories.filter(cat => cat.isChecked)[0].name;
    else if (delimiterCount > 1) {
      categories.forEach((cat) => {
        if (currentDelimiter == 1) {
          endpoint += cat.name;
        }
        else {
          endpoint += '+' + cat.name;
        }
        currentDelimiter++;
      });
    }
    endpoint += '?blacklistFlags=nsfw,racist,sexist,explicit';  // there are some really poor taste jokes
    return this.httpClient.get(endpoint);

  }

}