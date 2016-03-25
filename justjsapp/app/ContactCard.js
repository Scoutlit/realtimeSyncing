import ViewEngine from './ViewEngine';

export default class ContactCard {

  constructor(contact) {
    this.viewEngine = ViewEngine.getInstance();
    this.contact = contact; 
    this.selector = 'contact-item';
    this.init();
  }

  init() {
    this.element = this.viewEngine.getElement(this.selector);
    this.element.innerHTML = '<div>' + this.contact.name + '</div>';
  }

  updateContact(contact) {
    this.contact = contact;
    // Update view
  }

}
