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
			//console.log($scope.projects);
		});
		
	}
	
	//Add Project
	$scope.reset = function() {
	$scope.project = {};
		};
		$scope.addproject = function(){
			//console.log("Hii");
			console.log($scope.project);
			$http.post("server-api/index.php/addproject", $scope.project)
			.success(function(response) {
				alert(response);
				$scope.reset();
				
			});
		};
	
	
	//Update Project
	if($routeParams.id){
	$http.get("server-api/index.php/editproject/"+$routeParams.id)
    .success(function(response) {
		$scope.project = response;
		$scope.reset = function() {
			$scope.project = angular.copy($scope.project);
		};
		$scope.reset();
		console.log($scope.project);
		
	}).error(function(err){
		console.log(err);
	});
	
	$scope.update = function(){
		$http.put("server-api/index.php/editproject/"+$routeParams.id,$scope.project)
		.success(function(response) {
			alert(response);
		});
	};
	}	
}).
controller('propertyCtrl',function($scope, $http, $routeParams) {

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
		
		// Add property
		$scope.reset = function() {
			$scope.property = {};
		};
		$scope.addprop = function(){
			console.log($scope.property);
			$http.post("server-api/index.php/addproperty", $scope.property)
			.success(function(response) {
				alert(response);
				$scope.reset();
			});
		};
	}
	if($routeParams.id){
		//Update Property
		$http.get("server-api/index.php/editproperty/"+$routeParams.id)
		.success(function(response) {
			$scope.property = response;
			$scope.reset = function() {
				$scope.property = angular.copy($scope.property);
			};
			$scope.reset();
			console.log($scope.property);
			
		}).error(function(err){
			console.log(err);
		});
		
		$scope.update = function(){
			$http.put("server-api/index.php/editproperty/"+$routeParams.id,$scope.property)
			.success(function(response) {
				alert(response);
			});
		}
	}
}).

controller('registerCtrl', function($scope,$http,$routeParams) {
	//Add record
	$scope.reset = function() {
	$scope.reg = {};
	};
	$scope.insert = function(){
		//console.log($scope.user);
		console.log($scope.reg);
		$http.post("server-api/index.php/register",$scope.reg)
		.success(function(response) {
			alert(response);
			$scope.reset();
			console.log(response);
		})
	}
	if($routeParams.id){
	//update record
	$http.get("server-api/index.php/editprofile/"+$routeParams.id)
    .success(function(response) {
		$scope.editpro = response;
		$scope.reset = function() {
			console.log($scope.editpro)
			$scope.editpro = angular.copy($scope.editpro);
		};
		$scope.reset();
		console.log($scope.editpro);
		
	}).error(function(err){
		console.log(err);
	});
	
	$scope.update = function(){
		console.log($scope.editpro)
	$http.put("server-api/index.php/editprofile/"+$routeParams.type,$scope.editpro)
		.success(function(response) {
			alert(response);
			console.log(response);
		})
	}
	}
}).
controller('loginCtrl', function($scope,$http) {
		//Add data
		$scope.insert = function(){
		console.log($scope.login);
		$http.post("server-api/index.php/login", $scope.login)
		.success(function(response) {
		alert(response);
		//$scope.reset();
		})
		}
		
		
	
}).
controller('forgotCtrl', function($scope,$http) {
		//Add email
		$scope.insert = function(){
		console.log($scope.forget);
		$http.post("server-api/index.php/forgot/", $scope.forget)
		.success(function(response) {
		alert(response);
		
		})
		}
});


	




	


