'use strict';


// Declare app level module which depends on filters, and services
angular.module('realEstate', [
  'ngRoute',
  'realEstate.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);