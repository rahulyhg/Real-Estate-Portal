'use strict';
define(['app', 'css!modules/home/home'], function (app) {
var injectParams = ['$scope', '$injector','$http', '$routeParams'];
  // This is controller for this view
	var projectController = function ($scope, $injector,$http,$routeParams) {
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
    };
	//this request for single response data
	 
	// Inject controller's dependencies
	projectController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('projectController', projectController);
	
	
});




	