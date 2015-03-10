'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$location','$routeParams','$rootScope','upload','dataService','$http'];
    // This is controller for this view
	var templatesController = function ($scope, $injector,$location,$routeParams,$rootScope,upload,dataService,$http) {
		$rootScope.metaTitle = "Real Estate Template";		
	
		// all $scope object goes here{pooja}
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.propTemplate=1;		
		$scope.projTempCurrentPage = 1;
		$scope.customTempCurrentPage=1;
		$scope.myTemplate=1;
		$scope.listTempCurrentPage=1;
		$scope.webTempCurrentPage=1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		$scope.tempPart = $routeParams.tempPart;
 		$scope.alerts = [];
         //for alert {Pooja}
		 
		if($scope.status=="warning"){     
			 $scope.alerts.push({type: 'error', msg: "Error to load data" 
			 });
			 $scope.closeAlert = function(index) {
				$scope.alerts.splice(index, 1);
			 };
		}
		  
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
	
		/*For display by default websitesTemplate.html page*/
		//console.log($scope.tempPart);		
		if(!$routeParams.tempPart) {
			$location.path('/dashboard/templates/websitesTemplate');
		}	
		
		// All $scope methods
		$scope.pageChanged = function(page,where) {			
			angular.extend(where, $scope.user_id);		
			dataService.get("/getmultiple/templates/"+page+"/"+$scope.pageItems,where)
			.then(function(response) {
				$scope.templates = response.template;
				
			});
		}; //end pagination	
		
		// switch functions 
		var projectTemplate = function(){
			$scope.status = {status : 1};
			angular.extend($scope.status, $scope.user_id);
			dataService.get("/getmultiple/template/"+$scope.projTempCurrentPage+"/"+$scope.pageItems, $scope.status)
			.then(function(response) {  //function for templatelist response
				$scope.totalRecords = response.totalRecords;
				$scope.templates = response.data;
				console.log(response.data);
			});
		};
		
		var websitesTemplate = function(){
			$scope.status = {status : 1};
			angular.extend($scope.status, $scope.user_id);
			dataService.get("/getmultiple/template/"+$scope.webTempCurrentPage+"/"+$scope.pageItems,$scope.status)
			.then(function(response) {  //function for templatelist response
				$scope.totalRecords = response.totalRecords;
				$scope.templates = response.data;
			//	console.log(response.data);
			});
		};
		
		var propertyTemplate = function(){
			$scope.status = {status : 1};
			angular.extend($scope.status, $scope.user_id);
			dataService.get("/getmultiple/template/"+$scope.propTemplate+"/"+$scope.pageItems,$scope.status)
			.then(function(response) {  //function for templatelist response
				$scope.totalRecords = response.totalRecords;
				$scope.templates = response.data;
				console.log(response.data);
			});	
		};
		
		var customTemplates = function(){
			$scope.status = {status : 1};
			angular.extend($scope.status, $scope.user_id);
			dataService.get("/getmultiple/template/"+$scope.customTempCurrentPage+"/"+$scope.pageItems,$scope.status)
			.then(function(response) {  //function for templatelist response
				$scope.totalRecords = response.totalRecords;
				$scope.templates = response.data;
				console.log(response.data);
			});
		};
		
		var listTemplates = function(){
			$scope.status = {status : 1};
			angular.extend($scope.status, $scope.user_id);
			dataService.get("/getmultiple/template/"+$scope.listTempCurrentPage+"/"+$scope.pageItems,$scope.status)
			.then(function(response) {  //function for templatelist response
				$scope.totalRecords = response.totalRecords;
				$scope.templates = response.data;
				console.log(response.data);
			});
		};
		
		var myTemplates = function(){
			$scope.status = {status : 1};
			angular.extend($scope.status, $scope.user_id);
			dataService.get("/getmultiple/template/"+$scope.myTemplate+"/"+$scope.pageItems,$scope.status)
			.then(function(response) {  //function for templatelist response
				$scope.totalRecords = response.totalRecords;
				$scope.templates = response.data;
				console.log(response.data);
			});
		};
		
		var requestCustomTemplates = function(){
			$scope.status = {status : 1};
			angular.extend($scope.status, $scope.user_id);
			$scope.reset = function() {
				$scope.template = {};
			};
			//post method for insert data in request data form{Pooja}
			$scope.postData = function(template) { 
				dataService.post("/post/template",$scope.template)
				.then(function(response) {  //function for response of request temp
					$scope.template = response.data;
					console.log(response);
					$scope.reset();
				});
			}
		}
		 //this request for single templates data
			if($routeParams.id) {
				
				$http.get("/getsingle/templates/"+$routeParams.pageNo,$routeParams.id)
				.success(function(response) {$scope.templates = response;
					console.log($scope.templates);
				});
				
			}else{
		//this request for all templates data
				$http.get("/getmultiple/templates/"+$routeParams.pageNo,$routeParams.id)
					.success(function(response) 
					{$scope.templates = response;
						console.log($scope.templates);
					});
				
				
			}//end templatelist code
			 
		switch($scope.tempPart) {
			case 'listTemplates':
				listTemplates();
				break;
			case 'myTemplates':
				myTemplates();
				break;
			case 'websitesTemplate':
				websitesTemplate();
				break;	
			case 'propertyTemplate':
				propertyTemplate();
				break;
			case 'projectTemplate':
				projectTemplate();
				break;
			case 'customTemplates':
				customTemplates();
				break;			
			case 'requestCustomTemplates':
				requestCustomTemplates();
				break;	
			default:
				websitesTemplate();
		};
		
					/* 
			//update template 
			if($routeParams.id){
				$http.get("../server-api/index.php/put/template/"+$routeParams.id)
				.success(function(response) {
					$scope.templates = response;
					$scope.reset = function() {
						$scope.templates = angular.copy($scope.templates);
					};
					$scope.reset();
					console.log($scope.templates);
					
				}).error(function(err){
					console.log(err);
				});
				
				$scope.update = function(){
					$http.put("../server-api/index.php/put/template/"+$routeParams.id,$scope.templates)
					.success(function(response) {
						alert(response);
					});
				};
			}	*/

			
		//Upload Function for uploading files {Pooja}
		$scope.template={}; // this is form object
		$scope.userinfo = {userId:1, name:"Pooja"}; // this is for uploading credentials
		$scope.path = "template/"; // path to store images on server
		$scope.template.template_image = []; // uploaded images will store in this array
		$scope.upload = function(files,path,userinfo){ // this function for uploading files
			upload.upload(files,path,userinfo,function(data){
				if(data.status !== 'error'){
					$scope.template.template_image.push(JSON.stringify(data.details));
					console.log(data.message);
				}else{
					alert(data.message);
				}
				
			});
		};
		
		$scope.generateThumb = function(files){  // this function will generate thumbnails of images
			upload.generateThumbs(files);
		};
		// End upload function {pooja}
		
	};
       
	// Inject controller's dependencies
	templatesController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('templatesController',templatesController);	
});
