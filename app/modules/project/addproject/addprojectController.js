'use strict';
define(['app'], function (app) {
	
	var injectParams = ['$scope','$rootScope','$injector', '$routeParams','upload','dataService'];
  // This is controller for this view
	var addprojectController = function ($scope,$rootScope, $injector,$routeParams,upload,dataService) {
		$rootScope.metaTitle = "Real Estate Add Project";
		$scope.alerts = [];
		$scope.userinfo = {user_id : $rootScope.userDetails.id};
		$scope.currentDate = dataService.currentDate;
		
		$scope.project = {
			image:{}
		};
		$scope.project.image = {url : "lfjdlk"};
		
		$scope.project = {
			featured : 0,
			overview : { details : {} },
			amenities : { details : {} },
			specification : { details : {} },
			location_map : { details : {} },
			layout_map : { details : {} },
			floor_plan : { details : {} },
			project_gallery : { details : {} },
			project_images : { details : {} },
			created_date : $scope.currentDate,
			user_id : $rootScope.userDetails.id,
		};

		//Upload Function for uploading files 
		$scope.path = "project/"; 
		// for project image form part
		$scope.addimage = {
			description : {project_image : {}}
		};
		// for location map form part
		$scope.location_map={
			description : {location_image : {}}
		};
		// for floor plan form part
		$scope.afloor_plan={
			description : {floor_image : {}}
		};
		
		// add form part to main form object
		$scope.addToObject = function(data, object){
			console.log(data,object);
			$scope.project.project_images.details[data.title] = data.description;
		}
		// remove object from main form object
		$scope.removeObject = function(key, object){
			delete object[key];
		}
		
		// to close alert message
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		// this function for uploading files
		$scope.upload = function(files,path,userinfo, picArr){ 
			upload.upload(files,path,userinfo,function(data){
				var picArrKey = 0, x;
				for(x in picArr) picArrKey++;
				if(data.status === 'success'){
					picArr[picArrKey] = data.details;
					console.log(data.message);
				}else{
					$scope.alerts.push({type: response.status, msg: response.message});
				}
				
			}); 
		};
		$scope.generateThumb = function(files){  
			upload.generateThumbs(files);
		};// end file upload code
			
		//add project
		$scope.addproject = function(project){
			
			console.log(project);
			
			
		};
	};	
	 
	// Inject controller's dependencies
	addprojectController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('addprojectController',addprojectController);
	
});