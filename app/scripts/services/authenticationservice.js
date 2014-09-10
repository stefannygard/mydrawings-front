'use strict';

/**
 * @ngdoc service
 * @name mydrawingsApp.authenticationService
 * @description
 * # authenticationService, 
 * Service in the mydrawingsApp.
 * code from davemo - https://github.com/davemo/end-to-end-with-angularjs
 */
angular.module('mydrawingsApp')
  .service('AuthenticationService', ['$http', '$sanitize', 'SessionService', 'FlashService', 'Indexservice', 'CSRF_TOKEN', 
  function AuthenticationService ($http, $sanitize, SessionService, FlashService, Indexservice, CSRF_TOKEN) {

  var cacheSession   = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function() {
    SessionService.unset('authenticated');
  };

  var loginError = function(response) {
    FlashService.show(response.flash);
  };
  var registerError = function(response) {
    FlashService.show(response.flash);
  };

  var sanitizeCredentials = function(credentials) {
    return {
      email: $sanitize(credentials.email),
      password: $sanitize(credentials.password),
      csrf_token: CSRF_TOKEN
    };
  };
  
  return {
    login: function(credentials) {
      var login = $http.post(Indexservice.backendUrl('auth/login'),
        sanitizeCredentials(credentials));
      login.success(cacheSession);
      login.success(FlashService.clear);
      login.error(loginError);
      return login;
    },
    register: function(credentials) {
      var register = $http.post(Indexservice.backendUrl('auth/register'),
        sanitizeCredentials(credentials));
      register.error(registerError);
      register.success(FlashService.clear);
      return register;
    },
    logout: function() {
      var logout = $http.get(Indexservice.backendUrl('auth/logout'));
      logout.success(uncacheSession);
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    }
  };
}]);
