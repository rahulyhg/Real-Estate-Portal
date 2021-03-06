'use strict';

define(['app'], function (app) { 
    var injectParams = ['$scope', '$injector', '$routeParams','$location','dataService']; /* Added $routeParams to access route parameters */
    // This is controller for this view
	var manageuserController = function ($scope, $injector, $routeParams,$location,dataService) {		
	
		console.log("this is manageuserController");
		
		// all $scope object goes here{pooja}
		$scope.maxSize = 5;
		$scope.totalRecords = "";		
		$scope.usergroupCurrentPage= 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		$scope.userViews = $routeParams.userViews;
		$scope.usersListCurrentPage=1;		
		$scope.usersGroupCurrentPage=1;
		$scope.alerts = [];
		$scope.currentDate = dataService.currentDate;
		console.log($scope.currentDate);
		
		//for chng tooltip using dynamicTooltip fun		
		$scope.dynamicTooltip = function(status, active, notActive){
			return (status==1) ? active : notActive;
		};
		
		console.log(dataService.config);	
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
		$scope.open = function($event,opened)
		{
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened = ($scope.opened==true)?false:true;
		};	
		$scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = 'yyyy-MM-dd';			
		//End  Date Picker 			
		
		//For display by default userslist.html page
		if(!$routeParams.userViews) {
		$location.path('/dashboard/users/userslist');
		//console.log($location.path);
		}	
				
		//code for pagination
		$scope.pageChanged = function(page) {
			if($scope.userViews=='userslist'){	
				dataService.get("getmultiple/user/"+page+"/"+$scope.pageItems)
				.then(function(response) {
					$scope.users = response.data;			
				});
			}
			if($scope.userViews=='usersgroup'){
				dataService.get("getmultiple/usergroup/"+page+"/"+$scope.pageItems)
				.then(function(response) {
					$scope.usergroupList = response.data;					
				});
			}	
		}; //end pagination
		
		//global method for change status of particular column 
		$scope.hideDeleted = "";// & use this filter in ng-repeat - filter: { status : hideDeleted}
		$scope.changeStatus = {};
		$scope.changeStatusFn = function(colName, colValue, id){
			$scope.changeStatus[colName] = colValue;				
			//console.log($scope.changeStatus);
			if($scope.userViews=='userlist'){
				 dataService.put("put/user/"+id,$scope.changeStatus)			
				.then(function(response) {					
					if(colName=='status'){					
					}
					$scope.alerts.push({type: response.status,msg: response.message});
				}); 
			}else if($scope.userViews=='usergroup'){
				dataService.put("put/usergroup/"+id,$scope.changeStatus)		
				.then(function(response) {					
					if(colName=='status'){					
					}
					$scope.alerts.push({type: response.status,msg: response.message});
				});
			}		
		};	
		$scope.forgotPass = function(colName, colValue, id){
			$scope.changeStatus[colName] = colValue;				
				 dataService.post("post/user/forgotpass", $scope.changeStatus)
				.then(function(response) {					
					$scope.alerts.push({type: response.status,msg: response.message});
				}); 
		};
		$scope.editGroupName = function(colName, colValue, id, editStatus){
			$scope.changeStatus[colName] = colValue;

			if(editStatus==0){
				 dataService.put("put/user/"+id,$scope.changeStatus)
				.then(function(response) { 
					if(colName=='status'){					
					}
					$scope.alerts.push({type: response.status,msg: response.message});
				}); 
			}
		};	
		
		//check availability
		$scope.checkuserAvailable = function(addusers){
			dataService.post("post/user/checkavailability",addusers)
			.then(function(response) {  
				if(response.status == 'success'){
					
				}else{
					$scope.alerts.push({type: response.status, msg: response.message});
				}
			});
		}	
		
		// switch functions 
		var usersList = function(){			
			dataService.get("getmultiple/user/"+$scope.usersListCurrentPage+"/"+$scope.pageItems)			
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
		};	
		  
		//for usergroup data view
		var usersGroupList = function(){					
			dataService.get("getmultiple/usergroup/"+$scope.usersGroupCurrentPage+"/"+$scope.pageItems)			
			.then(function(response) { 
				console.log(response);
				 if(response.status =='success'){
					$scope.totalRecords = response.totalRecords;
					$scope.usergroupList = response.data;
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
			$scope.userStatus = {};
			(searchUser =="") ? delete $scope.userStatus[statusCol] : $scope.filterStatus[statusCol] = searchUser;
			angular.extend($scope.userStatus, $scope.filterStatus);
			angular.extend($scope.userStatus, $scope.search);	
			if($scope.userViews=='userslist'){
				dataService.get("getmultiple/user/1/"+$scope.pageItems, $scope.userStatus)
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
			}
			if($scope.userViews=='usersgroup'){
			dataService.get("getmultiple/usergroup/1/"+$scope.pageItems, $scope.userStatus)
				.then(function(response) {  //function for usersgrouplist response
					if(response.status == 'success'){
						$scope.usergroupList = response.data;
						$scope.totalRecords = response.totalRecords;
					}else{
						$scope.usergroupList = {};
						$scope.totalRecords = {};
						$scope.alerts.push({type: response.status, msg: response.message});
					}
					//console.log($scope.properties);
				});
			}	
		};
		
		
	 //for inserting data into createusergroup
	 $scope.createUserGroup={};
		var createUserGroup = function(){		
			$scope.createUserGroup.date = $scope.currentDate; 
			$scope.postData = function(usergroup) { 
				console.log(usergroup);
				dataService.post("post/usergroup",usergroup)				
				.then(function(response) {  //function for response of request temp
					if(response.status == 'success'){
					$scope.submitted = true;				
					}else{
						$scope.alerts.push({type: response.status, msg: response.message});
					}	
				});	  
			}	
			
			//update into usergroup
			if($routeParams.id){//Update user			
			dataService.get("getsingle/usergroup/"+$routeParams.id)
			.then(function(response) {
					$scope.createUserGroup = response.data;	
					console.log(createUserGroup);					
				});				
				$scope.update = function(createUserGroup){				
					console.log(createUserGroup);						
					dataService.put("put/usergroup/"+$routeParams.id,createUserGroup)
					.then(function(response) { //function for response of request temp
						if(response.status == 'success'){
							$scope.submitted = true;
							$scope.alerts.push({type: response.status,msg: response.message});						
						}else{
							$scope.alerts.push({type: response.status, msg: response.message});
						}	
					});	  
				};	
			}			
		};	
		 
		 
		 
		//post method for insert data in request data form{Pooja}
		var addUsers = function(){
			//$scope.addusers={};
			$scope.postData = function(addusers) { 
			//console.log(addusers);
				 dataService.post("post/user/register",addusers)
				.then(function(response) {  //function for response of request temp
					if(response.status == 'success'){
					$scope.submitted = true;				
					}else{
						$scope.alerts.push({type: response.status, msg: response.message});
					}	
				});	  
			}			
			//update data into users table
			if($routeParams.id){//Update user			
			dataService.get("getsingle/user/"+$routeParams.id)
			.then(function(response) {
					$scope.addusers = response.data;					
				});	
				
			$scope.update = function(addusers){				
				console.log(addusers);						
				dataService.put("put/user/"+$routeParams.id ,addusers)
				.then(function(response) {  //function for response of request temp
					if(response.status == 'success'){
						$scope.submitted = true;
						$scope.alerts.push({type: response.status,msg: response.message});						
					}else{
						$scope.alerts.push({type: response.status,msg: response.message});
					}	
				});	 
			};	
		}		
	};//end addUser Method	  
	
			
		switch($scope.userViews) {
			case 'adduser':
				addUsers();
				break;		
			case 'createusergroup':
				createUserGroup();
				break;				
			case 'userslist':
				usersList();
				break;
			case 'usersgroup':
				usersGroupList();
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
