'use strict';

define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams', '$location','$rootScope','dataService','upload','$route'];

    // This is controller for this view
	var responseController = function ($scope, $injector,$routeParams, $location,$rootScope,dataService,upload,$route) {		
		$rootScope.metaTitle = "Real Estate Response";
		
		//all $scope objects
		$scope.maxSize = 5;
		$scope.totalRecords = "";
		$scope.mailListCurrentPage = 1;
		$scope.sentListCurrentPage =1;
		$scope.delListCurrentPage=1;
		$scope.pageItems = 10;
		$scope.numPages = "";		
		$scope.user_id = {$rootScope.userDetails.id}; 
		$scope.mailPart=$routeParams.mailPart;
		$scope.alerts = [];
		$scope.tinymceConfig = {};
		$scope.currentDate = dataService.currentDate;
		console.log($scope.currentDate);
		$scope.hideDeleted = "";
		
		//to display default mails page
		if(!$routeParams.mailPart){
			$location.path('/dashboard/response/mails');
		}
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		
		// code for refresh page
		$scope.refreshpage=function(){
			$route.reload();
		};
		
		//code for reset 
		$scope.reset = function() {
			$scope.compose = {};
		};
		
		// this function will generate thumbnails of images
		$scope.generateThumb = function(files){  
			upload.generateThumbs(files);
		};
		
		//{$scope all methods}
		//Code For Pagination
		$scope.pageChanged = function(page, where) { 
			angular.extend(where, $scope.user_id);
			dataService.get("getmultiple/enquiry/"+page+"/"+$scope.pageItems, where).then(function(response){
				$scope.mailList = response.data;
			});
		}
		
		// code for read & unread emails
		$scope.changestatus = function(id, read_status, index){
			if(read_status==0){
				$scope.statusParam = {read_status : 1};
				dataService.put("put/enquiry/"+id, $scope.statusParam)
				.then(function(response) { 
					$scope.mailList[index].read_status = 1
				});
			}
		};
		
		//code for delete single mail
		$scope.deletestatus = function(id, status, index){
			if(status==1){
				$scope.statusParam = {status : 0};
				dataService.put("put/enquiry/"+id, $scope.statusParam)
				.then(function(response) { 
					$scope.mailList[index].status = 0
					$scope.hideDeleted = 1;
				});
			}
		};
		
		//code for search filter
		$scope.searchFilter = function(statusCol, colValue) {
			$scope.searchObj = {search: true, subject : colValue};
			angular.extend($scope.searchObj, $scope.statusParam);
			if(colValue.length >= 4){
				dataService.get("/getmultiple/enquiry/1/"+$scope.pageItems, $scope.searchObj)
				.then(function(response) {  
					if(response.status=="warning" || response.status=='error' ){
						$scope.mailList = response.data;
						$scope.totalRecords = response.totalRecords;
					}else{
						$scope.mailList = response.data;
						$scope.totalRecords = response.totalRecords;
					}
				});
			}
		};
		
		// {switch functions}
		//code for  inbox maillist
		var inbox = function(){
			$scope.statusParam = {status : 1};
			angular.extend($scope.statusParam, $scope.user_id);
			dataService.get("getmultiple/enquiry/"+$scope.mailListCurrentPage+"/"+$scope.pageItems, $scope.statusParam)
			.then(function(response) {  
				if(response.status=="warning" || response.status=='error' ){
					$scope.alerts.push({type: response.status, msg: response.message});
				}else{
					$scope.mailList = response.data;
					$scope.totalRecords = response.totalRecords;
				}
			});
		}
		
		//code for view sentmail list
		var sentmail= function(){
			$scope.statusParam = {status : 2};
			angular.extend($scope.statusParam, $scope.user_id);
			dataService.get("/getmultiple/enquiry/"+$scope.sentListCurrentPage+"/"+$scope.pageItems ,$scope.statusParam)
			.then(function(response) {  
				if(response.status=="warning" || response.status=='error' ){
					$scope.alerts.push({type: response.status, msg: response.message});
				}else{
					$scope.mailList = response.data;
						console.log(response.data);
					
					//$scope.mailList.from_email = JSON.parse($scope.mailList.from_email);
				//	$scope.mailList = response.data;
					$scope.totalRecords = response.totalRecords;
				}
			});
		}
		
		//code for view deleted maillist
		var deletemail= function(){
			$scope.statusParam = {status : 0};
			angular.extend($scope.statusParam, $scope.user_id);
			dataService.get("/getmultiple/enquiry/"+$scope.delListCurrentPage+"/"+$scope.pageItems ,$scope.statusParam)
			.then(function(response) {  
				if(response.status=="warning" || response.status=='error' ){
					$scope.alerts.push({type: response.status, msg: response.message});
				}else{
					$scope.mailList = response.data;
					$scope.totalRecords = response.totalRecords;
				}
			});
		}
		
		//code for send email
		var composemailview= function(){
			// code for uploading file
			$scope.compose = {user_id: 1, from_email :{ to :"vilas@wtouch.in", Cc: " " }
			, first_name : "Vilas", last_name : "Shetkar" };
			$scope.compose.date = $scope.currentDate;
			$scope.userinfo = {userId:1, name:"vilas"};
			$scope.path = "enquiry/"; 
			$scope.compose.attachment = []; // uploaded images will store in this array
			// this function for uploading files
			$scope.upload = function(files,path,userinfo){ 
				upload.upload(files,path,userinfo,function(data){
					if(data.status !== 'error'){
						$scope.compose.attachment.push(JSON.stringify(data.details));
					}else{
						alert(data.message);
					}
				});
			};
			
			// code for compose mail to insert data
			$scope.composemail = function(compose){
				dataService.post("post/enquiry", $scope.compose)
				.then(function(response) {
					if(response.status=="success"){
						$scope.alerts.push({type: response.status, msg: response.message});
					}else{
						$scope.alerts.push({type: response.status, msg: response.message});
					}
					$scope.reset();
				});
			};
		}
		
		//code for view single mail 
		var mailview= function(){
			$scope.mailSingleId = ($routeParams.id) ? $routeParams.id : "";
			$scope.prev=function(){
				$scope.mailSingleId = $scope.mailSingleId - 1;
				$location.path('/dashboard/response/mailview/'+$scope.mailSingleId);
			}
			$scope.next=function(){
				$scope.mailSingleId = parseInt($scope.mailSingleId) + 1;
				$location.path('/dashboard/response/mailview/'+$scope.mailSingleId);
			}
			if($scope.mailSingleId != ""){
				dataService.get("getsingle/enquiry/"+$scope.mailSingleId)
				.then(function(response) {
					$scope.singlemail = response.data;
					$scope.singlemail.to_email = JSON.parse($scope.singlemail.to_email);
					$scope.singlemail.from_email = JSON.parse($scope.singlemail.from_email);
					$scope.totalRecords = response.totalRecords;
					$scope.replyMail = {};
					$scope.replyMail.reply_message ={};
					$scope.replyMail.to_email = $scope.singlemail.from_email;
					$scope.replyMail.from_email = $scope.singlemail.to_email;
					$scope.replyMail.reply_message.subject = "RE: "+$scope.singlemail.subject;
					$scope.replyMsg = ($scope.singlemail.reply_message!="") ? JSON.parse($scope.singlemail.reply_message) : {message:""};
					$scope.replyMail.reply_message.message = $scope.replyMsg.message;
					if($scope.singlemail.reply_status == 1){
						$scope.tinymceConfig = {
							readonly: true,
						}
					}
					$scope.update = function(id,replyMail){
						dataService.put("put/enquiry/"+id,replyMail)
						.then(function(response) {
							console.log(response);
						});
					};
				},function(error) {
					console.log(error);
				});
			}	
		}
		
		//switch case to call pagewise functions
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
				mailview();
				break;				
			default:
				inbox();
		};
	};    
	// Inject controller's dependencies
	responseController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('responseController', responseController);
});

	
		
		
