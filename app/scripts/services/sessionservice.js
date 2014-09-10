'use strict';

/**
 * @ngdoc service
 * @name mydrawingsApp.sessionService
 * @description
 * # sessionService
 * Service in the mydrawingsApp.
 * code from davemo - https://github.com/davemo/end-to-end-with-angularjs
 */
angular.module('mydrawingsApp')
  .service('SessionService', function SessionService() {
    return {
      get: function(key) {
        return sessionStorage.getItem(key);
      },
      set: function(key, val) {
        return sessionStorage.setItem(key, val);
      },
      unset: function(key) {
        return sessionStorage.removeItem(key);
      }
    }
  });
