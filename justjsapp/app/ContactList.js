import ViewEngine from './ViewEngine';
import MaterialService from './MaterialService';
import ContactCard from './ContactCard';
import ContactService from './ContactService';

export default class ContactList {

  constructor() {
    this.instance = this;
    this.viewEngine = ViewEngine.getInstance();
    this.materialService = MaterialService.getInstance();
    this.contactService = ContactService.getInstance();
    this.selector = 'contact-list';
    this.contacts = [];
    this.contactCards = [];
  }

  init() {

    this.element = this.viewEngine.getElement(this.selector);

    this.contactService.getContacts()
      .then((contacts) => {
        this.contacts = contacts;
        this.updateView();
        this.bindElements();
      });

  }

  updateView() {

    let html = '<div>';

    _.each(this.contacts, (contact) => {
      html += '<contact-item></contact-item>';
    });

    html += '</div>'
    this.element.innerHTML = html;

  }

  bindElements() {
    _.each(this.contacts, (contact) => {
      this.contactCards.push(new ContactCard(contact));
    });
  }

  static getInstance() {
    console.log('viewEngine', ViewEngine);
    return this.instance ||
      new ContactList(ViewEngine.getInstance(), MaterialService.getInstance());
  }

}
