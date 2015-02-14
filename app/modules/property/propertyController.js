'use strict';

define(['app', 'css!modules/property/property'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams'];

    // This is controller for this view
	var propertyController = function ($scope, $injector,$routeParams) {
		
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
		};	
    
	// Inject controller's dependencies
	propertyController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('propertyController', propertyController);
	
	
});


