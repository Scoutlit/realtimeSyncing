import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
    <div>
      <h1>My First Angular 2 App</h1>
      <button (click)="addName()">Add</button>
      <div *ngFor="#contact of contacts">{{ contact.name }}</div>
    </div>
`
})
export class AppComponent { 

  contacts: ContactElement [];

  constructor() {
    this.contacts = [{ name: "Wendy" }, {name: "Jonathan"}, { name: "Wendy"}];
  }

  addName() {
    this.contacts.push({ name: "WTF"});
  }

}

class ContactElement {
    name: string;
}
