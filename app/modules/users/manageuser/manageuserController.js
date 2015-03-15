'use strict';

define(['app'], function (app) { 
    var injectParams = ['$scope', '$injector', '$routeParams','$location','dataService']; /* Added $routeParams to access route parameters */
    // This is controller for this view
	var manageuserController = function ($scope, $injector, $routeParams,$location,dataService) {
		console.log("this is manageuserController");
		
		// all $scope object goes here{pooja}
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.userCurrentPage = 1;
		$scope.usergroupCurrentPage= 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		$scope.userViews = $routeParams.userViews;
		$scope.usersListCurrentPage=1;		
		$scope.usersGroupCurrentPage=1;
		$scope.alerts = [];
		
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
		
		// for date picker {Pooja}
		$scope.today = function() 
		{
			$scope.userRegDt = new Date();
			$scope.birthdate= new Date();
		};
		$scope.today();

		$scope.open = function($event,opened)
			{
				$event.preventDefault();
				$event.stopPropagation();
				$scope[opened] = ($scope[opened] ===true) ? false : true;
			};		
		//End  Date Picker 
				 
		//console.log($scope.userViews);
		
		//For display by default userslist.html page
		if(!$routeParams.userViews) {
		$location.path('/dashboard/users/userslist');
		//console.log($location.path);
		}	
		
		//Code For Pagination
		$scope.pageChanged = function(page) {				
			dataService.get("/getmultiple/users/"+page+"/"+$scope.pageItems)
			.then(function(response) {
				$scope.users = response.user;
				
			});
		}; //end pagination
		
		
		/* //code for delete single user
		$scope.changeStatus = function(id, status, index){
			if(status==1){
				$scope.userStatus = {status : 0};
				dataService.put("put/user/"+id, $scope.userStatus)
				.then(function(response) { 
					console.log(response.message);
					$scope.templates[index].status = 0				
				});
			}
		}; */
		
		
		// switch functions 
		var usersList = function(){
			$scope.userStatus = {status : 1};			
			angular.extend($scope.userStatus);	
			dataService.get("/getmultiple/user/"+$scope.usersListCurrentPage+"/"+$scope.pageItems, $scope.userStatus)			
			.then(function(response) { 
				if(response.status == 'success'){
					$scope.totalRecords = response.totalRecords;
					$scope.users = response.data;
					//console.log(response.data);
				}
				else{
					$scope.alerts.push({type: response.status, msg: response.message});
				}	
			});
			
			/* $scope.verify = function(id, status){
				$scope.veryfiedData = {status : status};
				
				dataService.put("put/user/"+id, $scope.veryfiedData)
				.then(function(response) { //function for businesslist response
					console.log(response);
				});
			} ; */
		};	
		
		var usersGroup = function(){
			$scope.userStatus = {status : 1};			
			angular.extend($scope.userStatus);		
			dataService.get("/getmultiple/user/"+$scope.usersGroupCurrentPage+"/"+$scope.pageItems, $scope.userStatus)			
			.then(function(response) { 
				if(response.status == 'success'){
					$scope.totalRecords = response.totalRecords;
					$scope.users = response.data;
					console.log(response.data);
				}
				else{
					$scope.alerts.push({type: response.status, msg: response.message});
				}	
			});
		};		
		//search filter function
		$scope.searchFilter = function(statusCol, searchTemp) {
			$scope.search = {search: true};
			$scope.filterStatus= {};
			(searchTemp =="") ? delete $scope.userStatus[statusCol] : $scope.filterStatus[statusCol] = searchTemp;
			angular.extend($scope.userStatus, $scope.filterStatus);
			angular.extend($scope.userStatus, $scope.search);			
			
			dataService.get("/getmultiple/user/1/"+$scope.pageItems, $scope.userStatus)
			.then(function(response) {  //function for userlist response
				if(response.status == 'success'){
					$scope.users = response.data;
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.users = {};
					$scope.totalRecords = {};
					$scope.alerts.push({type: response.status, msg: response.message});
				}
				//console.log($scope.properties);
			});
		};		
		
			
		/* //create user group
		var usersGroup = function(){
				$scope.postData = function(usergroup) {
				console.log(usergroup);
				dataService.post("/post/user/"+pageItems,adduser)
				.then(function(response) {  
					if(response.status=="success"){
						$scope.alerts.push({type: response.status, msg: response.message});
					}else{
						$scope.alerts.push({type: response.status, msg: response.message});
					}
					$scope.reset();
				});
				
			}
		}	 */
		
		//post method for insert data in request data form{Pooja}
		var addUsers = function(){
			$scope.addusers={};
			$scope.postData = function(addusers) { 
			
				 console.log($scope.addusers);
				/* dataService.post("/post/user",addusers)
				.then(function(response) {  //function for response of request temp
					if(response.status == 'success'){
						$scope.addusers = response.data;
						console.log(response);
						$scope.reset();
					}else{
						$scope.alerts.push({type: response.status, msg: response.message});
					}	
				});	  */
		} 
};//end post Method
			
		switch($scope.userViews) {
			case 'adduser':
				addUsers();
				break;			
			case 'userslist':
				usersList();
				break;
			case 'usersgroup':
				usersGroup();
				break;				
			
			default:
				usersList();
		};
		
	}; 
		
		
		
		 
		
		
			
	// Inject controller's dependencies
	manageuserController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('manageuserController', manageuserController);
	
});
