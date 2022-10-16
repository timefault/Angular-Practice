import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
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

  _replies = new BehaviorSubject<any>({});
  replies$ = this._posts.asObservable();

  REST_API = "http://localhost:3000/";
  headers: HttpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  constructor(public httpClient: HttpClient) { }

  getPosts() {
    return this.posts$;
  }

  getReplies() {
    return this.replies$;
  }

  broadcastAllPosts(endpoint: string) {
    console.log("get posts");
    this.httpClient.get(endpoint).subscribe(data => {
      this._posts.next(data);
    });
  }
  getAllPosts() { // is this an industry pattern?
    let endpoint = this.REST_API;
    this.broadcastAllPosts(endpoint);
  }

  getRepliesById(parentId?: number) {
    let endpoint = this.REST_API + 'reply/' + parentId;
    return this.httpClient.get(endpoint);
  }

  insertNewRecord(newRecord: any, p_endpoint: string, parentId?: number) {
    try {
      let endpoint = this.REST_API + p_endpoint;
      if (parentId) {
        newRecord = { ...newRecord, postId: parentId }
      }
      console.log(endpoint);
      console.log(newRecord);
      this.httpClient.post(endpoint, newRecord).subscribe(() => {
        // if (p_endpoint == 'post')
        this.getAllPosts();

        // else this.getRepliesById(parentId);
      });
    }
    catch (err) { console.log(err) };
  }
}
