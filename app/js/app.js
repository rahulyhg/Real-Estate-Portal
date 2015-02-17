'use strict';

define(['angular',
	'angularRoute',
	'routeResolver',
	'bootstrap',
	'css!../css/bootstrap.min','css!../css/mystyle.css','css!../css/mystyle1.css'
], function(angular, angularRoute) {
	// Declare app level module which depends on views, and components
	var app =  angular.module('realEstate', [
	  'ngRoute',
	  'routeResolverServices','ui.bootstrap'
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
					.when('/home', route.resolve({controller:'home', template: 'home', directive: 'vilas'}, 'home/'))                
				 .when('/response/:type?/:status?/:id?', route.resolve({controller:'response', template: 'response' }, 'response/'))
				 .when('/property', route.resolve({controller:'property', template: 'property' }, 'property/'))
				 .when('/viewProperty/:id?', route.resolve({controller:'property', template: 'viewProperty' }, 'property/'))
				 .when('/addproperty/:id?', route.resolve({controller:'property', template: 'addproperty' }, 'property/'))
				 .when('/project', route.resolve({controller:'project', template: 'project' }, 'project/'))
				 .when('/addproject', route.resolve({controller:'project', template: 'addproject' }, 'project/'))
				 .when('/login', route.resolve({controller:'login', template: 'login' }, 'users/'))
				 .when('/forgot', route.resolve({controller:'forgot', template: 'forgot' }, 'users/'))
				 .when('/register', route.resolve({controller:'register', template: 'register' }, 'users/'))
				 .when('/dashboard', route.resolve({controller:'dashboard', template: 'dashboard' }, 'dashboard/'))
                .otherwise({ redirectTo: '/login' });
	}]);
	app.run(['$location', '$rootScope', function($location, $rootScope) {
		$rootScope.title = "DEFAULT Title";
		
	}]);
	return app;
});