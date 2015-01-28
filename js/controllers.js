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
}).
controller('registerCtrl', function($scope, $http, $routeParams) {
	//add record
	$scope.reset = function() {
			$scope.user = {};
		};
	$scope.insert = function(){
		console.log($scope.user);
		$http.post("server-api/index.php/register/", $scope.user )
		.success(function(response) {
			alert(response);
			$scope.reset();
		})
	}
	//update record
	$http.get("server-api/index.php/editprofile/"+$routeParams.id)
    .success(function(response) {
		$scope.data1 = response;
		$scope.reset = function() {
			$scope.user = angular.copy($scope.data1);
		};
		$scope.reset();
		console.log($scope.user);
	}).error(function(err){
		console.log(err);
	});
	$scope.update = function(){
	$http.put("server-api/index.php/editprofile/"+$routeParams.id,$scope.user)
		.success(function(response) {
			alert(response);
		})
	}
	
});


	




	


