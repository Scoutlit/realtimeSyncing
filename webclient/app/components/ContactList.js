import { Component, View, Input } from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import Contact from './Contact.js';

@Component({
  selector: 'contact-list',
//  template: '<contact-card *ngFor="#contact of contacts" [contact]="contact"></contact-card>',
//  template: '<div><p (click)="sayHi()">Say {{ greeting }}</p><div *ngFor="#contact of contacts">{{ contact.name }}</div></div>',
  providers: [HTTP_PROVIDERS]
})
@View({
//  directives: [CORE_DIRECTIVES],
  templateUrl: 'app/components/contact-list.html',
})
class ContactList {

  contacts = [{ name: 'Hello There'}];

  static get parameters() {
    return [[Http]];
  }

  ngOnInit() {
    //this.getContacts();
    console.log('contacts', this.contacts);
    this.greeting = 'Hi';
  }

  ngOnChanges(changedRecord) {
    console.log('init', changedRecord);
  }

  constructor(http) {

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
    this.contacts.push({ name: "WTF" });
  }
}

export default ContactList;
