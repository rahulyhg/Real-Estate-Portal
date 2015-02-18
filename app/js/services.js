'use strict';

// Services goes here

define(['app'], function (app) {
	var app =  angular.module('customServices', []);
	app.service('modalService', ['$modal', function ($modal) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '../app/modules/component/modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                }
            }

            return $modal.open(tempModalDefaults).result;
        };

    }]);
	/******************************************************************************
	 * Modal Service Ends Here */
	
	app.factory('breadcrumbs', [
      '$rootScope',
      '$location',
      '$route',
      function ($rootScope, $location, $route) {
        var BreadcrumbService = {
          breadcrumbs: [],
          get: function(options) {
            this.options = options || this.options;
            if (this.options) {
              for (var key in this.options) {
                if (this.options.hasOwnProperty(key)) {
                  for (var index in this.breadcrumbs) {
                    if (this.breadcrumbs.hasOwnProperty(index)) {
                      var breadcrumb = this.breadcrumbs[index];
                      if (breadcrumb.label === key) {
                        breadcrumb.label = this.options[key];
                      }
                    }
                  }
                }
              }
            }
            return this.breadcrumbs;
          },
          generateBreadcrumbs: function() {
            var routes = $route.routes,
                _this = this,
                params,
                pathElements,
                pathObj = {},
                path = '',
                originalPath = '',
                param;

            if ($route && $route.current && $route.current.originalPath) {
              this.breadcrumbs = [];
              params = $route.current.params;
              pathElements = $route.current.originalPath.trim().split('/');

              // Necessary to get rid of of duplicate empty string on root path
              if (pathElements[1] === '') {
                pathElements.splice(1, 1);
              }

              angular.forEach(pathElements, function(pathElement, index) {
                param = pathElement[0] === ':' &&
                        typeof params[pathElement
                          .slice(1, pathElement.length)] !== 'undefined' ?
                        params[pathElement.slice(1, pathElement.length)] :
                        false;

                pathObj[index] = {
                  path: param || pathElement,
                  originalPath: pathElement
                };

                path = Object
                  .keys(pathObj)
                  .map(function(k) { return pathObj[k].path;  })
                  .join('/') || '/';

                originalPath = Object
                  .keys(pathObj)
                  .map(function(k) { return pathObj[k].originalPath;  })
                  .join('/') || '/';

                if (routes[originalPath] &&
                    (routes[originalPath].label || param) &&
                    !routes[originalPath].excludeBreadcrumb) {
                  _this.breadcrumbs.push({
                    path: path,
                    originalPath: originalPath,
                    label: routes[originalPath].label || param,
                    param: param
                  });
                }
              });
            }
          }
        };

        // We want to update breadcrumbs only when a route is actually changed
        // as $location.path() will get updated immediately (even if route
        // change fails!)
        $rootScope.$on('$routeChangeSuccess', function() {
          BreadcrumbService.generateBreadcrumbs();
        });

        $rootScope.$watch(
          function() { return BreadcrumbService.options; },
          function() {
            BreadcrumbService.generateBreadcrumbs();
          }
        );

        BreadcrumbService.generateBreadcrumbs();

        return BreadcrumbService;
      }
    ]);
	
	return app;
});