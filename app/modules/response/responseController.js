

'use strict';

define(['app', 'css!modules/home/home'], function (app) {
    var injectParams = ['$scope', '$injector','$http','$routeParams', '$location'];

    // This is controller for this view
	var responseController = function ($scope, $injector, $http,$routeParams, $location) {
		
	if(!$routeParams.type && !$routeParams.status){
		$location.path( "/response/web/new" );
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
    };
	
    
	// Inject controller's dependencies
	responseController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('responseController', responseController);
	
	
});


