'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$location','$routeParams'];
    // This is controller for this view
	var templateController = function ($scope, $injector,$location,$routeParams) {
		console.log("this is template controller");
		
		$scope.tempPart = $routeParams.tempPart; 		
		console.log($scope.tempPart);
		/*For display by default projectTemplate.html page*/
		if(!$routeParams.tempPart) {
		$location.path('/dashboard/templates/projectTemplate');
		}	
		templateUrl:'http://localhost/pooja/Real-Estate-Portal/app/modules/templates/templates.html';
    };
    };    
	// Inject controller's dependencies
	templateController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('templateController',templateController);	
});
