import {Component, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Component({
    selector: 'contact-list',
    template: `
    <div *ngFor="#contact of contacts">{{ contact.name }}</div>
`
})

export class ContactList implements OnInit {

  contacts: ContactElement [];

  constructor(private http: Http) {}

  ngOnInit() {
     //this.contacts = [{ name: "Wendy" }, {name: "Jonathan"}, { name: "Wendy"}];
    this.http.get('http://localhost:8888/contact')
      .map(resp => resp.json())
      .subscribe(data => this.contacts = data)
  }

}

class ContactElement {
    name: string;
}
