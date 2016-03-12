import {Component} from 'angular2/core';
import {ContactList} from './ContiactList.js';

@Component({
    selector: 'my-app',
    template: `
    <div>
      <h1>My First Angular 2 App</h1>
      <button (click)="addName()">Add</button>
      <div *ngFor="#contact of contacts">{{ contact.name }}</div>
      <contact-list></contact-list
    </div>
`
  directives: [ContactList]
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
