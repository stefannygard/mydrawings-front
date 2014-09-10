'use strict';

/**
 * @ngdoc function
 * @name mydrawingsApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the mydrawingsApp
 */
angular.module('mydrawingsApp')
  .controller('AuthCtrl', 
    ['$scope', '$location', 'Notifications', 'AuthenticationService', 
    function ($scope, $location, Notifications, AuthenticationService) {
    this.credentials = {};
    var _this = this;
    this.login = function () {
      AuthenticationService.login(_this.credentials).success(    
        function() {
          $location.path('/studio');
      });
    };
    this.register = function () {
      AuthenticationService.register(_this.credentials).success(    
        function(response) {
          $location.path('/login');
          Notifications.sendMessage(response.flash);
      });
    };
}]);
