'use strict';
define(['app', 'css!modules/users/register/register'], function (app) {
    var injectParams = ['$scope', '$injector','$http'];

    // This is controller for this view
	var registerController = function ($scope, $injector, $http) {
		console.log("this is register controller");			
		
		$scope.insert = function(reg){
			//console.log($scope.user);
			console.log($scope.reg);
			$http.post("../server-api/index.php/post/user",$scope.reg)
			.success(function(response) {
				
				//$scope.reset();
				console.log(response);
			})
		}	
    };	
	
	// Inject controller's dependencies
	registerController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('registerController', registerController);
	
});











