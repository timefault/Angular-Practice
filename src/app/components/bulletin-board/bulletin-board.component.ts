// considering making a stackoverflow type clone

import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BulletinBoardService } from 'src/app/services/bulletin-board.service';

@Component({
  selector: 'app-bulletin-board',
  templateUrl: './bulletin-board.component.html',
  styleUrls: ['./bulletin-board.component.css']
})
export class BulletinBoardComponent implements OnInit {

  @Output() availableActions = [
    {
      name: "bb action 1",
      method: "action 1"
    },
    {
      name: "bb action 2",
      method: "action 2"
    }
  ];

  posts$?: Observable<any>;
  constructor(public bulletinBoardService: BulletinBoardService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.posts$ = this.bulletinBoardService.getAllPosts();
  }
}
