'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','$http','$rootScope','upload', '$timeout', 'dataService'];
    // This is controller for this view
	var addpropertyController = function ($scope, $injector,$routeParams,$http,$rootScope, upload, $timeout,dataService) {
		$rootScope.metaTitle = "Add Real Estate Property";
		
		// Add property
		$scope.reset = function() {
			$scope.property = {};
		};
		$scope.addprop = function(){
			console.log($scope.property);
			dataService.post("post/property", $scope.property)
			.then(function(response) {
				alert(response);
				$scope.reset();
			});
		};
		var where = {name : "vilas"};
		dataService.get("getsingle/property/2", where)
			.then(function(response) {
				//$scope.property = response.data;
				console.log(response);
			});
		/* if($routeParams.id){
			//Update Property
			dataService.get("getsingle/property/"+$routeParams.id, where)
			.then(function(response) {
					$scope.property = response;
					$scope.reset = function() {
						$scope.property = angular.copy($scope.property);
					};
					$scope.reset();
					//console.log($scope.property);			
			});	
			$scope.update = function(){
				$http.put("../server-api/index.php/editproperty/"+$routeParams.id,$scope.property)
				.success(function(response) {
					alert(response);
				});
			};
		} */
		
		//Upload Function for uploading files {Vilas}
		$scope.property={}; // this is form object
		$scope.userinfo = {userId:1, name:"vilas"}; // this is for uploading credentials
		$scope.path = "property/"; // path to store images on server
		$scope.property.prop_image = []; // uploaded images will store in this array
		$scope.upload = function(files,path,userinfo){ // this function for uploading files
			upload.upload(files,path,userinfo,function(data){
				if(data.status !== 'error'){
					$scope.property.prop_image.push(JSON.stringify(data.details));
					console.log(data.message);
				}else{
					alert(data.message);
				}
				
			});
		};
		
		$scope.generateThumb = function(files){  // this function will generate thumbnails of images
			upload.generateThumbs(files);
		};
		// End upload function {Vilas}
		$scope.property = {};
		$scope.property.other_domain = ['all'];
		$scope.roles = [
			'guest', 
			'user', 
			'customer', 
			'admin'
		  ];
		  $scope.user = {
			roles: ['guest']
		  };
		  $scope.checkAll = function() {
			$scope.user.roles = angular.copy($scope.roles);
		  };
	};		
	// Inject controller's dependencies
	addpropertyController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('addpropertyController', addpropertyController);
	
});
