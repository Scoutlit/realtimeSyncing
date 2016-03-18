import {Component} from 'angular2/core';
import {ContactList} from './ContactList/ContactList.component';
import {HTTP_PROVIDERS}    from 'angular2/http';

@Component({
    selector: 'my-app',
    styles:[`.contact-manager-title { color: #121212; }`]
    template: `
    <div>
      <h1 class="contact-manager-title">Contact Manager Angular Client</h1>
      <contact-list></contact-list>
    </div>
`
    directives: [ContactList],
    providers: [HTTP_PROVIDERS]
})
export class AppComponent { 
}
