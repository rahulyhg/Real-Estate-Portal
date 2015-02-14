'use strict';

define(['app', 'css!modules/home/home'], function (app) 
   {
        var injectParams = ['$scope', '$injector','$http'];

    // This is controller for this view
	    var forgotController = function ($scope, $injector, $http) 
		   {
		        //console.log("this is forgot ctrl " + data.value);
				//Add email
			$scope.forgotPass = function(forget)
			{
			    console.log($scope.forget);
			    $http.post("server-api/index.php/forgot", $scope.forget)
				.success(function(response) 
				   {
				     alert(response);		
		           })
		    }    
           }
	
	// Inject controller's dependencies
	    forgotController.$inject = injectParams;
	// Register/apply controller dynamically
        app.register.controller('forgotController', forgotController);	
});


