'use strict';
angular.module('mydrawingsApp').run(['$rootScope', '$http', 'CSRF_TOKEN', 
  function($rootScope, $http, CSRF_TOKEN) {
    //$http.defaults.headers.post['X-CSRFToken'] = CSRF_TOKEN;
  }
]);