app.run(function ($rootScope, AUTH_EVENTS, LoginService) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data.authorizedRoles;
    if (!LoginService.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      if (LoginService.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
		console.log($rootScope);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
		console.log($rootScope);
      }
    }
  });
});