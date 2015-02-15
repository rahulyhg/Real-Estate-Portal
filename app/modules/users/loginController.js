

'use strict';

define(['app', 'css!modules/users/login'], function (app) {
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
    };
	
    
	// Inject controller's dependencies
	loginController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('loginController', loginController);
	
	
});



