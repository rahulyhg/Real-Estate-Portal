'use strict';
/* Controllers */
angular.module('realEstate.controllers',[]).
controller('responseCtrl', function($scope,$http, $routeParams, $location) {
	if(!$routeParams.type){
		$location.path( "/response/web" );
	}
	$scope.type = $routeParams.type;
	$scope.status = $routeParams.status;
});