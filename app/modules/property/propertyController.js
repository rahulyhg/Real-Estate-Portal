'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','$http','$log', 'modalService', '$rootScope','dataService'];
    // This is controller for this view
	var propertyController = function ($scope, $injector,$routeParams,$http, $log, modalService, $rootScope,dataService) {
		$rootScope.metaTitle = "Real Estate Properties";
		
		//Code For Pagination
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		$scope.alerts = [];
		$scope.currentDate = dataService.currentDate;
		console.log($scope.currentDate);
		
		 //for alert {Pooja}		 
		if($scope.status=="warning"){     
			 $scope.alerts.push({type: 'error', msg: "Error to load data"});
			 $scope.closeAlert = function(index) {
				$scope.alerts.splice(index, 1);
			 };
		}	 
		//function for close alert
		
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		}; 		
		
		//code for pagination
		$scope.pageChanged = function(page) {			
			dataService.get("getmultiple/property/"+page+"/"+$scope.pageItems)
			.then(function(response) {
				$scope.properties = response.data;
				//console.log(response.data);				
			});			
		};	//end pagination
		
		//search filter function
		$scope.searchFilter = function(statusCol, searchProp) {
			$scope.search = {search: true};
			$scope.filterStatus= {};
			$scope.propStatus = {};
			(searchProp =="") ? delete $scope.propStatus[statusCol] : $scope.filterStatus[statusCol] = searchProp;
			angular.extend($scope.propStatus, $scope.filterStatus);
			angular.extend($scope.propStatus, $scope.search);			
				dataService.get("getmultiple/property/1/"+$scope.pageItems, $scope.propStatus)
				.then(function(response) {  //function for userlist response
					if(response.status == 'success'){
						$scope.properties = response.data;
						$scope.totalRecords = response.totalRecords;
					}else{
						$scope.properties = {};
						$scope.totalRecords = {};
						$scope.alerts.push({type: response.status, msg: response.message});
					}					
				});
		}		
		
		//view single property modal
		 $scope.open = function (url, propId) {
			dataService.get("/property/"+propId)
			.success(function(response) {
				var modalDefaults = {
					templateUrl: url,	// apply template to modal
				};
				var modalOptions = {
					property: response  // assign data to modal
				};
				modalService.showModal(modalDefaults, modalOptions).then(function (result) {
					console.log("modalOpened");
				});
			});			
		};	
		$scope.ok = function () {
			$modalOptions.close('ok');
		};	//end of modal function
		
		
		var myProperty = function(){			
			dataService.get("/getmultiple/property/"+$scope.myProperty+"/"+$scope.pageItems)
			.then(function(response) {  //function for property list response
				if(response.status == 'success'){
					$scope.totalRecords = response.totalRecords;
					$scope.properties = response.data;
					console.log(response.data);
				}else{
					$scope.alerts.push({type: response.status, msg: response.message});
				}
			});
		};
		
		
		
		
		
		/* // Single Property view
		if($routeParams.id) {
			dataService.get("/property/"+$routeParams.id)
			.success(function(response) {
				$scope.properties = response;
				console.log($scope.properties);
		    });		
		}
		// Multiple Property View
		else{	
			dataService.get("/properties/"+$scope.currentPage+"/10")
			.success(function(response) {
				$scope.properties = response.properties;
				$scope.totalRecords = response.totalRecords;
				//console.log($scope.properties);
			});
		} */		
	};		
	// Inject controller's dependencies
	propertyController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('propertyController', propertyController);
});
