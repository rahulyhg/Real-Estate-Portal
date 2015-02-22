'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector'];
    // This is controller for this view
	var templateController = function ($scope, $injector) {
		console.log("this is template controller");
    };    
	// Inject controller's dependencies
	templateController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('templateController',templateController);	
});
