'use strict';
/* Controllers */
angular.module('realEstate.controllers',[]).
controller('responseCtrl', function($scope,$http, $routeParams, $location) {
	if(!$routeParams.type && !$routeParams.status){
		$location.path( "/response/web/all" );
	}
	$scope.type = $routeParams.type;
	$scope.status = $routeParams.status;
	$scope.id = $routeParams.id;
	
	console.log($scope.status);
	$scope.getClass = function(path) {
    if ($location.path().substr(0, path.length) == path) {return "active"} else {return ""}}
	
	//this request for all response data
	$http.get("server-api/index.php/response")
	.success(function(response) {$scope.resopnses = response;});
	
	//this request for single response data
	if($routeParams.id) {
		$http.get("server-api/index.php/response/"+$routeParams.id)
		.success(function(response) {$scope.resopnses = response;});
	}
}).
controller('projectCtrl', function($scope, $http, $routeParams) {

	$scope.projects = { title: "vilas title"};
	//this request for single response data
	if($routeParams.type) {
		$http.get("server-api/index.php/project/"+$routeParams.type)
		.success(function(response) {$scope.projects = response;
			console.log($scope.projects);
		});
		
	}else{
		//this request for all response data
		$http.get("server-api/index.php/project")
		.success(function(response) {$scope.projects = response;
			console.log($scope.projects);
		});
		.
		
	}
}).
controller('propertyCtrl', function($scope, $http, $routeParams) {

	//this request for single response data
	if($routeParams.type) {
		$http.get("server-api/index.php/property/"+$routeParams.type)
		.success(function(response) {$scope.properties = response;
			console.log($scope.properties);
		});
		
	}else{
		//this request for all response data
		$http.get("server-api/index.php/property")
		.success(function(response) {$scope.properties = response;
			console.log($scope.properties);
		});
	}
});

	


