'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$location','$routeParams','$rootScope','upload','dataService','$http','modalService'];
    // This is controller for this view
	var templatesController = function ($scope, $injector,$location,$routeParams,$rootScope,upload,dataService,$http,modalService) {
		$rootScope.metaTitle = "Real Estate Template";		
	
		// all $scope object goes here{pooja}
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.propTemplate=1;		
		$scope.projTempCurrentPage = 1;
		$scope.customTempCurrentPage=1;
		$scope.myTemplate=1;		
		$scope.webTempCurrentPage=1;
		$scope.pageItems = 10;
		$scope.numPages = "";
		$scope.user_id = {user_id : 2};/* $rootScope.userDetails.id */
		$scope.tempPart = $routeParams.tempPart;
 		$scope.alerts = [];
		$scope.currentDate = dataService.currentDate;
		console.log($scope.currentDate);
		
		
		//single view modal fun
		$scope.open = function (url, tempId) {
			dataService.get("getsingle/template/"+tempId)
			.then(function(response) {
				var modalDefaults = {
					templateUrl: url,	// apply template to modal
					size : 'lg'
				};
				var modalOptions = {
					tempList: response.data[0]  // assign data to modal
				};
				console.log(response.data[0]);
				modalService.showModal(modalDefaults, modalOptions).then(function (result) {
					console.log("modalOpened");
				});
			});
			
		};
		$scope.ok = function () {
			$modalOptions.close('ok');
		};

	//show user website list data 
		$scope.showWebDt = function (url, tempId) {
			$scope.status = {status:1};
			angular.extend($scope.status, $scope.userDetails);
			dataService.get("getmultiple/website/1/50",$scope.status)
			.then(function(response) {
				var oldObj = response.data;
				var modalDefaults = {
					templateUrl: url,	// apply template to modal
					size : 'lg'
				};
				var modalOptions = {
					webList: oldObj,  // assign data to modal
					tempId : {templates : {template_id : [tempId]}},
					updateConfig : function(formData){
						modalOptions.formData = formData;
					},					
				};				
				modalService.showModal(modalDefaults, modalOptions).then(function (result) {
					var formData = modalOptions.formData;
					var userConfig = dataService.parse($rootScope.userDetails).config;
					var webConfig = dataService.parse(modalOptions.websiteList[formData.website_id].config);
					var userTemplateConfig = (userConfig.templates.template_id) ? userConfig.templates.template_id.push(tempId) : angular.extend(userConfig,formData.config);
					
					console.log(userTemplateConfig);
					console.log(userConfig);
					//angular.extend(userConfig, formData.config);
					angular.extend(webConfig, formData.config);
					dataService.put('put/website/'+formData.website_id, {config : webConfig})
					.then(function(response){
						console.log(response.message);
					});
					dataService.put('put/user/'+$rootScope.userDetails.id, {config : userConfig})
					.then(function(response){
						console.log(response.message);
					});  
					
				});
			});
		};
		$scope.ok = function () {
			$modalOptions.close('ok');
		};	//	end of webList modal
	
		
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
	
		/*For display by default websitesTemplate.html page*/			
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
			//console.log($scope.custom);
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
		
		 $scope.changeStatus = {};
		$scope.changeStatusFn = function(colName, colValue, id){
			$scope.changeStatus[colName] = colValue;				
			//console.log($scope.changeStatus);
			
				 dataService.put("put/template/"+id,$scope.changeStatus)			
				.then(function(response) {					
					if(colName=='template_type'){					
					}
					$scope.alerts.push({type: response.status,msg: response.message});
				}); 
		}
		
		/* //code for delete single template
		$scope.changeStatus = function(id, template_type, index){
			if(template_type==1){
				$scope.custom = {template_type : 0};
				dataService.put("put/template/"+id, $scope.custom)
				.then(function(response) { 
					console.log(response.message);
					$scope.templates[index].template_type = 0				
				});
			}
		};	  */
		
		//search filter function
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
			$scope.custom = {custom : 1};
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
			$scope.template={};		
			angular.extend($scope.custom,$scope.user_id);
			$scope.template.date = $scope.currentDate;
			//console.log($scope.template.date);
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
			
			//Upload Function for uploading files {Pooja}		
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
		}			
			 
		switch($scope.tempPart) {			
			case 'myTemplates':
				myTemplates();
				break;
			case 'websitesTemplate':
				websitesTemplate();
				break;				
			case 'customTemplates':
				customTemplates();
				break;			
			case 'requestCustomTemplates':
				requestCustomTemplates();
				break;	
			/* case 'websiteList':
				websitelist();
				break;	 */
			default:
				websitesTemplate();
		};		
	};
       
	// Inject controller's dependencies
	templatesController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('templatesController',templatesController);	
});
