(function(module) {

  module('webApp', [])
    .controller('AppCtrl', function($http) {

      var app = this;

      app.title = "Hello World";

      $http.get('http://localhost:8888/contact')
        .then(function(response) {
          console.log(response);
          app.contacts = response.data;
        })
    });

})(angular.module)
