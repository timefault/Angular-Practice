import { Component, Input, OnInit } from '@angular/core';
import { IAction } from 'src/app/classes/action.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() actions?: any;

  constructor() { }

  ngOnInit(): void {
  }

}
