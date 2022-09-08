import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  getFromMainComponent?: string;  // test prop
  // link to activated route observable

  availableActions = [
    {
      name: "first action",
      action: this.doSomething
    },
    {
      name: "second action",
      action: this.doSomethingElse
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  doSomething() {
    console.log("Executed something");
  }
  doSomethingElse() {
    console.log("Executed somethingElse");
  }
}
