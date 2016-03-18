import {Component, Input} from 'angular2/core';
import {ContactItem} from '../models/ContactItem'
import {Router} from 'angular2/router';

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
export class ContactElement {

  @Input() contact: ContactItem;
  
  constructor(private _router: Router) {}

  editContact(c: ContactItem) {
    console.log('Item for editing', c);
    this._router.navigate( ['EditContact', { contact: c }] );
  }

}
