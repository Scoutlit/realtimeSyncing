import {Component, OnInit} from 'angular2/core';
import {ContactElement} from '../ContactElement/ContactElement.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ContactManagerService} from '../services/ContactManagerService';
import {ContactItem} from '../models/ContactItem';

@Component({
    selector: 'contact-list',
    styles: [`.contact-list { padding: 5px;}`],
    template: `
      <div class="contact-list">
        <h2>Contact List</h2>
        <a [routerLink]="['AddContact']">Add Contact</a>
        <router-outlet></router-outlet>
        <contact-element *ngFor="#contact of contacts" [contact]="contact"></contact-element>
      </div>
    `,
    directives: [ContactElement, ROUTER_DIRECTIVES],
    providers: [ContactManagerService]
})

export class ContactList implements OnInit {

  contacts: ContactItem [] = [];

  constructor(private contactMananger: ContactManagerService) {}

  ngOnInit() {
    this.contactMananger.getContacts()
      .then(contacts => { this.contacts = contacts });

    this.contactMananger.subscribeToNewContacts(newContact => {
      console.log('new contact', newContact);
      this.contacts.push(newContact.data);
    });
  }
}
