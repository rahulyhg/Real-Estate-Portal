

'use strict';

define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams', '$location','$rootScope','dataService'];

    // This is controller for this view
	var responseController = function ($scope, $injector,$routeParams, $location,$rootScope,dataService) {		
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
		$scope.mailListCurrentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		

		$scope.pageChanged = function() {
			
			dataService.get("/getmultiple/enquiry/"+$scope.mailListCurrentPage+"/"+$scope.pageItems).then(function(response){
					$scope.mailList = response.data;
					console.log(response.data);
				});
		};		
		 
		dataService.get("/getmultiple/enquiry/"+$scope.mailListCurrentPage+"/"+$scope.pageItems)
		.then(function(response) {  
			$scope.totalRecords = response.totalRecords;
			$scope.mailList = response.data;
			console.log(response);
		});
    };    
	// Inject controller's dependencies
	responseController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('responseController', responseController);
	
	
});


