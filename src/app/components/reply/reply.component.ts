import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() isReplying!: boolean;
  @Output() isReplyingChange = new EventEmitter<boolean>();
  constructor() { }

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
  }
}
