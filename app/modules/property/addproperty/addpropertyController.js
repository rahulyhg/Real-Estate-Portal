'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','$http','$rootScope'];
    // This is controller for this view
	var addpropertyController = function ($scope, $injector,$routeParams,$http,$rootScope) {
		$rootScope.metaTitle = "Add Real Estate Property";
		
		// Add property
		$scope.reset = function() {
			$scope.property = {};
		};
		$scope.addprop = function(){
			console.log($scope.property);
			$http.post("../server-api/index.php/addproperty", $scope.property)
			.success(function(response) {
				alert(response);
				$scope.reset();
			});
		};
		if($routeParams.id){
			//Update Property
			$http.get("../server-api/index.php/property/"+$routeParams.id)
			.success(function(response) {
					$scope.property = response;
					$scope.reset = function() {
						$scope.property = angular.copy($scope.property);
					};
					$scope.reset();
					console.log($scope.property);			
			});	
			$scope.update = function(){
				$http.put("../server-api/index.php/editproperty/"+$routeParams.id,$scope.property)
				.success(function(response) {
					alert(response);
				});
			};
		}
	};		
	// Inject controller's dependencies
	addpropertyController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('addpropertyController', addpropertyController);
	
});
