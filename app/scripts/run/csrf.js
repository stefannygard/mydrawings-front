'use strict';
angular.module('mydrawingsApp').run(['$rootScope', '$http', 'CSRF_TOKEN', 
  function($rootScope, $http, CSRF_TOKEN) {
    $http.defaults.withCredentials = true;
    $http.defaults.headers.post['X-CSRF-Token'] = CSRF_TOKEN;
  }
]);