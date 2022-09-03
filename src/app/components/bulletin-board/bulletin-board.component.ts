import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BulletinBoardService } from 'src/app/services/bulletin-board.service';

@Component({
  selector: 'app-bulletin-board',
  templateUrl: './bulletin-board.component.html',
  styleUrls: ['./bulletin-board.component.css']
})
export class BulletinBoardComponent implements OnInit {

  posts$?: Observable<any>;
  constructor(public bulletinBoardService: BulletinBoardService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.posts$ = this.bulletinBoardService.getAllPosts();
  }
}
