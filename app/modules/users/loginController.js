

'use strict';

define(['app', 'css!modules/home/home'], function (app) {
    var injectParams = ['$scope', '$injector','$rootScope', 'AUTH_EVENTS', 'LoginService','$http'];

    // This is controller for this view
	var loginController = function ($scope, $injector,$rootScope, AUTH_EVENTS, LoginService,$http) {
		
		$scope.errorMessage = '';
		  $scope.logIn = function (login) {
		   
			$http.post('server-api/index.php/login', {email: $scope.user_email, password: $scope.pwd})	
			 .success(function (response, status, error, config)
					{
						if (response.success === true)
						{
						   
							  $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
						// $scope.setCurrentUser(login);
							console.log($scope.login);
							 dialog.close();
						}
						else
						{
							$scope.errorMessage = 'Invalid username or password.';
							 $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
						}
					})
					 .error(function (response, status, error, config)
					{
						$scope.errorMessage = 'Error logging in.';
					});
			
			  
			};
    };
	
    
	// Inject controller's dependencies
	loginController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('loginController', loginController);
	
	
});



