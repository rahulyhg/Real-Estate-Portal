'use strict';
define(['app', 'css!modules/users/register/register'], function (app) {
    var injectParams = ['$scope', '$injector','$http','$routeParams'];

    // This is controller for this view
	var registerController = function ($scope, $injector, $http,$routeParams) {
		console.log("this is register controller");			
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
    };	
	
	// Inject controller's dependencies
	registerController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('registerController', registerController);
	
});











