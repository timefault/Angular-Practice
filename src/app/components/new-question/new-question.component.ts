import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BulletinBoardService } from 'src/app/services/bulletin-board.service';
import { IPost } from '../bulletin-board/bulletin-board.model';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

  @Output() pullPosts = new EventEmitter<any>();

  constructor(private db: BulletinBoardService) { }

  ngOnInit(): void {
  }

  newQuestionForm = new FormGroup({
    author: new FormControl(''),
    message: new FormControl('')
  });
  onSubmit(newQuestion: any) {
    // console.log(newQuestion);
    // console.log(this.newQuestionForm.get('author')!.value)
    // console.log(this.newQuestionForm.get('message')!.value)
    // parse html form
    // validate and sanitize form
    // post to db new record
    this.db.insertNewRecord(newQuestion, 'post');
    // get db state
    // clear textbox
    this.newQuestionForm.setValue({
      author: '',
      message: ''
    });
  }
}
