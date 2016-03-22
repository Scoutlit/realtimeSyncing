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
		});


  }

  getContacts() {
    return new Promise<ContactItem[]>(resolve => {

      this.socket.get('/contact', function(body) {
        resolve(body);
		  }

    });
  }

  subscribeToNewContacts(newContactFunc) {
    this.socket.on('contact', newContactFunc);
  }
}
