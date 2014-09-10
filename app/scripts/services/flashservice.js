'use strict';

/**
 * @ngdoc service
 * @name mydrawingsApp.flashService
 * @description
 * # flashService
 * Service in the mydrawingsApp.
 * code from davemo - https://github.com/davemo/end-to-end-with-angularjs
 */
angular.module('mydrawingsApp')
  .service('FlashService', ['$rootScope', function ($rootScope) {
    return {
      show: function(message) {
        $rootScope.flash = message;
      },
      clear: function() {
        $rootScope.flash = "";
      }
    }
  }]);
