'use strict';

define(['app', 'css!modules/users/users'], function (app) {
    var injectParams = ['$scope', '$injector','$http'];

    // This is controller for this view
	var usersController = function ($scope, $injector,$http) {
		$scope.page = "hello";
		
	
		$scope.userPart = $routeParams.userPart; 		
		console.log($scope.userPart);
		/*For display by default login.html page*/
		if(!$routeParams.userPart) {
		$location.path('/users/login');
		}	
		templateUrl:'http://localhost/pooja/Real-Estate-Portal/app/modules/users/users.html';
		
		
		
		
		//login function
		$scope.logIn = function(login){
			console.log($scope.login);
			$http.post("server-api/index.php/login", $scope.login)
			.success(function(response) {
				alert(response);
				//$scope.reset();
			})
		}
		
		//change passwd function
		//forgot passwd function
		$scope.forgotPass = function(forget)
			{
			    console.log($scope.forget);
			    $http.post("server-api/index.php/forgot", $scope.forget)
				.success(function(response) 
				   {
				     alert(response);		
		           })
				   }    
		
    };
	
	
    
	// Inject controller's dependencies
	usersController.$inject = injectParams;
	
	// Register/apply controller dynamically
    app.register.controller('usersController', usersController);
	
	
});
