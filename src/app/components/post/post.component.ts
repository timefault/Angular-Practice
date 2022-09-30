import { Component, Input, OnInit } from '@angular/core';
import { IPost } from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: IPost;
  upVotes!: number;
  downVotes!: number;

  constructor() { }

  ngOnInit(): void {
    // initialize post
    this.upVotes = 8;
    this.downVotes = 0;
  }

  initializePost() { }
  castUpVote() {
    this.upVotes++;
  }
  castDownVote() {
    this.downVotes++;
  }

}
