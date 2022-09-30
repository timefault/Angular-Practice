import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  newQuestionForm = new FormGroup({
    author: new FormControl(''),
    message: new FormControl('')
  });
  handleSubmitNewQuestion() {
    // console.log(this.newQuestionForm.get('author')!.value)
    console.log(this.newQuestionForm.get('message')!.value)
  }
}
