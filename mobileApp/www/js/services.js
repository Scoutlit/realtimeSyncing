angular.module('starter.services', [])
  .service('contactService', ['$q', function($q) {

    var getContacts = function() {
      var defer = $q.defer();

      io.socket.get('/contacts', function(contacts) {
        console.log('contacts', contacts);
        defer.resolve(contacts);
      });

      return defer.promise;
    }

    return {
      getContacts: getContacts
    }
  }]);

