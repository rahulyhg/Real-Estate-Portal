'use strict';
define(['app', 'css!modules/home/home'], function (app) {
var injectParams = ['$scope', '$injector','$http', '$routeParams','$rootScope'];
  // This is controller for this view
	var projectController = function ($scope, $injector,$http,$routeParams,$rootScope) {
		$rootScope.metaTitle = "Real Estate Project";
	//Code For Pagination
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";	
		if($routeParams.type) {					
		$http.get("../server-api/index.php/project/"+$routeParams.type)
		.success(function(response) {
			$scope.project = response;
			console.log($scope.project);
		});
		
		}else{
		//this request for all project data	
		$http.get("../server-api/index.php/projects/"+$scope.currentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.projects = response.projects;
				$scope.totalRecords=response.totalRecords;
			//console.log($scope.projects);
			});		
		}		

		$scope.pageChanged = function() {
			//$log.log('Page changed to: ' + $scope.currentPage);
			$http.get("../server-api/index.php/projects/"+$scope.currentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.projects = response.projects;
				//console.log(projects);
				//$scope.totalRecords = response.totalRecords;
				
			});
		}; 
   
	
	//add project
	$scope.reset = function() {
	$scope.projectForm = {};
		};
		$scope.addproject = function(){
			//console.log("Hii");
			console.log($scope.projectForm);
			$http.post("server-api/index.php/addproject", $scope.projectForm)
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
    };	
	 
	// Inject controller's dependencies
	projectController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('projectController', projectController);
	
	
});




	