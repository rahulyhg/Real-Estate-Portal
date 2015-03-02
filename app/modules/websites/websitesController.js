'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','$location'];
    // This is controller for this view
	var websitesController = function ($scope, $injector,$routeParams,$location) {
		console.log("this is websites controller");
		
		//Code For Pagination
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.myWebsiteCurrentPage = 1;
		$scope.requSiteCurrentPage= 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		

		$scope.pageChanged = function() {
			//$log.log('Page changed to: ' + $scope.currentPage);
			$http.get("../server-api/index.php/website/"+$scope.myWebsiteCurrentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.website = response.website;
				
			});
			$http.get("../server-api/index.php/website/"+$scope.requSiteCurrentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.website = response.website;				
			});
		};	
		
		$scope.webPart=$routeParams.webPart;
		console.log($scope.webPart);
		if(!$routeParams.webPart){
			$location.path('/dashboard/websites/mywebsites');
		}
		templateUrl:'http://localhost/sunita/Real-Estate-Portal/app/modules/websites/websites.html';
    };    
	// Inject controller's dependencies
	websitesController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('websitesController', websitesController);	
});
