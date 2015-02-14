'use strict';

define(['app', 'css!modules/player/player'], function (app) {
    var injectParams = ['$scope', '$injector','$upload'];

    // This is controller for this view
	var playerController = function ($scope, $injector,$upload) {
		//console.log("this is home ctrl " + data.value);
    };

$scope.$watch('files', function() {
    $scope.upload = $upload.upload({
      url: 'http://localhost/Real-Estate-Portal/server-api/try.php/upload',
      data: {myObj: $scope.myModelObj},
      file: $scope.files
    }).progress(function(evt) {
      console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
    }).success(function(data, status, headers, config) {
      console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
    });
  });
  // Inject controller's dependencies
	playerController.$inject = injectParams;
	// Register/apply controller dynamically
    app.register.controller('playerController', playerController);
	
  
});