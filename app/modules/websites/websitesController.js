'use strict';

define(['app'], function (app) {
    var injectParams = ['$scope', '$rootScope','$injector','$routeParams','$location','dataService','upload','modalService'];

    // This is controller for this view
	var websitesController = function ($scope,$rootScope,$injector,$routeParams,$location,dataService,upload,modalService) {
		
		$scope.open = function (url, webId) {
			dataService.get("getsingle/website/"+webId)
			.then(function(response) {
				var modalDefaults = {
					templateUrl: url,	// apply template to modal
					size : 'lg'
				};
				var modalOptions = {
					website: response.data[0]  // assign data to modal
				};
				console.log(response.data[0]);
				modalService.showModal(modalDefaults, modalOptions).then(function (result) {
					console.log("modalOpened");
				});
			});
		};
		$scope.ok = function () {
			$modalOptions.close('ok');
		};
		
		
        //for display form parts
        $scope.webPart = $routeParams.webPart;
        // all $scope object goes here
        $scope.alerts = [];
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.myWebsiteCurrentPage = 1;
		$scope.reqestSiteCurrentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";
		//$scope.currentDate = dataService.currentDate;
       $scope.userDetails = {user_id : $rootScope.userDetails.id}; // these are URL parameters
	   $scope.currentDate = dataService.currentDate;
		// All $scope methods
		
		
		
        $scope.pageChanged = function(page,where) { // Pagination page changed
			$scope.userDetails;
			dataService.get("/getmultiple/website/"+page+"/"+$scope.pageItems,  $scope.userDetails)
			.then(function(response) {  //function for websitelist response
				$scope.website = response.data;
				//console.log($scope.properties);
			});
		};
		
        /*For display by default websitelist.html page*/
		if(!$scope.webPart) {
			$location.path('/dashboard/websites/mywebsites');
		}
              
        var mywebsites = function(){
			//function for mywebsites{sonali}
			dataService.get("/getmultiple/website/"+$scope.myWebsiteCurrentPage+"/"+$scope.pageItems, $scope.userDetails)
			.then(function(response) {  //function for mywebsites response
			if(response.status == 'success'){
					$scope.website=response.data;
					console.log($scope.website);
					$scope.alerts.push({type: response.status, msg:'data access successfully..'});
					$scope.totalRecords = response.totalRecords;	
				}
				else
				{
					$scope.alerts.push({type: response.status, msg: response.message});
				};
			});
		};
        
		 var requestnewsite = function(){		
			//post method for insert data in request template form{sonali}
			
			$scope.reqnewsite = {};
			$scope.postData = function(reqnewsite) { 
			$scope.reqnewsite.created_date = $scope.currentDate
			$scope.reqnewsite.user_id = $scope.userDetails.user_id;
				console.log(reqnewsite);	
				 dataService.post("post/website",reqnewsite,$scope.user_id)
				.then(function(response) {  //function for response of request site
					$scope.reqnewsite = response.data;
					console.log(response);
					$scope.reset();
				});   
			}//end of post method{sonali} 
		};
        
		
  
        switch($scope.webPart) {
			case 'mywebsites':
			console.log($scope.webPart);
				mywebsites();
			case 'requestnewsite':
			requestnewsite();
			break;
			default:
				mywebsites();
		};
		
    };
	
	// Inject controller's dependencies
	websitesController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('websitesController', websitesController);
	
	
});
