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
		
		//for chng tooltip using dynamicTooltip fun
		$scope.dynamicTooltip = function(status, active, notActive){
		   return (status==1) ? active : notActive;
		 };
		 
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
				 
			//show dropdown list	 
		$scope.showDropDown = function($event,opened1)
		
			{
				$scope.selected = undefined;
				$scope.user_groups = []; 				  				
				$event.preventDefault();
				$event.stopPropagation();
				$scope[opened1] = ($scope[opened1] ===true) ? false : true;
			};	
				//end dropdown
			
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
		
		// when click on button database status will update
		$scope.hideDeleted = ""; // this is for hide deleted or active records from view
		// & use this filter in ng-repeat - filter: { status : hideDeleted}
		$scope.changeStatus = function(colName, colValue, id){
			$scope.changeStatus[colName] = colValue;
			console.log(colValue);
			
			/* dataService.put("put/user/"+id, $scope.changeStatus)
			.then(function(response) { //function for userlist response
				if(colName=='status'){
					$scope.hideDeleted = 1;
				}
				$scope.alerts.push({type: response.status, msg: response.message});
			}); */
		};
		
		
		//code for delete single user
		$scope.changeStatus = function(id, status, index){
			if(status==1){
				$scope.userStatus = {status : 0};
				dataService.put("put/user/"+id, $scope.userStatus)
				.then(function(response) { 
					console.log(response.message);
					$scope.users[index].status = 1				
				});
			}
		}; 
		
		
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
		$scope.searchFilter = function(statusCol, searchUser) {
			$scope.search = {search: true};
			$scope.filterStatus= {};
			(searchUser =="") ? delete $scope.userStatus[statusCol] : $scope.filterStatus[statusCol] = searchUser;
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
			
		 //create user group
		var usersGroup = function(){
				$scope.postData = function(usergroup) {
				console.log(usergroup);
				/* dataService.post("post/user/"+pageItems,usergroup)
				.then(function(response) {  
					if(response.status == 'success'){
					$scope.submitted = true;
					$scope.alerts.push({type: response.status, msg: response.message});
				
					}else{
						$scope.alerts.push({type: response.status, msg: response.message});
					}
					$scope.reset();
				});  */				
			}
		}	 
		
		//post method for insert data in request data form{Pooja}
		var addUsers = function(){
			//$scope.addusers={};
			$scope.postData = function(addusers) { 
			console.log(addusers);
				 dataService.post("post/user/register",addusers)
				.then(function(response) {  //function for response of request temp
					if(response.status == 'success'){
					$scope.submitted = true;
					$scope.alerts.push({type: response.status, msg: response.message});
				
					}else{
						$scope.alerts.push({type: response.status, msg: response.message});
					}	
				});	  
			}


			if($routeParams.id){//Update user			
			dataService.get("getsingle/user/"+$routeParams.id)
			.then(function(response) {
					$scope.addusers = response.data;			
					$scope.update = function(addusers){				
						console.log(addusers);
						$scope.putParams = {id : $routeParams.id};
						dataService.put("put/user/"+$scope.putParams ,addusers)
						.then(function(response) {  //function for response of request temp
							if(response.status == 'success'){
								$scope.submitted = true;
								$scope.alerts.push({type: response.status, msg: response.message});
						
							}else{
								$scope.alerts.push({type: response.status, msg: response.message});
							}	
						});	 
					};
				});
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
