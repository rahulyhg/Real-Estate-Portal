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
 		
		/*For display by default websitesTemplate.html page*/
		console.log($scope.tempPart);		
		if(!$routeParams.tempPart) {
			$location.path('/dashboard/templates/websitesTemplate');
		}	
		
		// All $scope methods
		$scope.pageChanged = function(page) {
			//$log.log('Page changed to: ' + $scope.propTemplate);
			dataService.get("/getmultiple/template/"+page+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
		}; //end pagination	
		
		// switch functions 
		var projectTemplate = function(){
			dataService.get("/getmultiple/template/"+$scope.projTempCurrentPage+"/"+$scope.pageItems)
			.then(function(response) {  //function for templatelist response
				$scope.totalRecords = response.totalRecords;
				$scope.templates = response.data;
				console.log(response.data);
			});
		};
		
		var websitesTemplate = function(){
			dataService.get("/getmultiple/template/"+$scope.webTempCurrentPage+"/"+$scope.pageItems)
			.then(function(response) {  //function for templatelist response
				$scope.totalRecords = response.totalRecords;
				$scope.templates = response.data;
				console.log(response.data);
			});
		};
		
		var propertyTemplate = function(){
			dataService.get("/getmultiple/template/"+$scope.propTemplate+"/"+$scope.pageItems)
			.then(function(response) {  //function for templatelist response
				$scope.totalRecords = response.totalRecords;
				$scope.templates = response.data;
				console.log(response.data);
			});	
		};
		
		var customTemplates = function(){
			dataService.get("/getmultiple/template/"+$scope.customTempCurrentPage+"/"+$scope.pageItems)
			.then(function(response) {  //function for templatelist response
				$scope.totalRecords = response.totalRecords;
				$scope.templates = response.data;
				console.log(response.data);
			});
		};
		
		var listTemplates = function(){
			dataService.get("/getmultiple/template/"+$scope.listTempCurrentPage+"/"+$scope.pageItems)
			.then(function(response) {  //function for templatelist response
				$scope.totalRecords = response.totalRecords;
				$scope.templates = response.data;
				console.log(response.data);
			});
		};
		
		var myTemplates = function(){
			dataService.get("/getmultiple/template/"+$scope.myTemplate+"/"+$scope.pageItems)
			.then(function(response) {  //function for templatelist response
				$scope.totalRecords = response.totalRecords;
				$scope.templates = response.data;
				console.log(response.data);
			});
		};
		
		var requestCustomTemplates = function(){
			$scope.reset = function() {
				$scope.reqtemp = {};
			};
			//post method for insert data in request template form{Pooja}
			$scope.postData = function() { 
				dataService.post("/post/template",$scope.reqTemp)
				.then(function(response) {  //function for response of request temp
					$scope.reqTemp = response.reqTemp;
					console.log(response.reqTemp);
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

				
		
		
		//this request for single templates data
			if($routeParams.id) {
				
				$http.get("/getsingle/template/"+$routeParams.pageNo,$routeParams.id)
				.success(function(response) {$scope.templates = response;
					console.log($scope.templates);
				});
				
			}else{
			//this request for all templates data
				
					$http.get("/getmultiple/template/"+$routeParams.pageNo,$routeParams.id)
					.success(function(response) 
					{$scope.templates = response;
						console.log($scope.templates);
					});
				
				
			}//end templatelist code
			
			
			
			/* //add template
			
			$scope.reset = function() {
				$scope.templates = {};
			};
			$scope.addproject = function(){
				
				console.log($scope.templates);
				$http.post("../server-api/index.php/post/template/", $scope.templates)
				.success(function(response) {
					alert(response);
					$scope.reset();
					
				});
			}; 

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

			//Upload Function for uploading files {sunita}
				$scope.template={}; 
				$scope.userinfo = {userId:1}; 
				$scope.path = "template/"; // path to store images on server
				$scope.template.sketch = []; // uploaded images will store in this array
				$scope.upload = function(files,path,userinfo){ // this function for uploading files
					upload.upload(files,path,userinfo,function(data){
						if(data.status !== 'error'){
							$scope.template.sketch.push(JSON.stringify(data.details));
							console.log(data.message);
						}else{
							alert(data.message);
						}
						
					});
				};
	};
       
	// Inject controller's dependencies
	templatesController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('templatesController',templatesController);	
});
