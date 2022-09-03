import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joke-page',
  templateUrl: './joke-page.component.html',
  styleUrls: ['./joke-page.component.css']
})
export class JokePageComponent implements OnInit {

  // jokeCount: number = 4;
  value: number = 4;
  constructor() {
  }

  ngOnInit(): void {
  }

  createRange(iter: number) {
    // return new Array(number);
    return new Array(iter).fill(0)
      .map((n, index) => index + 1);
  }
}
