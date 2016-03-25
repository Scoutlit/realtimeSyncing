import Promise from 'bluebird';

export default class ContactService {

  constructor() {
    this.instance = this;
  }

  getContacts() {
    return new Promise((resolve) => {
      resolve([
        { name: 'Name 1'},
        { name: 'Name 2'}
      ]);
    });
  }

  static getInstance() {
    return this.instance || new ContactService();
  }
}
