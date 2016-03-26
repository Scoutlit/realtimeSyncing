import ViewEngine from './ViewEngine';
import MaterialService from './MaterialService';
import ContactService from './ContactService';
import ContactList from './ContactList';

export default class ContactCard {

  constructor(contact) {
    this.viewEngine = ViewEngine.getInstance();
    this.materialService = MaterialService.getInstance();
    this.contactService = ContactService.getInstance();
    this.contactList = ContactList.getInstance();
    this.contact = contact; 
    this.selector = 'contact-item';
    this.element = this.viewEngine.getElement(this.selector);
    this.updateView();
    this.bindEvents();
  }

  updateView() {
    this.element.innerHTML = 
      `<div class="mdl-card mdl-shadow--2dp" style="width: 100%; margin-bottom: 15px; min-height: 0px;">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">${this.contact.name}</h2>
        </div>
        <div class="mdl-card__supporting-text">
          <address>
            ${this.contact.address} <br>
            ${this.contact.city} <br>
            ${this.contact.country} <br>
            ${this.contact.phoneNumber} <br>
          </address>
        </div>
        <div class="mdl-card__actions mdl-card--border" style="text-align: right;">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect edit-contact">
            Edit
          </a>
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect delete-contact">
            Delete
          </a>
        </div>
      </div>`;

    this.materialService.upgradeElement(this.element);

  }

  bindEvents() {
    let editButton = this.element.getElementsByClassName('edit-contact');
    editButton[0].addEventListener('click', this.editContact.bind(this));
    let deleteButton = this.element.getElementsByClassName('delete-contact');
    deleteButton[0].addEventListener('click', this.deleteContact.bind(this));
  }

  editContact() {
    // TODO Add a way to navigate to an update view
    console.log('Editing ', this.contact);
    this.contactList.showDialog(this.contact);
  }

  deleteContact() {
    // This should remove the element and then the socket should update this view again
    this.contactService.remove(this.contact.id)
      .then((contact) => {
        this.contactList.removeContact(contact.id);
      });
  }

  update(contact) {
    this.contact = contact;
    // Remove element html
    this.element.removeChild(this.element.firstChild);
    // Recreate the element html
    this.updateView();
    // Bind events
    this.bindEvents();
  }
}
