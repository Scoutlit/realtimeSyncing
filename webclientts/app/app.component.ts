import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
    <div>
      <h1>My First Angular 2 App</h1>
      <button (click)="addName()">Add</button>
      <div *ngFor="#name of names">{{ name }}</div>
    </div>
`
})
export class AppComponent { 

  names: string [];

  constructor() {
    this.names = ["Ovi", "Jonathan", "Wendy"];
  }

  addName() {
    this.names.push("WTF");
  }

}
