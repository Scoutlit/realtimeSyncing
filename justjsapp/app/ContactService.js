import Promise from 'bluebird';

export default class ContactService {

  constructor() {
    this.instance = this;
  }

  getContacts() {
    return new Promise((resolve) => {
      io.socket.get('/contact', function(body) {
        resolve(body);
      });
    });
  }

  static getInstance() {
    return this.instance || new ContactService();
  }
}
