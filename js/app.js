'use strict';


// Declare app level module which depends on filters, and services
angular.module('realEstate', [
  'ngRoute',
  'realEstate.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html'});
  $routeProvider.when('/register', {templateUrl: 'partials/register.html'});
  $routeProvider.when('/register/:edit', {templateUrl: 'partials/edit-profile.html'});
  $routeProvider.when('/property', {templateUrl: 'partials/view-property.html'});
  $routeProvider.when('/project', {templateUrl: 'partials/view-project.html'});
  $routeProvider.when('/addproperty', {templateUrl: 'partials/add-property.html'});
  $routeProvider.when('/addproject', {templateUrl: 'partials/add-project.html'});
  $routeProvider.when('/webresponse/all', {templateUrl: 'partials/webresponse.html'});
  $routeProvider.when('/propertyresponse/all', {templateUrl: 'partials/propertyresponse.html'});
  $routeProvider.when('/projectresponse/all', {templateUrl: 'partials/projectresponce.html'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);