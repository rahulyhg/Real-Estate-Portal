'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector'];
    // This is controller for this view
	var websitesController = function ($scope, $injector) {
		console.log("this is websites controller");
    };    
	// Inject controller's dependencies
	mywebsitesController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('websitesController', websitesController);	
});
