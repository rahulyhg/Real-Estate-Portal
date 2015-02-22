'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','$location'];
    // This is controller for this view
	var websitesController = function ($scope, $injector,$routeParams,$location) {
		console.log("this is websites controller");
		$scope.webPart=$routeParams.webPart;
		console.log($scope.webPart);
		if(!$routeParams.webPart){
			$location.path('/dashboard/websites/mywebsites');
		}
		templateUrl:'http://localhost/sunita/Real-Estate-Portal/app/modules/websites/websites.html';
    };    
	// Inject controller's dependencies
	websitesController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('websitesController', websitesController);	
});
