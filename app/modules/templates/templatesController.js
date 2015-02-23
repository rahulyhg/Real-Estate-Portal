'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$location','$routeParams','$rootScope'];
    // This is controller for this view
	var templatesController = function ($scope, $injector,$location,$routeParams,$rootScope) {
		$rootScope.metaTitle = "Real Estate Template";
		
		$scope.tempPart = $routeParams.tempPart; 		
		console.log($scope.tempPart);
		/*For display by default projectTemplate.html page*/
		if(!$routeParams.tempPart) {
		$location.path('/dashboard/templates/projectTemplate');
		}	
		templateUrl:'http://localhost/pooja/Real-Estate-Portal/app/modules/templates/templates.html';
    };
       
	// Inject controller's dependencies
	templatesController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('templatesController',templatesController);	
});
