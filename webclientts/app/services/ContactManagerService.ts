import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
//import socketIOClient from 'socket.io-client';
//import sailsIOClient from 'sails.io.js'

//console.log(socketIOClient);
//console.log(sailsIOClient);

@Injectable()
export class ContactManagerService {

  constructor(private http: Http) {

    //let io = sailsIOClient(socketIOClient);
    //io.sails.url = 'http://localhost:8888';
    //console.log('io', io);
  }

  getContacts() {
    return new Promise<ContactItem[]>(resolve => {
      this.http.get('http://localhost:8888/contact')
      .map(resp => resp.json())
      .subscribe(data => {
        resolve(data);
        // console.log("contacts - ", this.contacts);
      })
    });
  }
}
