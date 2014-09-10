'use strict';

angular.module('mydrawingsApp').run(['$rootScope', '$location', 'AuthenticationService', 'FlashService', '_', 
  function($rootScope, $location, AuthenticationService, FlashService, _) {
  var routesThatRequireAuth = ['/studio', '/bild/editera'];

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    var isProtectedRoute = false;
    _.each(routesThatRequireAuth, function(protectedRoute) { 
      if($location.path().indexOf(protectedRoute) > -1) {
        isProtectedRoute = true;
      }
    }); 
    if(isProtectedRoute && !AuthenticationService.isLoggedIn()) {
      $location.path('/');
      FlashService.show('Please log in to continue.');
    }
  });
}]);