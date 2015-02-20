'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','$http','$log', 'modalService', '$rootScope'];
    // This is controller for this view
	var propertyController = function ($scope, $injector,$routeParams,$http, $log, modalService, $rootScope) {
		$rootScope.title = "Real Estate Properties";
		$scope.open = function (url, propId) {
			$http.get("../server-api/index.php/property/"+propId)
			.success(function(response) 
			{
				var modalDefaults = {
					templateUrl: url,	// apply template to modal
				};
				var modalOptions = {
					property: response  // assign data to modal
				};
				modalService.showModal(modalDefaults, modalOptions).then(function (result) {
					console.log("modalOpened");
				});
			});
			
		};
		
		//Code For Pagination
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage = 1;
		

		$scope.pageChanged = function() {
			$log.log('Page changed to: ' + $scope.currentPage);
			$http.get("../server-api/index.php/properties/"+$scope.currentPage+"/10")
			.success(function(response) {
				$scope.properties = response.properties;
				//$scope.totalRecords = response.totalRecords;
				//console.log($scope.properties);
			});
		};

		
		
		
		// Single Property view
		if($routeParams.id) {
			$http.get("../server-api/index.php/property/"+$routeParams.id)
			.success(function(response) {
				$scope.properties = response;
				console.log($scope.properties);
		    });		
		}
		// Multiple Property View
		else{	
			$http.get("../server-api/index.php/properties/"+$scope.currentPage+"/10")
			.success(function(response) {
				$scope.properties = response.properties;
				$scope.totalRecords = response.totalRecords;
				//console.log($scope.properties);
			});
	
			
		}
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
	propertyController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('propertyController', propertyController);
	
	


});
