import {Component, Input, OnInit} from 'angular2/core';
import {ContactItem} from './ContactList.component'

@Component({
    selector: 'contact-element',
    template: `
      <div>
        <h2>{{ contact.name }}</h2>
        <h3>{{ contact.phoneNumber }}</h3>
      </div>
    `
})
export class ContactElement implements OnInit {

  @Input() contact: ContactItem;

  constructor() {}

  ngOnInit() {
    console.log('contact - ', this.contact)
  }

}
