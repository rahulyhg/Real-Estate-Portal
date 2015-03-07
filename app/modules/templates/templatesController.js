'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$location','$routeParams','$rootScope','$http','upload'];
    // This is controller for this view
	var templatesController = function ($scope, $injector,$location,$routeParams,$rootScope,$http,upload) {
		$rootScope.metaTitle = "Real Estate Template";
		
		//Code For Pagination{pooja}
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.currentPage=1;		
		$scope.projTempCurrentPage = 1;
		$scope.customTempCurrentPage=1;
		$scope.myTemplate=1;
		$scope.listTempCurrentPage=1;
		$scope.webTempCurrentPage=1;
		$scope.pageItems = 10;
		$scope.numPages = "";		

		$scope.pageChanged = function() {
			//$log.log('Page changed to: ' + $scope.currentPage);
			$http.get("../server-api/index.php/template/"+$scope.currentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
			$http.get("../server-api/index.php/template/"+$scope.projTempCurrentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
			$http.get("../server-api/index.php/template/"+$scope.customTempCurrentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
			$http.get("../server-api/index.php/template/"+$scope.myTemplate+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
			$http.get("../server-api/index.php/template/"+$scope.webTempCurrentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
			$http.get("../server-api/index.php/template/"+$scope.listTempCurrentPage+"/"+$scope.pageItems)
			.success(function(response) {
				$scope.templates = response.template;
				
			});
		};		
		
		// to View Templatelist
		
		//this request for single templates data
			if($routeParams.id) {
				
				$http.get("../server-api/index.php/getsingle/template/"+$routeParams.pageNo,$routeParams.id)
				.success(function(response) {$scope.templates = response;
					console.log($scope.templates);
				});
				
			}else{
			//this request for all templates data
				
					$http.get("../server-api/index.php/getmultiple/template/"+$routeParams.pageNo,$routeParams.id)
					.success(function(response) 
					{$scope.templates = response;
						console.log($scope.templates);
					});
				
				
			}//end templatelist code
			
			//add template
			
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
			}	

			
				
				$scope.tempPart = $routeParams.tempPart; 		
				console.log($scope.tempPart);
				/*For display by default projectTemplate.html page*/
				if(!$routeParams.tempPart) {
				$location.path('/dashboard/templates/projectTemplate');
				}	
				
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
