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
		$scope.hideDeleted = "";
		//$scope.currentDate = dataService.currentDate;
       $scope.userDetails = {user_id : $rootScope.userDetails.id}; // these are URL parameters
	   $scope.currentDate = dataService.currentDate;
		// All $scope methods
		
		/*For display by default websitelist.html page*/
		if(!$scope.webPart) {
			$location.path('/dashboard/websites/mywebsites');
		}
		
		//function for close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
			
		//for tooltip
		$scope.dynamicTooltip = function(status, active, notActive){
			return (status==1) ? active : notActive;
		};
		
        $scope.pageChanged = function(page) { // Pagination page changed
		//angular.extend($scope.featured, $scope.userDetails);
			$scope.userDetails;
			dataService.get("getmultiple/website/"+page+"/"+$scope.pageItems,  $scope.userDetails)
			.then(function(response) {  //function for websitelist response
				$scope.website = response.data;
				//console.log($scope.properties);
			});
		};
		
		//this is global method for filter 
		$scope.changeStatusFn = function(statusCol, showStatus) {
			console.log($scope.status);
			$scope.filterStatus= {};
			(showStatus =="") ? delete $scope.status[statusCol] : $scope.filterStatus[statusCol] = showStatus;
			angular.extend($scope.status, $scope.filterStatus);
			dataService.get("getmultiple/website/1/"+$scope.pageItems, $scope.status)
			.then(function(response) {  
				if(response.status == 'success'){
					$scope.website = response.data;
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.website = {};
					$scope.totalRecords = {};
					$scope.alerts.push({type: response.status, msg: "No data Found"});
				}
				//console.log($scope.properties);
			});
		};  
		
		$scope.changeStatus={};
		$scope.editDomainName = function(colName, colValue, id, editStatus){
			$scope.changeStatus[colName] = colValue;
			console.log(colValue);
			console.log($scope.changeStatus);
				if(editStatus==0){
				 dataService.put("put/website/"+id,$scope.changeStatus)
				.then(function(response) { 
					//if(status=='success'){
						//$scope.hideDeleted = 1;
					//}
					$scope.alerts.push({type: response.status,msg:"One row updated"});
				}); 
			}
		};	 
		
		//search filter{sonali}
		$scope.searchFilter = function(statusCol, colValue) {
			$scope.search = {search: true};
			$scope.websiteParams={};
			$scope.filterStatus= {};
			(colValue =="") ? delete $scope.websiteParams[statusCol] : $scope.filterStatus[statusCol] = colValue;
			angular.extend($scope.websiteParams, $scope.filterStatus);
			angular.extend($scope.websiteParams, $scope.search);
			
			if(colValue.length >= 4 || colValue ==""){
				dataService.get("getmultiple/website/1/"+$scope.pageItems, $scope.websiteParams)
				.then(function(response) {  //function for templatelist response
					if(response.status == 'success'){
						$scope.website = response.data;
						$scope.totalRecords = response.totalRecords;
					}else{
						$scope.website = {};
						$scope.totalRecords = {};
						$scope.alerts.push({type: response.status, msg: response.message});
					}
					//console.log($scope.properties);
				});
			}
		};
		
		$scope.editDomainName = function(colName, colValue, id, editStatus){
			$scope.changeStatus[colName] = colValue;
			console.log(colValue);
			if(editStatus==0){
				 dataService.put("put/website/"+id,$scope.changeStatus)
				.then(function(response) { 
					$scope.alerts.push({type: response.status,msg: response.message});
				}); 
			}
		};	
		
		$scope.showInput = function($event,opened)		
		{
			//$scope.selected = undefined;
			$scope.domain_name = []; 				  				
			$event.preventDefault();
			$event.stopPropagation();
			$scope[opened] = ($scope[opened] ===true) ? false : true;
		};
		
        var mywebsites = function(){
			$scope.websiteParams = $scope.userDetails;
			//function for mywebsites{sonali}
			angular.extend($scope.websiteParams, $scope.userDetails);
			dataService.get("getmultiple/website/"+$scope.myWebsiteCurrentPage+"/"+$scope.pageItems, $scope.websiteParams)
			.then(function(response) {  //function for mywebsites response
			if(response.status == 'success'){
					$scope.website=response.data;
					console.log($scope.website);
					//$scope.alerts.push({type: response.status, msg:'data access successfully..'});
					$scope.totalRecords = response.totalRecords;	
				}
				else
				{
					$scope.alerts.push({type: response.status, msg: response.message});
				};
			});
			
			//delete button {trupti}
			$scope.deleted = function(id, status){
				$scope.deletedData = {status : status};
				dataService.put("put/website/"+id, $scope.deletedData)
				.then(function(response) { //function for businesslist response
					if(response.status == 'success'){
						//$scope.hideDeleted = 1;
						//console.log(response);
						$scope.website=response.data;
					}
				});
			};			
		};
       
		var requestedsitelist = function(){
			//function for requestedsitelist{sonali}
			dataService.get("/getmultiple/website/"+$scope.reqestSiteCurrentPage+"/"+$scope.pageItems, $scope.userDetails)
			.then(function(response) {  //function for requestedsitelist response
			if(response.status == 'success'){
					$scope.website=response.data;
					$scope.alerts.push({type: response.status, msg:'data access successfully..'});
					$scope.totalRecords = response.totalRecords;	
				}
				else
				{
					$scope.alerts.push({type: response.status, msg: response.message});
				};
				$scope.website = response.data;
			});
		};
				
		 var requestnewsite = function(){		
			//post method for insert data in request template form{sonali}
			
			$scope.reqnewsite = {};
			$scope.postData = function(reqnewsite) { 
			$scope.reqnewsite.date = $scope.currentDate
			$scope.reqnewsite.user_id = $scope.userDetails.user_id;
				console.log(reqnewsite);	
				 dataService.post("post/website",reqnewsite,$scope.user_id)
				.then(function(response) {  //function for response of request site
					$scope.reqnewsite = response.data;
					console.log(response);
				//	$scope.reset();
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
			case 'requestedsitelist':
				requestedsitelist();
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
