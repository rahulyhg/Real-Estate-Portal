'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','$location','$http'];
    // This is controller for this view
	var websitesController = function ($scope, $injector,$routeParams,$location,$http) {
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
		
		//code for database operation
		//code for view website data
		if($routeParams.id) {
		
			$http.get("../server-api/index.php/getsingle/website"+$routeParams.id)
			.success(function(response) {$scope.websites = response;
				console.log($scope.websites);
			});
		
		}else{
		//this request for all response data
			if($routeParams.pageNo){
				$http.get("../server-api/index.php/getmultiple/website"+$routeParams.pageNo)
				.success(function(response) 
				{$scope.websites = response;
					console.log($scope.websites);
				});
			}
		}
		//edit websites
		if($routeParams.id){
			$http.get("../server-api/index.php/getsingle/website"+$routeParams.id)
			.success(function(response) {
				$scope.websites = response;
				$scope.reset = function() {
					$scope.websites = angular.copy($scope.websites);
				};
				$scope.reset();
				console.log($scope.websites);
			
		}).error(function(err){
			console.log(err);
		});
		
		$scope.update = function(){
			$http.put("../server-api/index.php/put/website"+$routeParams.id,$scope.websites)
			.success(function(response) {
				alert(response);
			});
		};
		}
        //end code
	
		$scope.webPart=$routeParams.webPart;
		console.log($scope.webPart);
		if(!$routeParams.webPart){
			$location.path('/dashboard/websites/mywebsites');
		}
		
    };    
	// Inject controller's dependencies
	websitesController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('websitesController', websitesController);	
});
