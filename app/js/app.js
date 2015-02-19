'use strict';

define(['angular',
 'angularRoute',
 'routeResolver',
 'bootstrap',
 'directives',
 'services',
 'filters',
 'css!../css/bootstrap.min', 'css!../css/mystyle.css'
], function (angular, angularRoute) {
    // Declare app level module which depends on views, and components
    var app = angular.module('realEstate', [
   'ngRoute', 'routeResolverServices', 'ui.bootstrap', 'customDirectives', 'customServices', 'customFilters',
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
                }, 'users/'))
                .when('/login', route.resolve({
                    controller: 'login',
                    template: 'login',
					label: "Login"
                }, 'users/'))
				.when('/changepass',route.resolve({
                    controller: 'login',
                    template: 'changepass',
					label: "ChangePassword"
                }, 'users/'))
				.when('/editprofile', route.resolve({
                    controller: 'login',
                    template: 'editprofile',
					label: "EditProfile"
                }, 'users/'))
                .when('/response/:type?/:status?/:id?', route.resolve({
                    controller: 'response',
                    template: 'response',
					label: "Response"
                }, 'response/'))
                .when('/property', route.resolve({
                    controller: 'property',
                    template: 'property',
					label: "Property"
                }, 'property/'))
                .when('/viewProperty/:id?', route.resolve({
                    controller: 'property',
                    template: 'viewProperty',
					label: "ViewProperty"
                }, 'property/'))
                .when('/addproperty/:id?', route.resolve({
                    controller: 'property',
                    template: 'addproperty',
					label: "AddProperty"
                }, 'property/'))
                .when('/project', route.resolve({
                    controller: 'project',
                    template: 'project',
					label: "Project"
                }, 'project/'))
				
                .when('/addproject', route.resolve({
                    controller: 'project',
                    template: 'addproject',
					label: "AddProject"
                }, 'project/'))

				.when('/forgot', route.resolve({
                    controller: 'forgot',
                    template: 'forgot',
					label: "ForgotPassword"
                }, 'users/'))
                .when('/register', route.resolve({
                    controller: 'register',
                    template: 'register',
					label: "Register"
                }, 'users/'))
                .when('/dashboard', route.resolve({
                    controller: 'dashboard',
                    template: 'dashboard',
					label: "Dashboard"
                }, 'dashboard/'))
                .when('/dashboard/mywebsites', route.resolve({
                    controller: 'mywebsites',
                    template: 'mywebsites',
					label: "MyWebsites"
                }, 'websites/'))
                .when('/mywebsites/requestnewsite', route.resolve({
                    controller: 'mywebsites',
                    template: 'requestnewsite',
					label: "RequestNewWebsite"
                }, 'websites/'))
                .when('/mywebsites/requestedsitelist', route.resolve({
                    controller: 'mywebsites',
                    template: 'requestedsitelist',
					label: "Requestedsitelist"
                }, 'websites/'))

            .otherwise({
                redirectTo: '/'
            });
 }]);
    app.run(['$location', '$rootScope', 'breadcrumbs', function ($location, $rootScope, breadcrumbs) {
        $rootScope.metaTitle = "Real Estate Portal";
        $rootScope.breadcrumbs = breadcrumbs;
 }]);
    return app;
});