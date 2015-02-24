

'use strict';

define(['app', 'css!modules/users/login/login'], function (app) {
    var injectParams = ['$scope', '$injector','$http'];

    // This is controller for this view
	var loginController = function ($scope, $injector,$http) {
		$scope.logIn = function(login){
			console.log($scope.login);
			$http.post("server-api/index.php/login", $scope.login)
			.success(function(response) {
					alert(response);
					//$scope.reset();
			})
		}
		
		// This is for Forgot Password
		$scope.forgotPass = function(forget){
			console.log($scope.forget);
			$http.post("server-api/index.php/forgot", $scope.forget)
			.success(function(response) {
				alert(response);		
			})
		}    
    };
	
    
	// Inject controller's dependencies
	loginController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('loginController', loginController);
	
});



