'use strict';

define(['angular',
 'angularRoute',
 'routeResolver',
 'bootstrap',
 'directives',
 'services', 
 'filters',
 'upload','uploadShim',
 'css!../css/bootstrap.min', 'css!../css/mystyle.css'
], function (angular, angularRoute) {
    // Declare app level module which depends on views, and components
    var app = angular.module('realEstate', [
   'ngRoute', 'routeResolverServices', 'ui.bootstrap', 'customDirectives', 'customServices', 'customFilters', 'angularFileUpload'
 ]);
    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
                '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
    function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {

            //Change default views and controllers directory using the following:
            routeResolverProvider.routeConfig.setBaseDirectories('modules/', 'modules/');

            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $routeProvider

                .when('/', route.resolve({
                    controller: 'login',
                    template: 'login',
                    label: "Home"
                }, 'users/login/'))
				
				// Below routes will use login sub module folder
                .when('/login', route.resolve({
                    controller: 'login',
                    template: 'login',
					label: "Login"
                }, 'users/login/'))
				
				.when('/changepass',route.resolve({
                    controller: 'login',
                    template: 'changepass',
					label: "Change Password"
                }, 'users/login/')) 
				
				.when('/forgot', route.resolve({
                    controller: 'login',
                    template: 'forgot',
					label: "Forgot Password"
                }, 'users/login/'))
				
				// Below routes will use register submodule folder
                .when('/register', route.resolve({
                    controller: 'register',
                    template: 'register',
					label: "Register"
                }, 'users/register/'))
				
				.when('/editprofile', route.resolve({
                    controller: 'editprofile',
                    template: 'editprofile',
					label: "Edit Profile"
                }, 'users/register/'))
				
				// Below routes will use dashboard module folder
                .when('/dashboard', route.resolve({
                    controller: 'dashboard',
                    template: 'dashboard',
					label: "Dashboard"
                }, 'dashboard/'))
				
				
				// Below routes will use response module folder	{Sunita- To display mailbox single view remove status add mailID }
				.when('/dashboard/response/:mailId?', route.resolve({
                    controller: 'response',
                    template: 'response',
					label: " Mail Box"
                }, 'response/'))
				
				// Below routes will use Property module folder
				// In this view you can see list of all properties
                .when('/dashboard/property', route.resolve({
                    controller: 'property',
                    template: 'property',
					label: "Property"
                }, 'property/'))
				
				
				// In this view you can see addproperty form
                .when('/dashboard/property/addproperty/:id?', route.resolve({
                    controller: 'addproperty',
                    template: 'addproperty',
					label: "Add Property"
                }, 'property/addproperty/'))
				
				// Below routes will use Project module folder
				// In this view you can see list of all projects
                .when('/dashboard/project', route.resolve({
                    controller: 'project',
                    template: 'project',
					label: "Project"
                }, 'project/'))
				
				// In this view you can see add project form
                .when('/dashboard/project/addproject/:id?', route.resolve({
                    controller: 'addproject',
                    template: 'addproject',
					label: "Add Project"
                }, 'project/addproject/'))
				
				
                .when('/dashboard/websites/:webPart?', route.resolve({
                    controller: 'websites',
                    template: 'websites',
					label: "Websites"
                }, 'websites/'))
				
				.when('/dashboard/templates/:tempPart?', route.resolve({
                    controller: 'templates',
                    template: 'templates',
					label: "Templates"
                }, 'templates/'))
	
            .otherwise({redirectTo: '/'});
 }]);
    app.run(['$location', '$rootScope', 'breadcrumbs', function ($location, $rootScope, breadcrumbs) {
        $rootScope.metaTitle = "Real Estate Portal";
        $rootScope.breadcrumbs = breadcrumbs;
 }]);
    return app;
});