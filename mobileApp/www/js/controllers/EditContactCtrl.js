angular.module('cmapp.controllers')
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
