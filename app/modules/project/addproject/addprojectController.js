'use strict';
define(['app', 'css!modules/project/addproject/addproject'], function (app) {
	
	   var injectParams = ['$scope', '$injector','$http', '$routeParams','$rootScope'];
  // This is controller for this view
	var addprojectController = function ($scope, $injector,$http,$routeParams,$rootScope) {
		$rootScope.metaTitle = "Real Estate Add Project";
		
		//add project
		$scope.reset = function() {
			$scope.projectForm = {};
		};
		$scope.addproject = function(){
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
	addprojectController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('addprojectController',addprojectController);
	
	
});




	