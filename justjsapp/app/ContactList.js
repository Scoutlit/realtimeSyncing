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

  showDialog(contact) {
    var dialog = this.element.querySelector('dialog');
    dialog.innerHTML = `
        <h4 class="mdl-dialog__title">Edit Contact</h4>
        <div class="mdl-dialog__content">
          <form action="#" name='editContactForm'>
            <div class="mdl-textfield mdl-js-textfield">
              <input class="mdl-textfield__input" type="text" name="contact-name" id="contact-name" value="${contact.name}">
                <label class="mdl-textfield__label" for="contact-name"></label>
            </div>
            <div class="mdl-textfield mdl-js-textfield">
              <input class="mdl-textfield__input" type="text" id="contact-phone-number" value="${contact.phoneNumber}">
                <label class="mdl-textfield__label" for="contact-phone-number"></label>
            </div>
            <div class="mdl-textfield mdl-js-textfield">
              <input class="mdl-textfield__input" type="text" id="contact-address" value="${contact.address}">
                <label class="mdl-textfield__label" for="contact-address"></label>
            </div>
            <div class="mdl-textfield mdl-js-textfield">
              <input class="mdl-textfield__input" type="text" id="contact-city" value="${contact.city}">
                <label class="mdl-textfield__label" for="contact-city"></label>
            </div>
            <div class="mdl-textfield mdl-js-textfield">
              <input class="mdl-textfield__input" type="text" id="contact-country" value="${contact.country}">
                <label class="mdl-textfield__label" for="contact-country"></label>
            </div>
          </form>
        </div>
        <div class="mdl-dialog__actions">
          <button type="button" class="mdl-button update">Update</button>
          <button type="button" class="mdl-button close delete">Cancel</button>
        </div>
    `;
    
    var deleteBtn = this.viewEngine.querySelector('.mdl-button.delete');
    deleteBtn.addEventListener('click', function() {
      dialog.close();
    });

    var updateBtn = this.viewEngine.querySelector('.mdl-button.update');
    updateBtn.addEventListener('click', function(e) {
      var form = this.viewEngine.querySelector('form', dialog);
      var updatedContact = {
        id: contact.id,
        name: form['contact-name'].value,
        phoneNumber: form['contact-phone-number'].value,
        address: form['contact-address'].value,
        city: form['contact-city'].value,
        country: form['contact-country'].value
      };

      this.contactService.update(updatedContact)
        .then(function(respContact) {

          let cCard = _.find(this.contactCards, (c) => {
            return c.contact.id === respContact.id;
          });

          cCard.update(respContact);

        }.bind(this), function() {
          console.log('There was an error updating contact');
        }.bind(this));

      dialog.close();

    }.bind(this));

    this.materialService.upgradeElement(dialog);
    dialog.showModal();
  }

  removeContact(id) {
    let contactId = parseInt(id);
    let contactCard = _.find(this.contactCards, (contact) => {
      return contact.contact.id === contactId;
    });

    this.element.firstChild.removeChild(contactCard.element);
  }

  updateView() {

    let html = '<div style="padding: 20px;">';

    _.each(this.contacts, (contact) => {
      html += '<contact-item></contact-item>';
    });

    html += `<dialog class="mdl-dialog">
            </dialog>`;

    html += '</div>';

    this.element.innerHTML = html;
    this.materialService.upgradeElement(this.element);

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
