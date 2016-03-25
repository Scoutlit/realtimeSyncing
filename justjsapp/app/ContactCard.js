import ViewEngine from './ViewEngine';

export default class ContactCard {

  constructor(contact) {
    this.viewEngine = ViewEngine.getInstance();
    this.contact = contact; 
    this.selector = 'contact-item';
    this.element = this.viewEngine.getElement(this.selector);
    this.updateView();
  }

  updateView() {
    this.element.innerHTML = '<div>' + this.contact.name + '</div>';
  }

  update(contact) {
    this.contact = contact;
    // Remove element html
    this.element.removeChild(this.element.firstChild);
    // Recreate the element html
    this.updateView();
  }
}
