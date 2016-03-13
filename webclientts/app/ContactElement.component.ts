import {Component, Input, OnInit} from 'angular2/core';
import {ContactItem} from './ContactList.component'

@Component({
    selector: 'contact-element',
    template: `
      <div>
        <span>{{ contact.name }}</span>
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
