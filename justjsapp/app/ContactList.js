import ViewEngine from './ViewEngine';
import MaterialService from './MaterialService';
import ContactCard from './ContactCard';
import ContactService from './ContactService';
import {EVENT_TYPES} from './ContactService';
import _ from 'lodash';

let instance = null;

export default class ContactList {

  constructor() {
    instance = this;
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

    this.contactService.bind((event, respData) => {
      switch (event) {
        case EVENT_TYPES.ADDED:
          this.addContact(respData);
          break;
        case EVENT_TYPES.UPDATED:
          this.editContact(respData);
          break;
        case EVENT_TYPES.REMOVED:
          this.removeContact(respData);
          break;
        default:
          throw new Error('Event: '+ event  +' not found');
          break;
      }
    });
  }

  addContact(newContact) { 
    let newContactCardElement = this.viewEngine.createElement('contact-item');
    this.element.firstChild.appendChild(newContactCardElement);
    this.contactCards.push(new ContactCard(newContact));
  }

  editContact(updatedContact) {
    let contactCard = _.find(this.contactCards, (contact) => {
      return contact.contact.id === updatedContact.id;
    });

    contactCard.update(updatedContact);
  }

  removeContact(id) {
    let contactId = parseInt(id);
    let contactCard = _.find(this.contactCards, (contact) => {
      return contact.contact.id === contactId;
    });

    console.log('removing', this);
    this.element.firstChild.removeChild(contactCard.element);
  }

  updateView() {

    let html = '<div style="padding: 20px;">';

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
    return instance || new ContactList();
  }

}
