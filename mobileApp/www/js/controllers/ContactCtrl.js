angular.module('cmapp.controllers')
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
