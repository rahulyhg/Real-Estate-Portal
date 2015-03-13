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
		$scope.userView = $routeParams.userView;
		$scope.usersListCurrentPage=1;		
		$scope.usersGroupCurrentPage=1;
		$scope.alerts = [];
		
		 //for alert {Pooja}		 
		if($scope.status=="warning"){     
			 $scope.alerts.push({type: 'error', msg: "Error to load data" 
			 });
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
				 
		//console.log($scope.userView);
		
		//For display by default userslist.html page
		if(!$routeParams.userView) {
		$location.path('/dashboard/users/userslist');
		//console.log($location.path);
		}	
		
		//Code For Pagination
		$scope.pageChanged = function(page) {			
			angular.extend($scope.userStatus, $scope.user_id);		
			dataService.get("/getmultiple/users/"+page+"/"+$scope.pageItems,$scope.userStatus)
			.then(function(response) {
				$scope.users = response.user;
				
			});
		}; //end pagination
		
		
		/* //code for delete single template
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
			angular.extend($scope.userStatus,$scope.user_id);	
			dataService.get("/getmultiple/user/"+$scope.usersListCurrentPage+"/"+$scope.pageItems, $scope.userStatus)			
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
		
		var usersGroup = function(){
			$scope.userStatus = {status : 1};			
			angular.extend($scope.userStatus,$scope.user_id);		
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
		
		switch($scope.userViews) {			
			case 'userslist':
				usersList();
				break;
			case 'usersgroup':
				usersGroup();
				break;				
			
			default:
				usersList();
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
		
		 
		/* if($routeParams.id){
			//Update user
			dataService.get("getsingle/user/"+$routeParams.id, where)
			.then(function(response) {
					$scope.user = response;
					$scope.reset = function() {
						$scope.user = angular.copy($scope.user);
					};
					$scope.reset();
					//console.log($scope.user);			
			});	
			$scope.update = function(){
				dataService.put("/edituser/"+$routeParams.id,$scope.user)
				.success(function(response) {
					alert(response);
				});
			};*/
		
		//post method for insert data in request data form{Pooja}
			$scope.postData = function(users) { 
				console.log(users);
				dataService.post("/post/user",$scope.user)
				.then(function(response) {  //function for response of request temp
					if(response.status == 'success'){
						$scope.user = response.data;
						console.log(response);
						$scope.reset();
					}else{
						$scope.alerts.push({type: response.status, msg: response.message});
					}	
				});	
			} //end post Method
		}; 
		
		
			
	// Inject controller's dependencies
	manageuserController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('manageuserController', manageuserController);
	
});
