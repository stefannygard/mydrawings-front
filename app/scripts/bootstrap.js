'use strict';

// code from davemo,
// https://raw.githubusercontent.com/davemo/frontend-workflows-with-grunt-and-angularjs/master/with-lineman/app/js/bootstrap.js
(function() {

  var $injector = angular.injector(['ng']);

  $injector.invoke(['$http','$rootScope', function($http, $rootScope) {
    
    $http.defaults.withCredentials = true;
    
    $rootScope.$apply(function() {
    
      $http.get('http://localhost/laravel/public/auth/csrf_token').then(function(response) {
        angular.module('mydrawingsApp').constant('CSRF_TOKEN', response.data.csrf_token);
        angular.bootstrap(document, ['mydrawingsApp']);
        
        $rootScope.bootstrapStarted = true;
      });
    });
  }]);

})();