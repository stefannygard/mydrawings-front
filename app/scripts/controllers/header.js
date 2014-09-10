'use strict';

/**
 * @ngdoc function
 * @name mydrawingsApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the mydrawingsApp
 */
angular.module('mydrawingsApp')
  .controller('HeaderCtrl', ['$scope', '$location', 'AuthenticationService', 
  function ($scope, $location, AuthenticationService) {
    this.collapse = false;
    this.toggle = function() {
      this.collapse = !this.collapse;
    };
    this.logout = function() {
      AuthenticationService.logout().success(function() {
        $location.path('/');
      });
    };
    this.isLoggedIn = function() {
      return AuthenticationService.isLoggedIn(); 
    };
    this.showLogIn = function() {
      return !this.isLoggedIn() && $location.path().substring(1) !== 'logga-in';
    };
    this.menuClass = function(page) {
      var current = $location.path().substring(1);
      return page === current ? 'active' : '';
    };
  }]);
