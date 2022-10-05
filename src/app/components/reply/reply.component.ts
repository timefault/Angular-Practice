import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() isReplying!: boolean;
  @Output() IsReplyingChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  replyForm = new FormGroup({
    message: new FormControl('')
  });
  onCancelReply() {
    // set app-post.isReplying to false
    this.isReplying = false;
    this.IsReplyingChange.emit(this.isReplying);
    // clear reply textbox
  }
  onSubmitReply(form: any) { }
}
