import {Component} from 'angular2/core';
import {Http} from 'angular2/http';

@Component({
    selector: 'contact-list',
    template: `
    <div *ngFor="#contact of contacts">{{ contact.name }}</div>
`
})
export class AppComponent { 

  contacts: ContactElement [];

  constructor(http: Htpp) {
    //this.contacts = [{ name: "Wendy" }, {name: "Jonathan"}, { name: "Wendy"}];
    http.get('http://localhost:8888/contact')
      .map(resp => resp.json())
      .subscribe(data => this.contacts = data);
  }

  addName() {
    this.contacts.push({ name: "WTF"});
  }

}

class ContactElement {
    name: string;
}
