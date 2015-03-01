'use strict';
define(['app'], function (app) {
    var injectParams = ['$scope', '$injector','$routeParams','$http','$rootScope','$upload'];
    // This is controller for this view
	var addpropertyController = function ($scope, $injector,$routeParams,$http,$rootScope, $upload) {
		$rootScope.metaTitle = "Add Real Estate Property";
		
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
			});	
			$scope.update = function(){
				$http.put("../server-api/index.php/editproperty/"+$routeParams.id,$scope.property)
				.success(function(response) {
					alert(response);
				});
			};
		}
		
		//Upload Function for uploading files
		$scope.$watch('files', function () {
			$scope.upload($scope.files);
		});
		$scope.upload = function (files) {
			if (files && files.length) {
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					$upload.upload({
						url: '../server-api/try.php/upload',
						file: file
					}).progress(function (evt) {
						var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
						console.log('progress: ' + progressPercentage + '% ' +
									evt.config.file.name);
					}).success(function (data, status, headers, config) {
						console.log('file ' + config.file.name + 'uploaded. Response: ' +
									JSON.stringify(data));
					}).error(function(err,err1,err2, err3){
						console.log(err3 );
					});
				}
			}
		};
	
	};		
	// Inject controller's dependencies
	addpropertyController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('addpropertyController', addpropertyController);
	
});
