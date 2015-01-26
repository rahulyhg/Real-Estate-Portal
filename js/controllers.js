'use strict';
/* Controllers */
angular.module('realEstate.controllers',[]).
controller('responseCtrl', function($scope,$http, $routeParams, $location) {
	if(!$routeParams.type){
		$location.path( "/response/web/all" );
	}
	$scope.type = $routeParams.type;
	$scope.status = $routeParams.status;
	$scope.getClass = function(path) {
    if ($location.path().substr(0, path.length) == path) {return "active"} else {return ""}}
});