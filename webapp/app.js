(function(module) {

  module('webApp', ['ngMaterial','ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/contact/list');

    $stateProvider
    .state('contact', {
      abstract: true,
      url: '/contact',
      template: '<ui-view />'
    })
    .state('contact.list', {
      url: '/list',
      templateUrl: 'partials/contact-list.html',
      controller: 'ContactsCtrl as contactsCtrl'
    })
    .state('contact.single', {
      url: '/:contactId',
      templateUrl: 'partials/contact.html',
      controller: 'ContactCtrl as contactCtrl'
    });

  })
  .controller('AppCtrl', function($http) {

    var app = this;

    app.title = "Contact Manager";

  })
  .controller('ContactsCtrl', function($http, $state) {
    var contactsCtrl = this;

    $http.get('http://localhost:8888/contact')
    .then(function(response) {
      contactsCtrl.contacts = response.data;
    });

    contactsCtrl.editContact = function(contact) {
      $state.go('contact.single', { contactId: contact.id });
    }
  })
  .controller('ContactCtrl', function($http, $stateParams) {

    var contactCtrl = this;

    contactCtrl.id = $stateParams.contactId;

  });

})(angular.module)
