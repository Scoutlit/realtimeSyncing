angular.module('cmapp.controllers')
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
