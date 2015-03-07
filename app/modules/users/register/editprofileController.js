'use strict';
define(['app', 'css!modules/users/register/edit'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','upload','$http'];
    // This is controller for this view
	var editprofileController = function ($scope, $injector,$routeParams,$http,$upload) {
		console.log("this is edit controller");	
		// for date picker{Sunita}
		
		$scope.today = function() 
		{
			$scope.dt = new Date();
		};
		$scope.today();
		$scope.open = function($event)
		{
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened= true;
		};
		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];
		
		//*** End date Picker Code
		
		if($routeParams.id){
		//update record
			$http.get("server-api/index.php/editprofile/"+$routeParams.id)
			.success(function(response) {
				$scope.editpro = response;
				$scope.reset = function() {
					console.log($scope.editpro)
					$scope.editpro = angular.copy($scope.editpro);
				};
				$scope.reset();
				console.log($scope.editpro);		
			}).error(function(err){
				console.log(err);
			});
		
			$scope.update = function(){
				console.log($scope.editpro)
				$http.put("server-api/index.php/editprofile/"+$routeParams.type,$scope.editpro)
				.success(function(response) {
					alert(response);
					console.log(response);
				})
			};
		}
		
		
		//Upload Function for uploading files {Pooja}
		$scope.editpro={}; // this is form object
		$scope.userinfo = {userId:1, name:"vilas"}; // this is for uploading credentials
		$scope.path = "property/"; // path to store images on server
		$scope.property.user_img0 = []; // uploaded images will store in this array
		$scope.upload = function(files,path,userinfo){ // this function for uploading files
			upload.upload(files,path,userinfo,function(data){
				if(data.status !== 'error'){
					$scope.editpro.user_img.push(JSON.stringify(data.details));
					console.log(data.message);
				}else{
					alert(data.message);
				}
				
			});
		};
		
		$scope.generateThumb = function(files){  // this function will generate thumbnails of images
			upload.generateThumbs(files);
		};
		// End upload function {Pooja}
		
	};		
		
		
	// Inject controller's dependencies
	editprofileController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('editprofileController',editprofileController);	
});
