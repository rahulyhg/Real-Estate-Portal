'use strict';
define(['app', 'css!modules/users/register/register'], function (app) {
    var injectParams = ['$scope','$rootScope', '$injector','dataService','upload'];

    // This is controller for this view
	var registerController = function ($scope,$rootScope,$injector,dataService,upload) {
		console.log("this is register controller");			
		//to set registration date
		$scope.currentDate = dataService.currentDate;
		console.log($scope.currentDate);
		$scope.alerts = [];
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		// to cancel registration
		$scope.reset = function() {
			$scope.register = {};
		};
		
		// this function will generate thumbnails of images
		$scope.generateThumb = function(files){  
			upload.generateThumbs(files);
		};
		
		// code for birth date
		
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
		
		// code for uploading file
			$scope.register = {};
			$scope.edit = {};
			$scope.register.register_date = $scope.currentDate;
			$scope.userinfo = {userId:1, name:"vilas"};
			$scope.path = "user/"; 
			//for edit profile object for uploading images
			
			$scope.edit.user_img = [];
			$scope.register.user_img = []; // uploaded images will store in this array
			// this function for uploading files
			$scope.upload = function(files,path,userinfo){ 
				upload.upload(files,path,userinfo,function(data){
					if(data.status !== 'error'){
						$scope.register.user_img.push(JSON.stringify(data.details));
						$scope.edit.user_img.push(JSON.stringify(data.details));
					}else{
						alert(data.message);
					}
				});
			};
			
		$scope.passMatch = function(pass1, pass2){
			$scope.pass = (pass1===pass2) ? true : false;
			//alert($scope.pass);
		}
		$scope.submitted = false;
		$scope.registeruser = function(register){
			$scope.params = {url:'login'};
			dataService.post("post/user/register", register)
			.then(function(response) {
				if(response.status == 'success'){
					$scope.submitted = true;
					$scope.alerts.push({type: response.status, msg: response.message});
				}
			},function(err){
				console.log(err);
			})
		}	
		
		$scope.edit.id = $rootScope.userDetails.id;
		$scope.edit.user_img = $rootScope.userDetails.user_img;
		$scope.edit.name = $rootScope.userDetails.name;
		$scope.edit.address = $rootScope.userDetails.address;
		$scope.edit.country = $rootScope.userDetails.country;
		$scope.edit.phone = $rootScope.userDetails.phone;
		$scope.edit.dob = $rootScope.userDetails.dob;
		$scope.edit.website = $rootScope.userDetails.website;
			$scope.editprofile = function(id,edit){
				$scope.edit.user_img=edit.user_img;
				console.log(edit.user_img);
				dataService.put("put/user/"+id,edit)
				.then(function(response) {
					
					
					if(response.status == 'success'){
						$scope.alerts.push({type: response.status, msg: response.messa
					});
					}else{
						$scope.alerts.push({type: (response.status == 'error') ? "danger" :response.status, msg: response.message});
					}
				});
			};
			
	};	
	
	// Inject controller's dependencies
	registerController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('registerController', registerController);
	
});











