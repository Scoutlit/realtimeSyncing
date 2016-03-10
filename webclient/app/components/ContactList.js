import { Component, View } from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import Contact from './Contact.js';

@Component({
  selector: 'contact-list',
//  template: '<contact-card *ngFor="#contact of contacts" [contact]="contact"></contact-card>',
  //template: '<div><p (click)="sayHi()">Say {{ greeting }}</p><div *ngFor="#contact of contacts">{{ contact.name }}</div></div>',
  //directives: [Contact],
  providers: [HTTP_PROVIDERS]
})
@View({
  templateUrl: 'app/components/contact-list.html',
})
class ContactList {

  static get parameters() {
    return [[Http]];
  }

  ngOnInit() {
    //this.getContacts();
    this.contacts = [{ name: 'Hello There'}];
    this.greeting = 'Hi';
  }

  constructor(http) {

    //this.contacts = [{ name: 'Hello There'}];

    this.http = http;

  }

  getContacts() {
    return this.http.get('http://localhost:8888/contact')
      .map((res) => res.json())
      .subscribe((data) => this.contacts = data);
  }

  sayHi() {
    this.greeting = 'Hello';
    console.log('Hi', this);
    this.contacts.push({name: "WTF"});
  }
}

export default ContactList;
