angular.module('cmapp.common')
.service('syncService', function($q, connectionService, $rootScope, localStorage, LOCALSTORAGE_KEYS) {

  var send = function(url, data) {
    var defer = $q.defer();

    connectionService.checkConnection()
      then(function(connected) {
        try {
          if (connected) {
            // send change to server
            io.socket.post(url, data);
            defer.resolve();
          } else {
            // save it locally
            var currentChanges = localStorage.get(LOCALSTORAGE_KEYS.SAVED_CHANGES) || [];

            currentChanges.push({
              url: url,
              data: data
            });
            defer.resolve();
          }
        } catch(e) {
          defer.reject('There was an error trying to send the data');
        }
      });

    return defer.promise;
  };

  var get = function() {
    var defer = $q.defer();

    defer.resolve();

    return defer.promise;
  };

  var syncAll = function() {
    var defer = $q.defer();
    var lastConnection = localStorage.get(LOCALSTORAGE_KEYS.LAST_CONNECTION_UTC);
    io.socket.get('/changes', { lastTime: lastConnection }, function(resp) {
      var allServerChanges = resp;

      console.log('all changes', resp);
      defer.resolve(resp);
    });

    return defer.promise;
  }

  return {
    get: get,
    send: send,
    syncAll: syncAll
  }

});
