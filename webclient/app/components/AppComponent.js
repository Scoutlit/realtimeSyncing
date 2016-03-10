import { Component } from 'angular2/core';
import ContactList from './ContactList.js';

@Component({
  selector: 'contact-app',
  template: `
  <div>
    <h1>{{ title }}</h1>
    <contact-list></contact-list>
  </div>
  `,
  directives: [ContactList]
})
class AppComponent {
  constructor() {
    this.title = 'Hello World';
  }
}

export default AppComponent;
