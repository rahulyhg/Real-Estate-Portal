'use strict';

define(['app', 'css!modules/forgot/forgot'], function (app) 
   {
        var injectParams = ['$scope', '$injector','$http'];

    // This is controller for this view
	    var homeController = function ($scope, $injector, $http) 
		   {
		        //console.log("this is forgot ctrl " + data.value);
           };
	//Add email
		$scope.insert = function()
			{
			    console.log($scope.forget);
			    $http.post("server-api/index.php/forgot/", $scope.forget)
				.success(function(response) 
				   {
				     alert(response);		
		           })
		    }    
	// Inject controller's dependencies
	    forgotController.$inject = injectParams;
	// Register/apply controller dynamically
        app.register.controller('forgotController', forgotController);
	
	
});


