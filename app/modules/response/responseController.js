

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
		
		
		//Code For Pagination
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.mailListCurrentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		

		$scope.pageChanged = function(page) {
			
			dataService.get("/getmultiple/enquiry/"+page+"/"+$scope.pageItems).then(function(response){
					$scope.mailList = response.data;
					console.log(response);
			});
			
		}
		 // show mail box list {sunita}
			dataService.get("/getmultiple/enquiry/"+$scope.mailListCurrentPage+"/"+$scope.pageItems)
			.then(function(response) {  
				$scope.totalRecords = response.totalRecords;
				$scope.mailList = response.data;
				console.log(response);
			});
				 			
			//to compose mail{sunita}
			
			$scope.reset = function() {
				$scope.property = {};
			};
			$scope.addprop = function(){
				console.log($scope.property);
				dataService.post("post/property", $scope.property)
				.then(function(response) {
					alert(response);
					$scope.reset();
				});
			};
			
    };    
	// Inject controller's dependencies
	responseController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('responseController', responseController);
	
	
});


