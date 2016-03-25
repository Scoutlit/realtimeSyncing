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

  bind(cb) {
    io.socket.on('contact', (resp) => {
      cb(resp.verb, resp.data || resp.id);
    })
  }

  static getInstance() {
    return this.instance || new ContactService();
  }
}

export const EVENT_TYPES = {
  ADDED: 'created',
  UPDATED: 'updated',
  REMOVED: 'destroyed',
}
