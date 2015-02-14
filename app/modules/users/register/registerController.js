'use strict';

define(['app', 'css!modules/register/register'], function (app) {
    var injectParams = ['$scope', '$injector','$http','$routeParams'];

    // This is controller for this view
	var registerController = function ($scope, $injector, $http,$routeParams) {		
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
	};
	
	// Inject controller's dependencies
	registerController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('registerController', registerController);
	
});











