import { Component, Input, OnInit } from '@angular/core';
import { IPost } from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: IPost;
  isReplying!: boolean;

  constructor() { }

  ngOnInit(): void {
    // initialize post
    this.isReplying = false;
  }

  initializePost() { }
  onReply() {
    this.isReplying = true;
  }
  checkValue(/*any: any*/) {
    console.log('fire');
    // console.log(any);
  }
}
