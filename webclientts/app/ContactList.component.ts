import {Component, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {ContactElement} from './ContactElement.component';

@Component({
    selector: 'contact-list',
    styles: [`.contact-list { padding: 5px;}`]
    template: `
      <div class="contact-list">
        <h2>Contact List</h2>
        <button (click)="addContact()">Add</button>
        <contact-element *ngFor="#contact of contacts" [contact]="contact"></contact-element>
      </div>
    `,
    directives: [ContactElement]
})

export class ContactList implements OnInit {

  contacts: ContactItem [];

  constructor(private http: Http) {}

  ngOnInit() {
     //this.contacts = [{ name: "Wendy" }, {name: "Jonathan"}, { name: "Wendy"}];
    this.http.get('http://localhost:8888/contact')
      .map(resp => resp.json())
      .subscribe(data => {
        this.contacts = data
        // console.log("contacts - ", this.contacts);
      })
  }

  addContact() {
    alert("Needs implementation");
  }

}

export class ContactItem {
    name: string;
    phoneNumber: string;
}
