'use strict';
define(['app', 'css!modules/property/property'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','$http','$modal', '$log'];
    // This is controller for this view
	var propertyController = function ($scope, $injector,$routeParams,$http, $modal, $log) {
		
		$scope.open = function (url, propId) {
			var modalInstance = $modal.open({
				templateUrl: url, /* for open template outside current template */
				//template: '<span class="close" ng-click="cancel()">X</span><img class="img-responsive" src="'+ url +'" />', /* inline template */
				controller: 'propertyController', /* apply controller to modal template */
				size: 'lg', /* bootstrap modal size - empty for default, lg for large, sm for small */
				resolve: {
					property : function (){
						$http.get("../server-api/index.php/property/"+propId)
						.success(function(response) {
							return $scope.property = response;
							console.log($scope.property);
						});	
					}
					/* items: function () {
					return $scope.items;
					} */
				}
			});
			modalInstance.result.then(function (selectedItem) {
				//$scope.selected = selectedItem;
				$log.info("selected.")
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
		
		
		if($routeParams.id) {
		$http.get("../server-api/index.php/property/"+$routeParams.id)
		.success(function(response) {$scope.properties = response;
			console.log($scope.properties);
		});		
		}else{	
		$http.get("../server-api/index.php/property")
		.success(function(response) {$scope.properties = response;
			//console.log($scope.properties);
		});
		
		// Add property
		$scope.reset = function() {
			$scope.property = {};
		};
		$scope.addprop = function(){
			console.log($scope.property);
			$http.post("../server-api/index.php/addproperty", $scope.property)
			.success(function(response) {
				alert(response);
				$scope.reset();
			});
		};
	}
	if($routeParams.id){
		//Update Property
		$http.get("../server-api/index.php/property/"+$routeParams.id)
		.success(function(response) {
			$scope.property = response;
			$scope.reset = function() {
				$scope.property = angular.copy($scope.property);
			};
			$scope.reset();
			console.log($scope.property);			
		})		
		$scope.update = function(){
			$http.put("../server-api/index.php/editproperty/"+$routeParams.id,$scope.property)
			.success(function(response) {
				alert(response);
			});
		}
	}
	$scope.view1 = function () {
			var modalInstance = $modal.open({
				templateUrl: '<span class="close" ng-click="cancel()">X</span> <a href="#/viewProperty">', /* for open template outside current template */
				//template: '<span class="close" ng-click="cancel()">X</span><a class="responsive" href="#/viewProperty"></a>', /* inline template */
				controller: 'propertyController', /* apply controller to modal template */
				size: 'lg', /* bootstrap modal size - empty for default, lg for large, sm for small */
				resolve: {
					items: function () {
					return $scope.items;
					}
				}
			});
			modalInstance.result.then(function (selectedItem) {
				//$scope.selected = selectedItem;
				$log.info("selected.")
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
		};	
    
	// Inject controller's dependencies
	propertyController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('propertyController', propertyController);
	
	
});


