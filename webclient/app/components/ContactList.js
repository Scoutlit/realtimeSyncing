import { Component } from 'angular2/core';
import { Http } from 'angular2/http';
import Contact from './Contact.js';


@Component({
  selector: 'contact-list',
  template: '<contact-card *ngFor="#contact of contacts" [contact]="contact"></contact-card>',
  directives: [Contact]
})

class ContactList {

  static get parameters() {
    return [[Http]];
  }

  constructor(http) {

    var contactList = this;

    this.contacts = [];

    http.get('http://localhost:8888/contact')
      .subscribe((res) => {
          this.contacts = res.json();
          console.log('data', this.contacts);
       });
  }
}

export default ContactList;
