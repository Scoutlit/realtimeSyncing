angular.module('cmapp.services')
  .service('contactService', ['$q', 'connectionService', 'localStorageService', 'lodash', function($q, connectionService, localStorage, lodash) {

    var getContacts = function() {
      var defer = $q.defer();

      connectionService.checkConnection()
        .then(function(connected) {
          if (connected) {
            // use sockets
            io.socket.get('/contact', function(contacts) {
              defer.resolve(contacts);
              // update local storage
              localStorage.set('contacts', contacts);
            });
          } else {
            // use localstorage
            var contacts = localStorage.get('contacts');
            defer.resolve(contacts);
            console.log('using localstorage', contacts);
          }
        });

      return defer.promise;
    };

    var getContact = function(id) {
      var defer = $q.defer();
      id = parseInt(id);
      connectionService.checkConnection()
        .then(function(connected) {
          if (connected) {
            // use sockets
            io.socket.get('/contact/' + id, function(contact) {
              defer.resolve(contact);
            });
          } else {
            // use localstorage
            var contacts = localStorage.get('contacts');
            var contact = lodash.find(contacts, function(c) {
              return c.id === id;
            });

            defer.resolve(contact);
            console.log('using localstorage', contact);
          }
        });

      return defer.promise;
    };

    var bind = function(cb) {
      var callCB = function(resp) {
        cb(resp);
      };

      connectionService.checkConnection()
        .then(function(connected) {
          if (connected) {
            io.socket.on('contact', callCB);
          }
        });

      connectionService.onConnectionChange(function(connected) {

        if(connected) {
          // bind
          io.socket.on('contact', callCB);
        } else {
          // unbind
          io.socket.off('contact', callCB);
        }
      });
    }

    var updateContact = function(contact) {
      var defer = $q.defer();

      io.socket.put('/contact/' + contact.id, contact, function(resp, jwr) {
        if (jwr.statusCode === 200) {
          defer.resolve(resp);
        } else {
          defer.reject('error updating contact');
        }
      })

      return defer.promise;
    };

    var deleteContact = function(contact) {
      var defer = $q.defer();

      io.socket.delete('/contact/' + contact.id, function(resp, jwr) {
        if (jwr.statusCode === 200) {
          defer.resolve(resp);
        } else {
          defer.reject('error deleting contact');
        }
      })

      return defer.promise;
    };

    return {
      getContacts: getContacts,
      getContact: getContact,
      updateContact: updateContact,
      deleteContact: deleteContact,
      bind: bind
    };

  }]);
