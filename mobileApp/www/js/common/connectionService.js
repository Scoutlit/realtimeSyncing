angular.module('cmapp.common')
  .service('connectionService', function($q, $cordovaNetwork, $ionicPlatform, $rootScope) {

    var connected = null;
    var callback = null;

    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      connected = networkState;
      if (callback) { callback(connected) }
      console.log('connection changed', networkState);
    });

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      connected = networkState;
      if (callback) { callback(connected) }
      console.log('connection changed', networkState);
    });

    var checkConnection = function() {
      var defer = $q.defer();

      if (connected !== null) {
        // if connected is not null that means it was set
        defer.resolve(connected);
      } else {
        // otherwise we need to check that the device is ready and we need to check the connection
        $ionicPlatform.ready(function() {
          if (window.cordova) {
            // we are in the phone
            // check if it is online
            defer.resolve($cordovaNetwork.isOnline());
          } else {
            // we are in the browser
            connected = true;
            defer.resolve(connected);
          }
        });
      }
      return defer.promise;
    }

    var onConnectionChange = function(cb) {
      callback = cb;
    }

    return {
      checkConnection: checkConnection,
      onConnectionChange: onConnectionChange
    };
  });
