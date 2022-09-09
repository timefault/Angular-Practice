// considering making a stackoverflow type clone

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  actions: any;
  posts$?: Observable<any>;
  constructor(public bulletinBoardService: BulletinBoardService) {

    this.actions = [
      {
        id: 0,
        name: 'create',
        method: this.createNewPost
      },
      {
        id: 1,
        name: 'newThread',
        method: this.createNewThread
      }
    ];
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.posts$ = this.bulletinBoardService.getAllPosts();
  }
  createNewPost() {
    return 'Here is another post';
  }
  createNewThread() {
    return 'Started another thread';
  }
}
