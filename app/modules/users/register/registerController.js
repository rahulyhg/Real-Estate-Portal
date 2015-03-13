'use strict';
define(['app', 'css!modules/users/register/register'], function (app) {
    var injectParams = ['$scope', '$injector','dataService','upload',];

    // This is controller for this view
	var registerController = function ($scope, $injector,dataService,upload) {
		console.log("this is register controller");			
		//to set registration date
		$scope.currentDate = dataService.currentDate;
		console.log($scope.currentDate);
		
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
			$scope.register.register_date = $scope.currentDate;
			$scope.userinfo = {userId:1, name:"vilas"};
			$scope.path = "user/"; 
			$scope.register.user_img = []; // uploaded images will store in this array
			// this function for uploading files
			$scope.upload = function(files,path,userinfo){ 
				upload.upload(files,path,userinfo,function(data){
					if(data.status !== 'error'){
						$scope.register.user_img.push(JSON.stringify(data.details));
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
			console.log(register);
			
			dataService.post("post/user/register", register)
			.then(function(response) {
				if(response.status == 'success'){
					$scope.submitted = true;
					$scope.alerts.push({type: response.status, msg: response.message});
				}
				console.log(response);
			},function(err){
				console.log(err);
			})
		}	
				
    };	
	
	// Inject controller's dependencies
	registerController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('registerController', registerController);
	
});











