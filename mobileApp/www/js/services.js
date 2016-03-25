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

    return {
      getContacts: getContacts,
      getContact: getContact,
      bind: bind
    };

  }]);

