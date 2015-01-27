'use strict';
/* Controllers */
angular.module('realEstate.controllers',[]).
controller('responseCtrl', function($scope,$http, $routeParams, $location) {
	if(!$routeParams.type && !$routeParams.status){
		$location.path( "/response/web/all" );
	}
	$scope.type = $routeParams.type;
	$scope.status = $routeParams.status;
	$scope.getClass = function(path) {
    if ($location.path().substr(0, path.length) == path) {return "active"} else {return ""}}
}).controller('propertyCtrl',function($http,$scope)
{
	$http.get("http://localhost/Sunita/Real-Estate-Portal/server-api/index.php/response/property")
	.success(function(response) {$scope.names = response;});
	
}).controller('projectCtrl',function($http,$scope)
{
	$http.get("http://localhost/Sunita/Real-Estate-Portal/server-api/index.php/response/project")
	.success(function(response) {$scope.names = response;});
	
});
