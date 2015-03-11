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
		$scope.user_id = {user_id : 2};
		$scope.tempPart = $routeParams.tempPart;
 		$scope.alerts = [];
		
		/* // for date  {Pooja}
			
			var d = new Date(year, month, day, hours, minutes, seconds);	
			var year=d.getFullYear();
			var month=d.getMonth();
			var day = d.getDay(); 
			var hours=d.getHours(); 
			var minutes = d.getMinutes(); 
			var seconds= d.getSeconds();
			
			if (month<11){
				month="0" + month;
			}
			var day=d.getDate();
			$scope.date=year + "-" + month + "-" + day;
		//End  Date */ 
		
         //for alert {Pooja}
		 
		if($scope.status=="warning"){     
			 $scope.alerts.push({type: 'error', msg: "Error to load data" 
			 });
			 $scope.closeAlert = function(index) {
				$scope.alerts.splice(index, 1);
			 };
		}	 
	
		/*For display by default websitesTemplate.html page*/
		//console.log($scope.tempPart);		
		if(!$routeParams.tempPart) {
			$location.path('/dashboard/templates/websitesTemplate');
		}	
		
		$scope.pageChanged = function(page) {			
			angular.extend($scope.custom, $scope.user_id);		
			dataService.get("/getmultiple/templates/"+page+"/"+$scope.pageItems,$scope.custom)
			.then(function(response) {
				$scope.templates = response.template;
				
			});
		}; //end pagination
		
		$scope.changeValue = function(statusCol,status) {
			console.log($scope.custom);
			$scope.filterStatus= {};
			(status =="") ? delete $scope.custom[statusCol] : $scope.filterStatus[statusCol] = status;
			angular.extend($scope.custom, $scope.filterStatus);
			angular.extend($scope.custom, $scope.search);			
			
			dataService.get("/getmultiple/template/1/"+$scope.pageItems, $scope.custom)
			.then(function(response) {  //function for templatelist response
				if(response.status == 'success'){
					$scope.templates = response.data;
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.templates = {};
					$scope.totalRecords = {};
					$scope.alerts.push({type: response.status, msg: response.message});
				}
				
			});
		};

		$scope.searchFilter = function(statusCol, searchTemp) {
			$scope.search = {search: true};
			$scope.filterStatus= {};
			(searchTemp =="") ? delete $scope.custom[statusCol] : $scope.filterStatus[statusCol] = searchTemp;
			angular.extend($scope.custom, $scope.filterStatus);
			angular.extend($scope.custom, $scope.search);			
			
			dataService.get("/getmultiple/template/1/"+$scope.pageItems, $scope.custom)
			.then(function(response) {  //function for templatelist response
				if(response.status == 'success'){
					$scope.templates = response.data;
					$scope.totalRecords = response.totalRecords;
				}else{
					$scope.templates = {};
					$scope.totalRecords = {};
					$scope.alerts.push({type: response.status, msg: response.message});
				}
				//console.log($scope.properties);
			});
		};
		
		//function for close alert
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		// switch functions 
		var projectTemplate = function(){
				$scope.custom = {status : 1};			
				angular.extend($scope.custom,$scope.user_id);
				dataService.get("/getmultiple/template/"+$scope.projTempCurrentPage+"/"+$scope.pageItems, $scope.custom)
				.then(function(response) {  //function for templatelist response
					$scope.totalRecords = response.totalRecords;
					$scope.templates = response.data;
					console.log(response.data);
				});
		};
		
		var websitesTemplate = function(){
			$scope.custom = {status : 1,template_type : "public"};			
			angular.extend($scope.custom);
			dataService.get("/getmultiple/template/"+$scope.webTempCurrentPage+"/"+$scope.pageItems,$scope.custom)
			.then(function(response) { //function for templatelist response
				 if(response.status == 'success'){
					$scope.totalRecords = response.totalRecords;
					$scope.templates = response.data;
				//	console.log(response.data);
				 }else{
						$scope.alerts.push({type: response.status, msg: response.message});
					}
			});
		};
		
		var propertyTemplate = function(){
			$scope.custom = {status : 1,template_type : "private"};			
			angular.extend($scope.custom,$scope.user_id);
			dataService.get("/getmultiple/template/"+$scope.propTemplate+"/"+$scope.pageItems,$scope.custom)
			.then(function(response) {  
				if(response.status == 'success'){
					$scope.totalRecords = response.totalRecords;
					$scope.templates = response.data;
				//	console.log(response.data);
				}	
				else{
					$scope.alerts.push({type: response.status, msg: response.message});
				}	
			});	
		};
		
		var customTemplates = function(){
			$scope.custom = {status : 1,custom : 1,template_type : "private"};
			angular.extend($scope.custom, $scope.user_id);			
			dataService.get("/getmultiple/template/"+$scope.customTempCurrentPage+"/"+$scope.pageItems,$scope.custom)
			.then(function(response) { 
				if(response.status == 'success'){
					$scope.totalRecords = response.totalRecords;
					$scope.templates = response.data;
					console.log(response.data);
				}
				else{
					$scope.alerts.push({type: response.status, msg: response.message});
				}	
			});
		};
		
		var listTemplates = function(){
			$scope.custom = {status : 1,template_type : "private"};			
			angular.extend($scope.custom,$scope.user_id);
			dataService.get("/getmultiple/template/"+$scope.listTempCurrentPage+"/"+$scope.pageItems,$scope.custom)
			.then(function(response) {  
				if(response.status == 'success'){
					$scope.totalRecords = response.totalRecords;
					$scope.templates = response.data;
					console.log(response.data);
				}
				else{
					$scope.alerts.push({type: response.status, msg: response.message});
				}	
			});
		};
		
		var myTemplates = function(){
			$scope.custom = {status : 1};			
			angular.extend($scope.custom,$scope.user_id);
			dataService.get("/getmultiple/template/"+$scope.myTemplate+"/"+$scope.pageItems,$scope.custom)
			.then(function(response) {  //function for templatelist response
				if(response.status == 'success'){
					$scope.totalRecords = response.totalRecords;
					$scope.templates = response.data;
					console.log(response.data);
				}else{
					$scope.alerts.push({type: response.status, msg: response.message});
				}
			});
		};
		
		var requestCustomTemplates = function(){
			$scope.custom = {status : 1};			
			angular.extend($scope.custom,$scope.user_id);
			$scope.reset = function() {
				$scope.template = {};
			};
			//post method for insert data in request data form{Pooja}
			$scope.postData = function(template) { 
				dataService.post("/post/template",$scope.template)
				.then(function(response) {  //function for response of request temp
					if(response.status == 'success'){
						$scope.template = response.data;
						console.log(response);
						$scope.reset();
					}else{
						$scope.alerts.push({type: response.status, msg: response.message});
					}	
				});
			}
		}
		 
			 
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
