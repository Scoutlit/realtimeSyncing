import { Component } from 'angular2/core';

@Component({
  selector: 'contact-card',
  template: `
  <div>
  <h2>{{ contact.name }}</h2>
  </div>
  `,
  inputs: ['contact']
})

class Contact {
  constructor() {
  }
}

export default Contact;
