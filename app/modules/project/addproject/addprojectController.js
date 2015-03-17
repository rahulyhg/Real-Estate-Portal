'use strict';
define(['app'], function (app) {
	
	var injectParams = ['$scope','$rootScope','$injector', '$routeParams','upload','dataService'];
  // This is controller for this view
	var addprojectController = function ($scope,$rootScope, $injector,$routeParams,upload,dataService) {
		$rootScope.metaTitle = "Real Estate Add Project";
		$scope.alerts = [];
		$scope.project = {};
		$scope.project.overview = {};
		$scope.project.overview.details = {};
		$scope.project.amenities = {};
		$scope.project.amenities.details = {};
		$scope.project.specification = {};
		$scope.project.specification.details = {};
		$scope.project.location_map = {};
		$scope.project.location_map.details = {};
		$scope.project.layout_map = {};
		$scope.project.layout_map.details = {};
		$scope.project.floor_plan = {};
		$scope.project.floor_plan.details = {};
		$scope.project.project_gallery = {};
		$scope.Date = dataService.currentDate;
		$scope.project.project_gallery.details = {};
		console.log($rootScope.userDetails);
	
		
		console.log($scope.project.user_id);
		$scope.addToObject = function(data, object){
			object[data.title] = data.description;
		}
		
		$scope.removeObject = function(key, object){
			delete object[key];
		}
		//add project
		$scope.reset = function() {
			$scope.project = {};
		};
		
		// to close alert message
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
			console.log($rootScope.userDetails);
		 // this function will generate thumbnails of images
		$scope.generateThumb = function(files){ 
			upload.generateThumbs(files);
		};// End upload function
		$scope.addproject = function(project){
			console.log(project,$rootScope.userDetails.status);
			$scope.user_id={ user_id:$rootScope.userDetails.id };
			//Upload Function for uploading files 
			$scope.project={};
		
			$scope.userinfo = {user_id:$rootScope.userDetails.id}; 
			$scope.path = "project/"; // path to store images on server
			$scope.project.project_images  = {};
		
			// uploaded images will store in this array
			$scope.upload = function(files,path,userinfo,picArr){
				console.log(picArr);
				upload.upload(files,path,userinfo,function(data){
					var picArrKey = 0, x;
					for(x in picArr) picArrKey++;
					if(data.status === 'success'){
						console.log(data.details);
						picArr[picArrKey] = (JSON.stringify(data.details));
						console.log(data.message);
					}else{
						$scope.alerts.push({type: response.status, msg: response.message});
					}
		
				});
			};
		};
	};	
	 
	// Inject controller's dependencies
	addprojectController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('addprojectController',addprojectController);
	
	
});




	