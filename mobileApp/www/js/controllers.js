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

.controller('ContactsCtrl', function(contactService, SOCKET_EVENTS, $scope, $state) {

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
          contacts.contacts.splice(contacts.contacts.indexOf(contactContainer[0]),1);
        }
        break;
      default:
        throw new Error('That event type is not recognized');
        break;
    }
    $scope.$apply();
  }

  contactService.bind(updateData);

  contacts.edit = function(c) {
    $state.go('app.edit-contact', { contactId: c.id });
  }

  contacts.delete = function(c) {
    contactService.deleteContact(c)
      .then(function(){
        // Remove contact from the list
        contacts.contacts.splice(contacts.contacts.indexOf(c), 1);
      }, function() {
        console.log('There was an error removin the contact');
      });
  }
})

.controller('ContactCtrl', function($stateParams, contactService, $scope, SOCKET_EVENTS) {
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
        var id = parseInt(resp.id);
        if (contact.contact.id === id) {
          angular.merge(contact.contact, resp.data);
        }
        break;
      case SOCKET_EVENTS.REMOVED:
        console.log('element removed', resp);
        // TODO removed contact from the list
        break;
      default:
        throw new Error('That event type is not recognized');
      break;
    }
    $scope.$apply();
  }

  contactService.bind(updateData);

})

.controller('EditContactCtrl', function($ionicHistory, $stateParams, contactService, $state) {

  var editContactCtrl = this;
  
  contactService.getContact($stateParams.contactId)
    .then(function(resp) {
      editContactCtrl.contact = resp;
    });

  editContactCtrl.update = function(contact) {
    contactService.updateContact(contact)
      .then(function() {
        // $state.go('app.contacts');
        $ionicHistory.goBack();
      }, function() {
        console.log('Error updating contact');
      });
  }
});
