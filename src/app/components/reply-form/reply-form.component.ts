import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BulletinBoardService } from 'src/app/services/bulletin-board.service';
/*
*   - input needs santization before deployment
*
*
**/

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.css']
})
export class ReplyFormComponent implements OnInit {
  @Input() postId?: number;
  @Input() isReplying!: boolean;
  @Output() isReplyingChange = new EventEmitter<boolean>();
  constructor(private db: BulletinBoardService) { }

  ngOnInit(): void {
  }
  replyForm = new FormGroup({
    message: new FormControl('')
  });
  onCancelReply() {
    // set app-post.isReplying to false
    console.log("cancelled");
    this.isReplying = false;
    console.log(this.isReplying);
    this.isReplyingChange.emit(this.isReplying);
    // clear reply textbox
  }
  onSubmitReply(form: any) {
    console.log(form);
    this.db.insertNewRecord(form, 'reply', this.postId);
    this.isReplying = false;
    this.isReplyingChange.emit(this.isReplying);
  }
}
