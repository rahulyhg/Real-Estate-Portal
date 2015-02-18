'use strict';

define(['angular',
	'angularRoute',
	'routeResolver',
	'bootstrap',
	'directives',
	'breadcrumbs',
	'services',
	'css!../css/bootstrap.min','css!../css/mystyle.css'
], function(angular, angularRoute) {
	// Declare app level module which depends on views, and components
	var app =  angular.module('realEstate', [
	  'ngRoute',
	  'routeResolverServices','ui.bootstrap', 'customDirectives','customServices', 'ng-breadcrumbs',
	]);
	app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
                '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
				function($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {
				
				//Change default views and controllers directory using the following:
				routeResolverProvider.routeConfig.setBaseDirectories('modules/', 'modules/');
				
				app.register =
				{
					controller: $controllerProvider.register,
					directive: $compileProvider.directive,
					filter: $filterProvider.register,
					factory: $provide.factory,
					service: $provide.service
				};
				
				//Define routes - controllers will be loaded dynamically
				var route = routeResolverProvider.route;
			
				$routeProvider
				
				.when('/', route.resolve({controller:'login', template: 'login', label: "Home" }, 'users/'))                
				.when('/login', route.resolve({controller:'login', template: 'login' }, 'users/'))                
				.when('/response/:type?/:status?/:id?', route.resolve({controller:'response', template: 'response' }, 'response/'))
				 .when('/property', route.resolve({controller:'property', template: 'property' }, 'property/'))
				 .when('/viewProperty/:id?', route.resolve({controller:'property', template: 'viewProperty' }, 'property/'))
				 .when('/addproperty/:id?', route.resolve({controller:'property', template: 'addproperty' }, 'property/'))
				 .when('/project', route.resolve({controller:'project', template: 'project' }, 'project/'))
				 .when('/addproject', route.resolve({controller:'project', template: 'addproject' }, 'project/'))
				 
				 .when('/forgot', route.resolve({controller:'forgot', template: 'forgot' }, 'users/'))
				 .when('/register', route.resolve({controller:'register', template: 'register' }, 'users/'))
				 .when('/dashboard', route.resolve({controller:'dashboard', template: 'dashboard' }, 'dashboard/'))
				 .when('/dashboard/mywebsites', route.resolve({controller:'mywebsites', template: 'mywebsites' }, 'websites/'))
				 .when('/mywebsites/requestnewsite', route.resolve({controller:'mywebsites', template: 'requestnewsite' }, 'websites/')) 
				 .when('/mywebsites/requestedsitelist', route.resolve({controller:'mywebsites', template: 'requestedsitelist' }, 'websites/')) 
				 
                .otherwise({ redirectTo: '/' });
	}]);
	app.run(['$location', '$rootScope', 'breadcrumbs', function($location, $rootScope, breadcrumbs) {
		$rootScope.title = "DEFAULT Title";
		$rootScope.breadcrumbs = breadcrumbs;
	}]);
	return app;
});