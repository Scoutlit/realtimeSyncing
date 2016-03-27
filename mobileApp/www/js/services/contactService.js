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

    var sync = function() {
      connectionService.checkConnection()
        .then(function(connected) {
          var d = $q.defer();

          if (connected) {
            // Get server values
            io.socket.get('/contact', function(resp) {
              d.resolve(resp);
            });
          } else {
            d.reject();
          }

          return d.promise;
        })
        .then(function(serverContacts) {
            // Get local values
            var localContacts = localStorage.get('contacts');

            console.log('local contacts', localContacts);
            console.log('server contacts', serverContacts);

            localContacts = lodash.sortBy(localContacts, ['id']);
            serverContacts = lodash.sortBy(serverContacts, ['id']);

            var min = lodash.min([localContacts[0].id, serverContacts[0].id]);
            var max = lodash.max([localContacts[localContacts.length - 1].id, localContacts[localContacts.length - 1].id])

            // for(var id in lodash.)
            var updatedLocalContacts = [];
            // Compare to get updated, deleted and added

            // Lets test with local updated only
            lodash.each(updatedLocalContacts, function(c) {
              io.socket.put('/contact/' + c.id, c);
            });
        })
    }

    var getServerChanges = function() {
      connectionService.checkConnection()
        .then(function(connected) {
          if (connected) {
            // Only sync if connected
            io.socket.get('/contact',  function(contacts) {
              localStorage.set('contacts', contacts);
            });
          }
        });
    }

    var uploadChangesToServer = function() {
      connectionService.checkConnection()
        .then(function(connected) {
          if (connected) {
            // Get server values
            // Get local values
            var contacts = localStorage.get('contacts');
            // Compare to get updated, deleted and added

            // Lets test with all as updated
            lodash.each(contacts, function(c) {
              io.socket.put('/contact/' + c.id, c);
            });
          }
        })
    }

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
          // sync();
        } else {
          // unbind
          io.socket.off('contact', callCB);
        }
      });
    }

    var updateContact = function(contact) {
      var defer = $q.defer();

      connectionService.checkConnection()
        .then(function(connected) {
          if (connected) {
            io.socket.put('/contact/' + contact.id, contact, function(resp, jwr) {
              if (jwr.statusCode === 200) {
                defer.resolve(resp);
              } else {
                defer.reject('error updating contact');
              }
            });
          } else {
            // Save in local storage
            console.log('saving to local storage');
            var contacts = localStorage.get('contacts');
            var thisContact = lodash.find(contacts, function(c) {
              return c.id === contact.id;
            });

            lodash.merge(thisContact, contact);
            defer.resolve(thisContact);
            localStorage.set('contacts', contacts);
          }
      })

      return defer.promise;
    };

    var deleteContact = function(contact) {
      var defer = $q.defer();

      connectionService.checkConnection()
        .then(function(connected) {
          if (connected) {
            io.socket.delete('/contact/' + contact.id, function(resp, jwr) {
              if (jwr.statusCode === 200) {
                defer.resolve(resp);
              } else {
                defer.reject('error deleting contact');
              }
            });
          } else {
            // Save in local storage
            console.log('removing from local storage');
            var contacts = localStorage.get('contacts');
            var thisContact = lodash.find(contacts, function(c) {
              return c.id === contact.id;
            });

            contacts.splice(contacts.indexOf(thisContact), 1);
            defer.resolve(thisContact);
            localStorage.set('contacts', contacts);
          }
        });

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
