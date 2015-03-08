

'use strict';

define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams', '$location','$rootScope','dataService'];

    // This is controller for this view
	var responseController = function ($scope, $injector,$routeParams, $location,$rootScope,dataService) {		
		$rootScope.metaTitle = "Real Estate Response";
		
		//all $scope objects
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.mailListCurrentPage = 1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		$scope.user_id = {user_id : 1,status : 3}; 
		
		$scope.mailPart=$routeParams.mailPart;
		
		//to display default mails page
		if(!$routeParams.mailPart){
			$location.path('/dashboard/response/mails');
		}
		
		//$scope all methods
		$scope.pageChanged = function(page) { //Code For Pagination
			dataService.get("/getmultiple/enquiry/"+page+"/"+$scope.pageItems,$scope.user_id).then(function(response){
					$scope.mailList = response.data;
					console.log(response);
			});
		}
		// code for uploading file
		
		$scope.compose={}; // this is form object
		$scope.userinfo = {userId:1}; // this is for uploading credentials
		$scope.path = "compose/"; // path to store images on server
		$scope.compose.attachfile = []; // uploaded images will store in this array
		$scope.upload = function(files,path,userinfo){ // this function for uploading files
			upload.upload(files,path,userinfo,function(data){
				if(data.status !== 'error'){
					$scope.compose.attachfile.push(JSON.stringify(data.details));
					console.log(data.message);
				}else{
					alert(data.message);
				}
				
			});
		};
		
		$scope.generateThumb = function(files){  // this function will generate thumbnails of images
			upload.generateThumbs(files);
		};
		
		// switch functions
		var composemailview= function(){
			$scope.reset = function() {
				$scope.compose = {};
			};
			$scope.composeMail = function(){
				console.log($scope.compose);
				dataService.post("post/enquiry", $scope.compose)
				.then(function(response) {
					alert(response);
					$scope.reset();
				});
			};
		}
		//show all maillist
		var mails= function(){
			dataService.get("/getmultiple/enquiry/"+$scope.mailListCurrentPage+"/"+$scope.pageItems ,$scope.user_id)
			.then(function(response) {  
				$scope.totalRecords = response.totalRecords;
				$scope.mailList = response.data;
				console.log(response);
			});
		}
		// show single mailview
		var mailview= function(){
			if($routeParams.id){
				dataService.get("/getsingle/enquiry/"+$scope.mailListCurrentPage+"/"+$routeParams.id)
				.then(function(response) {  
					$scope.mailView = response.data;
					console.log(response);
				});
			}
		}
		var sentmail= function(){
			dataService.get("/getmultiple/enquiry/"+$scope.mailListCurrentPage+"/"+$scope.pageItems ,$scope.user_id)
			.then(function(response) {  
				$scope.totalRecords = response.totalRecords;
				$scope.sentMail = response.data;
				console.log(response.data);
			});
		}
		
		//switch case
		switch($scope.mailPart) {
			case 'mailview':
				mailview();
				break;
			case 'mails':
				mails();
				break;
			case 'inbox':
				inbox();
				break;
			case 'sentmail':
				sentmail();
				break;
			case 'composemailview':
				composemailview();
				break;	
			default:
				mails();
		};
	};    
	// Inject controller's dependencies
	responseController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('responseController', responseController);
	
	
});


