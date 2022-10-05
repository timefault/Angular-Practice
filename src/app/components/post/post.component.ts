import { Component, Input, OnInit } from '@angular/core';
import { IPost } from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: IPost;
  isReplying: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // initialize post
  }

  initializePost() { }
  onReply() {
    this.isReplying = true;
  }
}
