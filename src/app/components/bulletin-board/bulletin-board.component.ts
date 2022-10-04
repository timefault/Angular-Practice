// considering making a stackoverflow type clone

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IAction } from 'src/app/classes/action.model';
import { BulletinBoardService } from 'src/app/services/bulletin-board.service';

@Component({
  selector: 'app-bulletin-board',
  templateUrl: './bulletin-board.component.html',
  styleUrls: ['./bulletin-board.component.css']
})
export class BulletinBoardComponent implements OnInit {
  // @Output() actionsChange = new EventEmitter<any>();
  posts$?: Observable<any>;

  constructor(public bulletinBoardService: BulletinBoardService) {
  }


  ngOnInit(): void {
    this.posts$ = this.bulletinBoardService.getPosts();
    this.bulletinBoardService.getAllPosts();
  }

  getAllPosts() {
    this.posts$ = this.bulletinBoardService.getPosts();
  }
  postNewQuestion() {
    // parse html form
    // validate and sanitze form
    // post new record to db
    // get db state
  }
  createNewThread() {
    return 'Started another thread';
  }
  replyToPost() {
    // show reply form
  }
}
