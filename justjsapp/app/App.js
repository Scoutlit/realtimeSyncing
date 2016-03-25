import ContactList from './ContactList';

export default class App {

  constructor(id) {
    let selectorId = id || 'app';
    this.element = document.getElementById(selectorId);
    this.element.innerHTML = 
     `<div>
        <h1>Contact Manager List</h1>
        <contact-list id="contact-list"></contact-list>
      </div>`;

    this.contactList = ContactList.getInstance();
    this.contactList.init();
  }

}
