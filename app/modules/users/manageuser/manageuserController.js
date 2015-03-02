'use strict';

define(['app'], function (app) { 
    var injectParams = ['$scope', '$injector', '$routeParams','$location']; /* Added $routeParams to access route parameters */
    // This is controller for this view
	var manageuserController = function ($scope, $injector, $routeParams,$location) {
		console.log("this is manageuserController");
		
		// for date picker {Pooja}
		$scope.today = function() 
		{
			$scope.date1 = new Date();
		};
		$scope.today();

		$scope.open = function($event,opened1)
		{
			$event.preventDefault();
			$event.stopPropagation();
			 $scope[opened1] = ($scope[opened1] ===true) ? false : true;
		};
		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];
	//End  Date Picker 
		
		
		$scope.userViews = $routeParams.userViews; 
		console.log($scope.userViews);
		//For display by default userslist.html page
		if(!$routeParams.userViews) {
		$location.path('/dashboard/users/userslist');
		console.log($location);
		}
	
	
	//Code For Pagination
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.userCurrentPage = 1;
		$scope.usergroupCurrentPage= 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		

		$scope.pageChanged = function() {
			$http.get("../server-api/index.php/manageuser/"+$scope.userCurrentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.user = response.user;
				
			});
			$http.get("../server-api/index.php/manageuser/"+$scope.usergroupCurrentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.user = response.user;
				
			});
		};		
	};
	// Inject controller's dependencies
	manageuserController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('manageuserController', manageuserController);
	
});