import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JokeService } from '../../services/joke.service';
@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit {

  joke$?: Observable<any>;
  jokes$?: Observable<any[]>;

  categories: any[] = [
    { name: 'Programming', isChecked: true },
    { name: 'Misc', isChecked: false },
    // { name: 'Dark', isChecked: false },
    { name: 'Pun', isChecked: false },
    { name: 'Spooky', isChecked: false },
    { name: 'Christmas', isChecked: false }
  ];

  constructor(public jokeService: JokeService) {
  }

  getJoke(): void {
    this.joke$ = this.jokeService.getJoke(this.categories);
  }

  ngOnInit(): void {
    this.getJoke();
  }

}
