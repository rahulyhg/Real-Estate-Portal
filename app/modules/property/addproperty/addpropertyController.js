'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','$http','$rootScope','upload', '$timeout'];
    // This is controller for this view
	var addpropertyController = function ($scope, $injector,$routeParams,$http,$rootScope, upload, $timeout) {
		$rootScope.metaTitle = "Add Real Estate Property";
		
		// Add property
		$scope.reset = function() {
			$scope.property = {};
		};
		$scope.addprop = function(){
			console.log($scope.property);
			$http.post("../server-api/index.php/addproperty", $scope.property)
			.success(function(response) {
				alert(response);
				$scope.reset();
			});
		};
		if($routeParams.id){
			//Update Property
			$http.get("../server-api/index.php/property/"+$routeParams.id)
			.success(function(response) {
					$scope.property = response;
					$scope.reset = function() {
						$scope.property = angular.copy($scope.property);
					};
					$scope.reset();
					console.log($scope.property);			
			});	
			$scope.update = function(){
				$http.put("../server-api/index.php/editproperty/"+$routeParams.id,$scope.property)
				.success(function(response) {
					alert(response);
				});
			};
		}
		
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
	
	};		
	// Inject controller's dependencies
	addpropertyController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('addpropertyController', addpropertyController);
	
});
