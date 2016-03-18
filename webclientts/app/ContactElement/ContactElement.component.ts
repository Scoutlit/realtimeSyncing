import {Component, Input, OnInit} from 'angular2/core';
import {ContactItem} from '../models/ContactItem'

@Component({
    selector: 'contact-element',
    styles: [`.contact-card { margin-bottom: 5px; padding: 10px; border: 1px solid #c3c3c3 }`],
    template: `
      <div class='contact-card'>
        <h2>{{ contact.name }}</h2>
        <h3>{{ contact.phoneNumber }}</h3>
        <button (click)="editContact(contact)">Edit</button>
      </div>
    `
})
export class ContactElement implements OnInit {

  @Input() contact: ContactItem;

  constructor() {}

  ngOnInit() {
    // console.log('contact - ', this.contact)
  }

  editContact(c: ContactItem) {
    console.log('Item for editing', c);
    alert("Needs implementation " + c.name);
  }

}
