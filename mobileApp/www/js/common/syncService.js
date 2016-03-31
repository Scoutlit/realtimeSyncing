angular.module('cmapp.common')
.service('syncService', function($q, connectionService, $rootScope, localStorage) {

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
            var currentChanges = localStorage.get('currentChanges') || [];

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
  }


  return {
    get: get,
    send: send
  }

});
