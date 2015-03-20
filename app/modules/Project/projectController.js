'use strict';
define(['app'], function (app) {
var injectParams = ['$scope', '$injector','$routeParams','$rootScope','dataService'];
  // This is controller for this view
	var projectController = function ($scope, $injector,$routeParams,$rootScope,dataService) {
		$rootScope.metaTitle = "Real Estate Project";
	
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.projectListCurrentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		$scope.user_id = {user_id : $rootScope.userDetails.id}; 
		$scope.alerts = [];
		
		// function to close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		//Code For Pagination
		$scope.pageChanged = function(page, where) { 
			angular.extend(where, $scope.user_id);
			dataService.get("getmultiple/project/"+page+"/"+$scope.pageItems, where).then(function(response){
				$scope.projects = response.data;
			});
		};
		
		// to view project details in table
		dataService.get("getmultiple/project/"+$scope.projectListCurrentPage+"/"+$scope.pageItems,$scope.user_id)
		.then(function(response) {  
				console.log(response);
				
				$scope.projects = response.projects;
				$scope.totalRecords=response.totalRecords;
			
		});

		
		
    };		 
	// Inject controller's dependencies
	projectController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('projectController', projectController);
	
	
});




	