angular.module('cmapp.common', ['ionic', 'ngCordova'])
  .constant('SOCKET_EVENTS', {
    ADDED: 'created',
    UPDATED: 'updated',
    REMOVED: 'destroyed'
  })
  .constant('LOCALSTORAGE_KEYS', {
    LAST_CONNECTION_UTC: 'lastConnectionUTC',
    SAVED_CHANGES: 'disconnectedChanges',
    CONTACTS: 'contacts'
  })
  .constant('CORDOVA_EVENTS', {
    NETWORK_ONLINE: '$cordovaNetwork:online',
    NETWORK_OFFLINE: '$cordovaNetwork:offline'
  });
