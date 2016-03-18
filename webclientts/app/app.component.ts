import {Component} from 'angular2/core';
import {ContactList} from './ContactList/ContactList.component';
import {AddContactApp} from './AddContactApp/AddContactApp';
import {EditContactApp} from './EditContactApp/EditContactApp';
import {RouteConfig} from 'angular2/router';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'my-app',
    styles:[`.contact-manager-title { color: #121212; }`]
    template: `
    <div>
      <h1 class="contact-manager-title">Contact Manager Angular Client</h1>
      <contact-list></contact-list>
    </div>
`
    directives: [ContactList]
})
@RouteConfig([
  {path:'/add-contact', name: 'AddContact', component: AddContactApp},
  {path:'/edit-contact', name: 'EditContact', component: EditContactApp}
])
export class AppComponent { 
}
