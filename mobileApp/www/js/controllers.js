angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ContactsCtrl', function(contactService, SOCKET_EVENTS, $scope) {

  var contacts = this;

  contacts.contacts = [];

  contactService.getContacts()
  .then(function(serverContacts) {

    contacts.contacts = serverContacts;

  });

  function updateData(resp) {
    switch (resp.verb) {
      case SOCKET_EVENTS.ADDED:
        console.log('element added', resp);
        contacts.contacts.push(resp.data);
        break;
      case SOCKET_EVENTS.UPDATED:
        console.log('element updated', resp);
        var id = parseInt(resp.id);
        var contactContainer = contacts.contacts.filter(function(c) {
          return c.id === id;
        });
        if (contactContainer){
          angular.merge(contactContainer[0], resp.data);
        }
        break;
      case SOCKET_EVENTS.REMOVED:
        console.log('element removed', resp);
        var id = parseInt(resp.id);
        var contactContainer = contacts.contacts.filter(function(c) {
          return c.id === id;
        });
        if (contactContainer){
          contacts.splice(indexOf(contactContainer[0]),1);
        }
        break;
      default:
        throw new Error('That event type is not recognized');
        break;
    }
  }

  contactService.bind(updateData);
})

.controller('ContactCtrl', function($stateParams, contactService) {
  var contact = this;
  contactService.getContact($stateParams.contactId)
    .then(function(resp) {
      contact.contact = resp;
    });

  function updateData(resp) {
    switch (resp.verb) {
      case SOCKET_EVENTS.ADDED:
        console.log('element added', resp);
        break;
      case SOCKET_EVENTS.UPDATED:
        console.log('element updated', resp);
        // TODO update contact
        break;
      case SOCKET_EVENTS.REMOVED:
        console.log('element removed', resp);
        // TODO removed contact from the list
        break;
      default:
        throw new Error('That event type is not recognized');
      break;
    }
  }

  contactService.bind(updateData);
});
