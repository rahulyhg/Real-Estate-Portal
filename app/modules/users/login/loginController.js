
'use strict';

define(['app'], function (app) {
    var injectParams = ['$scope','$rootScope', '$injector','dataService','$location', '$cookieStore', '$cookies'];

    // This is controller for this view
	var loginController = function ($scope,$rootScope,$injector,dataService,$location, $cookieStore, $cookies) {
		
		($rootScope.alerts) ? $scope.alerts = $rootScope.alerts : $scope.alerts = [];
		$scope.alerts = [];
		//function for close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		$scope.insert = function(login){
			dataService.post("post/user/login",$scope.login)
			.then(function(response) {
				if(response.status == 'success'){
					$location.path("/dashboard");
					dataService.setUserDetails(response.data);
					if($scope.login.remember){
						dataService.rememberPass(true);
					}
					dataService.setAuth(true);
					$rootScope.userDetails = dataService.userDetails;
				}else{
					$scope.alerts.push({type: (response.status == 'error') ? "danger" :response.status, msg: response.message});
				}
			})
		}	
		
		$scope.forgotpass = function(forgot) {
			dataService.post("post/user/forgotpass",forgot)
			.then(function(response) {
				if(response.status == 'success'){
					$scope.forgot = response.data;
					$location.path("/login");
				}else{
					$scope.alerts.push({type: (response.status == 'error') ? "danger" :response.status, msg: response.message});
				}
			})
		} 
			
		//code for change password
		$scope.passMatch = function(pass1, pass2){
			$scope.pass = (pass1===pass2) ? true : false;
		}
		$scope.changepass = function(changepwd) {
			$scope.userID = {user_id : $rootScope.userDetails.id}
			angular.extend(changepwd, $scope.userID);
			console.log(JSON.stringify(changepwd));
			dataService.post("/post/user/changepass",changepwd)
			.then(function(response) {
				if(response.status == 'success'){
					$scope.changepwd = {};
					$scope.alerts.push({type: response.status, msg: response.message});
				}else{
					$scope.alerts.push({type: (response.status == 'error') ? "danger" :response.status, msg: response.message});
				}
			})
		}	
	};
	// Inject controller's dependencies
	loginController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('loginController', loginController);
});
