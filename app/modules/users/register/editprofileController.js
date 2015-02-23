'use strict';
define(['app', 'css!modules/users/register/edit'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','$http'];
    // This is controller for this view
	var editprofileController = function ($scope, $injector,$routeParams,$http) {
		console.log("this is edit controller");	
		
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
			};
		}
	};	
		
	// Inject controller's dependencies
	editprofileController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('editprofileController',editprofileController);	
});
