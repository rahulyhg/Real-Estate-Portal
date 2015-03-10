'use strict';

define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams', '$location','$rootScope','dataService','upload'];

    // This is controller for this view
	var responseController = function ($scope, $injector,$routeParams, $location,$rootScope,dataService,upload) {		
		$rootScope.metaTitle = "Real Estate Response";
		
		//all $scope objects
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.mailListCurrentPage = 1;
		$scope.sentListCurrentPage =1;
		$scope.delListCurrentPage=1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		$scope.user_id = {user_id : 1}; 
		$scope.mailPart=$routeParams.mailPart;
		$scope.alerts = [];
		//to display default mails page
		if(!$routeParams.mailPart){
			$location.path('/dashboard/response/mails');
		}
		 $scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	 };
  

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
		//$scope all methods
		$scope.pageChanged = function(page, where) { //Code For Pagination
			angular.extend(where, $scope.user_id);
			dataService.get("getmultiple/enquiry/"+page+"/"+$scope.pageItems, where).then(function(response){
				$scope.mailList = response.data;
					console.log(response);
			});
		}//end paggination
		
		// code for uploading file
		$scope.compose={}; 
		$scope.userinfo = {userId:1, name:"vilas"};
		$scope.path = "enquiry/"; 
		$scope.compose.attachment = []; // uploaded images will store in this array
		$scope.upload = function(files,path,userinfo){ // this function for uploading files
			upload.upload(files,path,userinfo,function(data){
				if(data.status !== 'error'){
					$scope.compose.attachment.push(JSON.stringify(data.details));
					console.log(data.message);
				}else{
					alert(data.message);
				}
				
			});
		};
		
		$scope.reset = function() {
				$scope.compose = {};
		};
		$scope.generateThumb = function(files){  // this function will generate thumbnails of images
			upload.generateThumbs(files);
		};// end file upload function
		
		// code for read & unread emails
		
		$scope.changestatus = function(id, read_status, index){
				if(read_status==0){
					$scope.status = {read_status : 1};
					
					
					dataService.put("put/enquiry/"+id, $scope.status)
					.then(function(response) { 
						console.log(response.message);
						$scope.mailList[index].read_status = 1
						//$scope.readStatus = 1;
						
					});
				}
			};
		
		
		// switch functions
		
		//show all inbox maillist
		var inbox = function(){
			$scope.status = {status : 1};
			angular.extend($scope.status, $scope.user_id);
			
			dataService.get("getmultiple/enquiry/"+$scope.mailListCurrentPage+"/"+$scope.pageItems, $scope.status)
			.then(function(response) {  
				$scope.mailList = response.data;
				$scope.totalRecords = response.totalRecords;
				$scope.status=response.status;
				$scope.message=response.message;
				$scope.error=response.error;
				if($scope.status=="warning"){
					$scope.alerts.push({type: 'warning', msg: "Error to load data"});
					$scope.closeAlert = function(index) {
						$scope.alerts.splice(index, 1);
					};
				}
			});
		}
		//view sentmail list
		var sentmail= function(){
			
			$scope.status = {status : 2};
			angular.extend($scope.status, $scope.user_id);
			dataService.get("/getmultiple/enquiry/"+$scope.sentListCurrentPage+"/"+$scope.pageItems ,$scope.status)
			.then(function(response) {  
				$scope.totalRecords = response.totalRecords;
				$scope.sentMail = response.data;
				$scope.status=response.status;
				$scope.message=response.message;
				$scope.error=response.error;
				if($scope.status=="warning"){
					$scope.alerts.push({type: 'warning', msg: "Error to load data"});
					$scope.closeAlert = function(index) {
						$scope.alerts.splice(index, 1);
					};
				}
			});
			
		}
		
		//view deleted maillist
		var deletemail= function(){
			$scope.status = {status : 0};
			angular.extend($scope.status, $scope.user_id);
			dataService.get("/getmultiple/enquiry/"+$scope.delListCurrentPage+"/"+$scope.pageItems ,$scope.status)
			.then(function(response) {  
				$scope.totalRecords = response.totalRecords;
				$scope.delList = response.data;
				if($scope.status=="warning"){
					
					$scope.alerts.push({type: 'error', msg: "Error to load data" 
					});
					$scope.closeAlert = function(index) {
						$scope.alerts.splice(index, 1);
					};
				}
			});
		}
		
		//send email
		var composemailview= function(){
			$scope.composemail = function(compose){
				console.log($scope.compose);
				dataService.post("post/enquiry", $scope.compose)
				.then(function(response) {
					console.log(response);
					
					$scope.status=response.status;
					$scope.message=response.message;
					$scope.error=response.error;
					if($scope.status=="success"){
						$scope.alerts.push({type: 'success', msg: "Record Added"});
					}else{
						$scope.alerts.push({type: 'warning', msg: "Error to load data"});
						$scope.closeAlert = function(index) {
							$scope.alerts.splice(index, 1);
						};
					}
					$scope.reset();
				});
				
			};
		}
		
		//view single mail 
		var mailview= function(){
			
			if($routeParams.id){
				dataService.get("getsingle/enquiry/"+$routeParams.id)
				.then(function(response) {
					$scope.singlemail = response.data[0];
					$scope.replyMail = {};
					$scope.replyMail.reply_message ={};
					$scope.replyMail.to_email = $scope.singlemail.from_email;
					$scope.replyMail.from_email = $scope.singlemail.to_email;
					$scope.replyMail.reply_message.subject = "RE: "+$scope.singlemail.subject;
					$scope.replyMsg = ($scope.singlemail.reply_message!="")? JSON.parse($scope.singlemail.reply_message) : {message:""};
					$scope.replyMail.reply_message.message = $scope.replyMsg.message;
					
					$scope.update = function(id,replyMail){
						dataService.put("put/enquiry/"+id,replyMail)
						.then(function(response) {
							console.log(response);
						});
					};

					
					console.log($scope.replyMail);
					
				},function(error) {
					console.log(error);
				});
				
			}	
		}
		//switch case
		switch($scope.mailPart) {
			
			case 'mails':
				inbox();
				break;
			case 'sentmail':
				sentmail();
				break;
			case 'composemailview':
				composemailview();
				break;
			case 'deletemail':
				deletemail();
				break;
			case 'mailview':
				//console.log($routeParams.id);
				mailview();
				break;				
			default:
			console.log($scope.mailPart+"/"+$routeParams.id);
				inbox();
		};
	};    
	// Inject controller's dependencies
	responseController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('responseController', responseController);
	
	
});

	
		
		
