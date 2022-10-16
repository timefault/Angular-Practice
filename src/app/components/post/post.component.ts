import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BulletinBoardService } from 'src/app/services/bulletin-board.service';
import { IReply } from '../reply/reply.model';
import { IPost } from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: IPost;
  isReplying!: boolean;
  postId?: number;
  replies$?: Observable<any>;

  constructor(private db: BulletinBoardService) { }

  ngOnInit(): void {
    // initialize post
    this.isReplying = false;
    this.postId = this.post.id;
    this.replies$ = this.db.getRepliesById(this.postId);
  }

  onReply() {
    this.isReplying = true;
  }

  checkValue(/*any: any*/) {
    console.log('fire');
    // console.log(any);
  }
}
