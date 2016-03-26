import Promise from 'bluebird';

let instance = null;

export default class ContactService {

  constructor() {
    instance = this;
  }

  getContacts() {
    return new Promise((resolve) => {
      io.socket.get('/contact', function(body) {
        resolve(body);
      });
    });
  }

  remove(id) {
    return new Promise((resolve) => {
      io.socket.delete('/contact/' + id, function(resp) {
        resolve(resp);
      });
    })
  }

  update(contact) {
    return new Promise((resolve) => {
      io.socket.put('/contact/' + contact.id, contact, function(resp) {
        resolve(resp);
      });
    });
  }

  bind(cb) {
    io.socket.on('contact', (resp) => {
      cb(resp.verb, resp.data || resp.id);
    })
  }

  static getInstance() {
    return instance || new ContactService();
  }
}

export const EVENT_TYPES = {
  ADDED: 'created',
  UPDATED: 'updated',
  REMOVED: 'destroyed',
}
