app.factory('LoginService',
    function($http,Session) {
		var authService={};
          authService.logIn = function (login) {
			return $http
      .post('server-api/index.php/login',login)
      .then(function (res) {
        Session.create(res.data.id, res.data.userId,
                       res.data.userRole);
        return res.data.user;
		console.log(data);
      });
  };
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
});