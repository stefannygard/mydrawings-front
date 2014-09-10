'use strict';

/**
 * @ngdoc service
 * @name mydrawingsApp.indexService
 * @description
 * # indexService
 * Service in the mydrawingsApp.
 */
angular.module('mydrawingsApp')
  .service('Indexservice', function Indexservice() {
    return {
      'backendUrl': function(url){ return 'http://localhost/laravel/public/' + url; }
    };
  });
