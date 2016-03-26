angular.module('starter.services', [])
  .service('contactService', ['$q', function($q) {

    var getContacts = function() {
      var defer = $q.defer();

      io.socket.get('/contact', function(contacts) {
        defer.resolve(contacts);
      });

      return defer.promise;
    };

    var getContact = function(id) {
      var defer = $q.defer();

      io.socket.get('/contact/' + id, function(contact) {
        defer.resolve(contact);
      });

      return defer.promise;
    };

    var bind = function(cb) {
      io.socket.on('contact', function(resp) {
        cb(resp);
      })
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

