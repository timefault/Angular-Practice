import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPost } from '../components/post/post.model';

@Injectable({
  providedIn: 'root'
})
export class BulletinBoardService {

  // maybe react subject fixes observable broadcast issue?
  // cache posts here?
  _posts = new BehaviorSubject<any>({});
  posts$ = this._posts.asObservable();

  REST_API = "http://localhost:3000/";
  headers: HttpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  constructor(public httpClient: HttpClient) { }

  getPosts() {
    return this.posts$;
  }
  broadcastAllPosts(endpoint: string) {
    this.httpClient.get(endpoint).subscribe(data => {
      this._posts.next(data);
    });
  }
  getAllPosts() { // is this an industry pattern?
    let endpoint = this.REST_API;
    this.broadcastAllPosts(endpoint);
  }

  insertNewPost(newQuestion: any) {
    let endpoint = this.REST_API + 'user';
    console.log(endpoint);
    console.log(newQuestion);
    return this.httpClient.post(endpoint, newQuestion);
  }
}
