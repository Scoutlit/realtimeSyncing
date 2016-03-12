import {Component} from 'angular2/core';
import {ContactList} from './ContactList.component';
import {HTTP_PROVIDERS}    from 'angular2/http';

@Component({
    selector: 'my-app',
    template: `
    <div>
      <h1>My First Angular 2 App</h1>
      <contact-list></contact-list>
    </div>
`
    directives: [ContactList],
    providers: [HTTP_PROVIDERS]
})
export class AppComponent { 
}
