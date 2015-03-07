

'use strict';

define(['app', 'css!modules/response/response'], function (app) {
    var injectParams = ['$scope', '$injector','$http','$routeParams', '$location','$rootScope'];

    // This is controller for this view
	var responseController = function ($scope, $injector, $http,$routeParams, $location,$rootScope) {		
		$rootScope.metaTitle = "Real Estate Response";
		
		//$scope.MailView = $routeParams.mailId; /* this object will check list of mails show or single mail show */
		
		$scope.mailPart=$routeParams.mailPart;
		console.log($scope.mailPart);
		if(!$routeParams.mailPart){
			$location.path('/dashboard/response/mails');
		}
		
		
		/*if(!$routeParams.type && !$routeParams.status){
			$location.path( "/dashboard/response" );
		}
		$scope.type = $routeParams.type;
		$scope.status = $routeParams.status;
		$scope.paramId = $routeParams.id;
	//	console.log($scope.status);
		$scope.getClass = function(path) {
			if ($location.path().substr(0, path.length) == path){
				return "active"
			} else {
				return ""
			};
		};
		*/
		//Code For Pagination
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage = 1;
		$scope.pageItems = 2;
		$scope.numPages = "";		

		$scope.pageChanged = function() {
			
			$http.get("../server-api/index.php/responses/"+$scope.currentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.responses = response.responses;
				//$scope.totalRecords = response.totalRecords;
				
			});
		};		
		 
		//this request for single response data
		if($routeParams.id) {
			$http.get("../server-api/index.php/response/"+$routeParams.id)
			.success(function(response) {$scope.resopnse = response;});
		}
		
		else{
			//this request for all response data
			$http.get("../server-api/index.php/responses/"+$scope.currentPage+"/"+$scope.pageItems)
			.success(function(response) {
			$scope.resopnses = response.responses;
			console.log($scope.resopnses);
			});
		}
		$scope.setStatus = function(status, id){
			$http.put("../server-api/index.php/response/" + status + "/" + id)
			
		};
    };    
	// Inject controller's dependencies
	responseController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('responseController', responseController);
	
	
});


