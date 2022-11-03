// considering making a stackoverflow type clone

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BulletinBoardService } from 'src/app/services/bulletin-board.service';

@Component({
  selector: 'app-bulletin-board',
  templateUrl: './bulletin-board.component.html',
  styleUrls: ['./bulletin-board.component.css']
})
export class BulletinBoardComponent implements OnInit {
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

  createNewThread() {
    return 'Started another thread';
  }
}
