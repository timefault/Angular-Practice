import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bulletin-board',
  templateUrl: './bulletin-board.component.html',
  styleUrls: ['./bulletin-board.component.css']
})
export class BulletinBoardComponent implements OnInit {

  posts$?: Observable<any>;
  constructor(/* bulletin board service */) { }

  ngOnInit(): void {
  }

  getAllPosts() {
    // posts$=bulletinBoardService.getAllPosts();
  }
}
