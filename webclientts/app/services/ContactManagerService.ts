import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {ContactItem} from '../models/ContactItem';

@Injectable()
export class ContactManagerService {

	socket: any;

  constructor(private http: Http) {

    this.socket = io.socket;

    io.socket.on('connect', function() {
      console.log('connected');
      // this.socket.on('contact', evt => {
        // Submit an event with the server information
       // console.log('Something changed in the contact manager server', evt);
      //})
    });


  }

  getContacts() {

    // Get all contacts from the server
    return new Promise<ContactItem[]>(resolve => {

      // Use websockets to get the contacts
      this.socket.get('/contact', function(body) {
        console.log('response', body);
        resolve(body);
		  });

    });

  }

  subscribeToNewContacts(newContactFunc) {
    // subscribe to the contact 
    this.socket.on('contact', newContactFunc);
  }
}
