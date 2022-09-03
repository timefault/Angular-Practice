import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }

  @Input() count!: number;  // should this be?
  @Output() countChange = new EventEmitter<number>();;

  onInputChange(event: MatSliderChange) {
    this.count = event.value!;
    this.countChange.emit(this.count);
  }

  ngOnInit(): void {
  }

}
