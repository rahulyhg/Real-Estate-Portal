'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','$http','$rootScope','upload', '$timeout', 'dataService'];
    // This is controller for this view
	var addpropertyController = function ($scope, $injector,$routeParams,$http,$rootScope, upload, $timeout,dataService) {
		$rootScope.metaTitle = "Add Real Estate Property";
		
		$scope.alerts = [];
		$scope.userinfo = {user_id : $rootScope.userDetails.id};
		$scope.currentDate = dataService.currentDate;
		
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
						$scope.alerts.push({type: data.status, msg: data.message});
					}
					
				}); 
			};
			$scope.generateThumb = function(files){  
				upload.generateThumbs(files);
			};// end file upload code
		
		/**********************************************************************/
		//display records from config.js to combo
		
		$scope.propertyConfig = dataService.config.property;					
		console.log($scope.propertyConfig);
		/*********************************************************************/
		
	//dynamic dropdwnlist of country,state & city
	
		$scope.contries = dataService.config.country;
		
		 $scope.getState = function(country){
			var states = [];
			for (var x in $scope.contries){
				if($scope.contries[x].country_name == country){
					for(var y in $scope.contries[x].states){
						states.push($scope.contries[x].states[y])
					}
				}
			}
			$scope.states = states;
		};
		
		
		$scope.getCities = function(state){
			var cities = [];
			for (var x in $scope.states){
				if($scope.states[x].state_name == state){
					for(var y in $scope.states[x].cities){
						cities.push($scope.states[x].cities[y])
					}
				}
			}
			$scope.cities = cities;
		}; 
		
	/*********************************************************************/
	
	//display dynamic list from project table 
		dataService.get('getmultiple/project/1/50', $scope.userinfo)
			.then(function(response){
				console.log(response.data);								
				$scope.addProjName = response.data;				
			});

         
		dataService.get('getmultiple/property/1/50', $scope.userinfo)
			.then(function(response){
				console.log(response);								
				$scope.addPropStruct = response.data;				
		}); 
			
	/************************************************************************************/		
			
		// Add property
		$scope.addPropertya = function(property){
			alert("property");
			/* dataService.post("post/property", $scope.property,$scope.userinfo)
			.then(function(response) {
				if(response.status=="success"){
					$scope.alerts.push({type: response.status, msg: response.message});
				}else{
					$scope.alerts.push({type: response.status, msg: response.message});
				}
				/* $scope.addProperty.$setPristine(); 
			}); */
		};				
		
	/*********************************************************************/	
	//display websites-domain into checkbox
	
		dataService.get('getmultiple/website/1/200', {user_id:$rootScope.userDetails.id})
		.then(function(response){
			var websites = [];
			for(var id in response.data){
				var obj = {id: response.data[id].id, domain_name : response.data[id].domain_name};
				websites.push(obj);
			}
			$scope.websites = websites;
		}) 
		 $scope.websites = [
			{id:1, domain_name:"google.com"},
			{id:2, domain_name:"wtouch.in"},
		] 
		
		 $scope.$watchCollection('websites', function(newNames, oldNames) {
			if($scope.websites == newNames ) 
				console.log(newNames);
		}); 
		$scope.checkAll = function(websites, checkValue) {
			$scope.property={};
			if(checkValue){
				$scope.property.domain = angular.copy(websites);
			}
		}; 
	/*********************************************************************/	
		
	};		
	
	
	
	// Inject controller's dependencies
	addpropertyController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('addpropertyController', addpropertyController);
	
});
