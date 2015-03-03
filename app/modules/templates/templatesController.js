'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$location','$routeParams','$rootScope'];
    // This is controller for this view
	var templatesController = function ($scope, $injector,$location,$routeParams,$rootScope) {
		$rootScope.metaTitle = "Real Estate Template";
		
		//Code For Pagination{pooja}
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage=1;		
		$scope.projTempCurrentPage = 1;
		$scope.customTempCurrentPage=1;
		$scope.myTemplate=1;
		$scope.listTempCurrentPage=1;
		$scope.webTempCurrentPage=1;
		$scope.pageItems = 10;
		$scope.numPages = "";		

		$scope.pageChanged = function() {
			//$log.log('Page changed to: ' + $scope.currentPage);
			$http.get("../server-api/index.php/template/"+$scope.currentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
			$http.get("../server-api/index.php/template/"+$scope.projTempCurrentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
			$http.get("../server-api/index.php/template/"+$scope.customTempCurrentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
			$http.get("../server-api/index.php/template/"+$scope.myTemplate+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
			$http.get("../server-api/index.php/template/"+$scope.webTempCurrentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
			$http.get("../server-api/index.php/template/"+$scope.listTempCurrentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
		};		
		
		
		$scope.tempPart = $routeParams.tempPart; 		
		console.log($scope.tempPart);
		/*For display by default projectTemplate.html page*/
		if(!$routeParams.tempPart) {
		$location.path('/dashboard/templates/projectTemplate');
		}	
		
    };
       
	// Inject controller's dependencies
	templatesController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('templatesController',templatesController);	
});
